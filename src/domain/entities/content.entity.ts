export type RichTextMark = "bold" | "italic" | "underline" | "strikethrough" | "code";

export type RichTextSpan = {
  text: string;
  marks?: RichTextMark[];
  href?: string | null;
};

export type ParagraphBlock = {
  type: "paragraph";
  rich_text: RichTextSpan[];
};

export type HeadingBlock = {
  type: "heading";
  level: 1 | 2 | 3;
  rich_text: RichTextSpan[];
};

export type ListItemBlock = {
  type: "list_item";
  style: "bulleted" | "numbered";
  rich_text: RichTextSpan[];
};

export type CodeBlock = {
  type: "code";
  language?: string;
  rich_text: RichTextSpan[];
};

export type QuoteBlock = {
  type: "quote";
  rich_text: RichTextSpan[];
};

export type DividerBlock = {
  type: "divider";
};

export type ImageBlock = {
  type: "image";
  url: string;
  caption?: RichTextSpan[];
};

export type CalloutBlock = {
  type: "callout";
  icon?: string; // keep it simple: emoji or "external"/"file"
  rich_text: RichTextSpan[];
};

export type UnsupportedBlock = {
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
  | UnsupportedBlock;
