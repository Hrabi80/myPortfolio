import type { ContentBlock, RichTextSpan } from "@/domain/entities/content-notion";
import type { NotionBlock, NotionRichText } from "./notion.types";

const map_rich_text = (rich_text: NotionRichText[]): RichTextSpan[] => {
  return rich_text.map((t) => {
    const marks: Array<"bold" | "italic" | "underline" | "strikethrough" | "code"> = [];
    if (t.annotations.bold) marks.push("bold");
    if (t.annotations.italic) marks.push("italic");
    if (t.annotations.underline) marks.push("underline");
    if (t.annotations.strikethrough) marks.push("strikethrough");
    if (t.annotations.code) marks.push("code");

    return {
      text: t.plain_text,
      marks: marks.length ? marks : undefined,
      href: t.href ?? null,
      color: t.annotations.color,
    };
  });
};

export const map_notion_block_to_content_block = (block: NotionBlock): ContentBlock => {
  switch (block.type) {
    case "paragraph":
      return {
        id: block.id,
        type: "paragraph",
        rich_text: map_rich_text(block.paragraph?.rich_text ?? []),
      };

    case "heading_1":
      return {
        id: block.id,
        type: "heading",
        level: 1,
        rich_text: map_rich_text(block.heading_1?.rich_text ?? []),
      };

    case "heading_2":
      return {
        id: block.id,
        type: "heading",
        level: 2,
        rich_text: map_rich_text(block.heading_2?.rich_text ?? []),
      };

    case "heading_3":
      return {
        id: block.id,
        type: "heading",
        level: 3,
        rich_text: map_rich_text(block.heading_3?.rich_text ?? []),
      };

    case "bulleted_list_item":
      return {
        id: block.id,
        type: "list_item",
        style: "bulleted",
        rich_text: map_rich_text(block.bulleted_list_item?.rich_text ?? []),
      };

    case "numbered_list_item":
      return {
        id: block.id,
        type: "list_item",
        style: "numbered",
        rich_text: map_rich_text(block.numbered_list_item?.rich_text ?? []),
      };

    case "code":
      return {
        id: block.id,
        type: "code",
        language: block.code?.language,
        rich_text: map_rich_text(block.code?.rich_text ?? []),
      };

    case "quote":
      return {
        id: block.id,
        type: "quote",
        rich_text: map_rich_text(block.quote?.rich_text ?? []),
      };

    case "divider":
      return { id: block.id, type: "divider" };

    case "column_list":
      return {
        id: block.id,
        type: "column_list",
        children: (block.children ?? [])
          .map(map_notion_block_to_content_block)
          .filter(
            (child): child is Extract<ContentBlock, { type: "column" }> =>
              child.type === "column",
          ),
      };

    case "column":
      return {
        id: block.id,
        type: "column",
        children: map_notion_block_tree_to_content_blocks(block.children ?? []),
      };

    case "callout":
      return {
        id: block.id,
        type: "callout",
        icon: block.callout?.icon && "type" in block.callout.icon && block.callout.icon.type === "emoji" ? block.callout.icon.emoji : undefined,
        rich_text: map_rich_text(block.callout?.rich_text ?? []),
      };

    case "image": {
      const url = block.image?.type === "external"
        ? block.image.external?.url
        : block.image?.file?.url;

      if (!url) return { id: block.id, type: "unsupported", original_type: "image" };
      return { id: block.id, type: "image", url };
    }

    default:
      return { id: block.id, type: "unsupported", original_type: block.type };
  }
};

export const map_notion_block_tree_to_content_blocks = (blocks: NotionBlock[]): ContentBlock[] => {
  return blocks.map(map_notion_block_to_content_block);
};
