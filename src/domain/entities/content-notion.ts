export type RichTextMark = "bold" | "italic" | "underline" | "strikethrough" | "code";

export type RichTextSpan = {
  text: string;
  marks?: RichTextMark[];
  href?: string | null;
  color?: string;
};

type BaseBlock = {
  id: string;
};

export type ParagraphBlock = BaseBlock & {
  type: "paragraph";
  rich_text: RichTextSpan[];
};

export type HeadingBlock = BaseBlock & {
  type: "heading";
  level: 1 | 2 | 3;
  rich_text: RichTextSpan[];
};

export type ListItemBlock = BaseBlock & {
  type: "list_item";
  style: "bulleted" | "numbered";
  rich_text: RichTextSpan[];
};

export type CodeBlock = BaseBlock & {
  type: "code";
  language?: string;
  rich_text: RichTextSpan[];
};

export type QuoteBlock = BaseBlock & {
  type: "quote";
  rich_text: RichTextSpan[];
};

export type DividerBlock = BaseBlock & {
  type: "divider";
};

export type ImageBlock = BaseBlock & {
  type: "image";
  url: string;
  caption?: RichTextSpan[];
};

export type CalloutBlock = BaseBlock & {
  type: "callout";
  icon?: string; // keep it simple: emoji or "external"/"file"
  rich_text: RichTextSpan[];
};

export type ColumnBlock = BaseBlock & {
  type: "column";
  children: ContentBlock[];
};

export type ColumnListBlock = BaseBlock & {
  type: "column_list";
  children: ColumnBlock[];
};

export type UnsupportedBlock = BaseBlock & {
  type: "unsupported";
  original_type: string;
};

export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ListItemBlock
  | CodeBlock
  | QuoteBlock
  | DividerBlock
  | ImageBlock
  | CalloutBlock
  | ColumnBlock
  | ColumnListBlock
  | UnsupportedBlock;
