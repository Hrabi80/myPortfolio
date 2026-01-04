import "server-only";

import { BlockObjectResponse, Client, PageObjectResponse, type QueryDataSourceParameters } from "@notionhq/client";
import { cache } from "react";
import { env } from "@/env";

const apiKey = process.env.NOTION_TOKEN;
let notionClient: Client | null = null;

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

export const getBlocks = cache(async (blockId: string) => {
  const response = await getNotionClient().blocks.children.list({
    block_id: blockId,
  });
  return response.results;
});



export const getPageBlocks = cache(async (pageId: string): Promise<BlockObjectResponse[]> => {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const res = await getNotionClient().blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    
    });

    blocks.push(
      ...(res.results.filter((b): b is BlockObjectResponse => "type" in b)),
    );

    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);

  return blocks;
});