import "server-only";

import { BlockObjectResponse, Client, PageObjectResponse, type QueryDataSourceParameters } from "@notionhq/client";
import { cache } from "react";
import { env } from "@/env";

const apiKey = process.env.NOTION_TOKEN;
let notionClient: Client | null = null;
/**
 * A Notion block enriched with nested children blocks.
 * Needed for column_list/column and any nested structures (toggles, nested lists, etc.).
 */
export type BlockWithChildren = BlockObjectResponse & {
  children?: BlockWithChildren[];
};
const getNotionClient = () => {
  if (!apiKey) {
    throw new Error("NOTION_TOKEN is missing");
  }
  if (!notionClient) {
    notionClient = new Client({ auth: apiKey });
  }
  return notionClient;
};
export const isNotionConfigured = () => Boolean(env.NOTION_TOKEN);
export const isPageObject = (item: unknown): item is PageObjectResponse => {
  return Boolean(item && typeof item === "object" && "properties" in item && "id" in item);
};

export const getDataSourceId = cache(async (databaseId: string): Promise<string> => {
  const db = await getNotionClient().databases.retrieve({ database_id: databaseId });

  // In 2025-09-03, a database exposes data_sources
  const dataSources = (db as { data_sources?: Array<{ id: string }> }).data_sources;
  const firstId = dataSources?.[0]?.id;
  if (!firstId) {
    throw new Error("No data_source_id found on this database");
  }

  return firstId;
});

export const getDatabase = cache(
  async (databaseId: string, query?: Omit<QueryDataSourceParameters, "data_source_id">) => {
    const dataSourceId = await getDataSourceId(databaseId);
    return getNotionClient().dataSources.query({
      data_source_id: dataSourceId,
      ...(query ?? {}),
    });
  },
);

export const getPage = cache(async (pageId: string) => {
  return getNotionClient().pages.retrieve({ page_id: pageId });
});

/**
 * Fetch ALL direct children blocks for a given block (handles pagination).
 */

export const getBlocks = cache(async (block_id: string): Promise<BlockObjectResponse[]> => {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const res = await getNotionClient().blocks.children.list({
      block_id,
      start_cursor: cursor,
      page_size: 100,
    });

    blocks.push(...res.results.filter((b): b is BlockObjectResponse => "type" in b));
    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);

  return blocks;
});



/**
 * Backward-compatible alias:
 * NB: pages are blocks too.
 */
export const getPageBlocks = cache(async (page_id: string): Promise<BlockObjectResponse[]> => {
  return getBlocks(page_id);
});



/**
 * Fetch a full recursive tree of blocks starting from a root block/page.
 * This is required for Notion "Columns" (column_list -> column -> children).
 */
export const getBlockTree = async (root_block_id: string): Promise<BlockWithChildren[]> => {
  const direct_children = await getBlocks(root_block_id);

  const with_children = await Promise.all(
    direct_children.map(async (block) => {
      const node: BlockWithChildren = block as BlockWithChildren;

      if (block.has_children) {
        node.children = await getBlockTree(block.id);
      }

      return node;
    }),
  );

  return with_children;
};

export const getPageBlockTree = async (page_id: string): Promise<BlockWithChildren[]> => {
  return getBlockTree(page_id);
};