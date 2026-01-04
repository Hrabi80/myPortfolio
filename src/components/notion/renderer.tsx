import type { CSSProperties, ReactNode } from "react";
import { Box } from "@/components/layout/primitives";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./codeBlock";
import type { ContentBlock, RichTextSpan } from "@/domain/entities/content.entity";

const COLOR_CLASSES: Record<string, string> = {
  gray: "text-muted-foreground",
  brown: "text-amber-700",
  orange: "text-orange-600",
  yellow: "text-yellow-600",
  green: "text-emerald-600",
  blue: "text-sky-600",
  purple: "text-violet-600",
  pink: "text-pink-600",
  red: "text-red-600",
};

const Text = ({ text }: { text: RichTextSpan[] }) => {
  if (!text) return null;
  return (
    <>
      {text.map((t, i) => {
        const color = t.color ?? "default";
        const hasBackground = color.includes("_background");
        const colorKey = hasBackground ? color.replace("_background", "") : color;
        const className = cn(
          t.marks?.includes("bold") && "font-semibold",
          t.marks?.includes("italic") && "italic",
          t.marks?.includes("strikethrough") && "line-through",
          t.marks?.includes("underline") && "underline underline-offset-4",
          t.marks?.includes("code") && "rounded bg-muted/80 px-1 py-0.5 font-mono text-[13px]",
          hasBackground && "rounded-sm bg-muted/70 px-1",
          colorKey !== "default" ? COLOR_CLASSES[colorKey] : null
        );

        if (t.href) {
          return (
            <a
              key={i}
              href={t.href}
              className={cn(className, "text-primary underline underline-offset-4")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.text}
            </a>
          );
        }

        return (
          <span key={i} className={className}>
            {t.text}
          </span>
        );
      })}
    </>
  );
};

const renderBlock = (block: ContentBlock) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={block.id} className="text-[15px] leading-7 text-foreground/90">
          <Text text={block.rich_text} />
        </p>
      );
    case "heading": {
      const headingClassName =
        block.level === 1
          ? "mt-8 text-3xl font-bold tracking-tight"
          : block.level === 2
            ? "mt-6 text-2xl font-semibold tracking-tight"
            : "mt-4 text-xl font-semibold tracking-tight";
      const HeadingTag = block.level === 1 ? "h1" : block.level === 2 ? "h2" : "h3";

      return (
        <HeadingTag key={block.id} className={headingClassName}>
          <Text text={block.rich_text} />
        </HeadingTag>
      );
    }
    case "code": {
      const code = block.rich_text.map((t) => t.text).join("");
      const language = block.language ?? "text";
      return <CodeBlock key={block.id} code={code} language={language} />;
    }

    case "column_list": {
      const columns = block.children ?? [];
      if (!columns.length) return null;

      const style = { "--cols": String(columns.length) } as CSSProperties;

      return (
        <Box key={block.id} className="my-6" style={style}>
          <div className="grid grid-cols-1 gap-6 md:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]">
            {columns.map((col) => (
              <Box key={col.id} className="min-w-0">
                <NotionRenderer blocks={col.children ?? []} />
              </Box>
            ))}
          </div>
        </Box>
      );
    }
    case "column":
      // rendered by column_list
      return null;

    case "image": {
      const url = block.url;
      return (
        <figure key={block.id} className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Notion Image" className="w-full rounded-xl border border-border/60 bg-muted object-cover" />
        </figure>
      );
    }
    case "quote":
      return (
        <blockquote key={block.id} className="border-l-2 border-border/70 pl-4 text-[15px] italic text-muted-foreground">
          <Text text={block.rich_text} />
        </blockquote>
      );
    case "callout": {
      const calloutEmoji = block.icon ?? null;

      return (
        <div key={block.id} className="flex gap-3 rounded-xl border border-border/60 bg-muted/60 px-4 py-3 text-[15px]">
          {calloutEmoji ? <span className="text-lg leading-6">{calloutEmoji}</span> : null}
          <div className="leading-7">
            <Text text={block.rich_text} />
          </div>
        </div>
      );
    }
    case "divider":
      return <hr key={block.id} className="my-6 border-border/60" />;
    default:
      return null;
  }
};

const isListItem = (block: ContentBlock): block is Extract<ContentBlock, { type: "list_item" }> => {
  return block.type === "list_item";
};

export function NotionRenderer({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks?.length) return null;

  const content: ReactNode[] = [];

  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i];

    if (isListItem(block)) {
      const listStyle = block.style;
      const items: Extract<ContentBlock, { type: "list_item" }>[] = [];

      while (i < blocks.length) {
        const current = blocks[i];
        if (!isListItem(current) || current.style !== listStyle) {
          break;
        }

        items.push(current);
        i += 1;
      }

      i -= 1;
      const ListTag = listStyle === "bulleted" ? "ul" : "ol";
      const listClassName =
        listStyle === "bulleted"
          ? "ml-6 list-disc space-y-2 text-[15px] leading-7 text-foreground/90"
          : "ml-6 list-decimal space-y-2 text-[15px] leading-7 text-foreground/90";

      content.push(
        <ListTag key={`list-${items[0]?.id ?? i}`} className={listClassName}>
          {items.map((item) => (
            <li key={item.id}>
              <Text text={item.rich_text} />
            </li>
          ))}
        </ListTag>
      );
      continue;
    }

    const rendered = renderBlock(block);
    if (rendered) {
      content.push(rendered);
    }
  }

  return <Box className="space-y-5">{content}</Box>;
}
