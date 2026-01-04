import type { CSSProperties, ReactNode } from "react";
import type { NotionBlock, NotionRichText } from "@/domain/entities/blog.entity";
import { Box } from "@/components/layout/primitives";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./codeBlock";

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

const Text = ({ text }: { text: NotionRichText[] }) => {
  if (!text) return null;
  return (
    <>
      {text.map((t, i) => {
        const { annotations } = t;
        const color = annotations.color ?? "default";
        const hasBackground = color.includes("_background");
        const colorKey = hasBackground ? color.replace("_background", "") : color;
        const className = cn(
          annotations.bold && "font-semibold",
          annotations.italic && "italic",
          annotations.strikethrough && "line-through",
          annotations.underline && "underline underline-offset-4",
          annotations.code && "rounded bg-muted/80 px-1 py-0.5 font-mono text-[13px]",
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
              {t.plain_text}
            </a>
          );
        }

        return (
          <span key={i} className={className}>
            {t.plain_text}
          </span>
        );
      })}
    </>
  );
};

const renderBlock = (block: NotionBlock) => {
  console.log("🚀 ~ renderBlock ~ block:", block)
  switch (block.type) {
    case "paragraph":
      return (
        <p key={block.id} className="text-[15px] leading-7 text-foreground/90">
          <Text text={block.paragraph?.rich_text || []} />
        </p>
      );
    case "heading_1":
      return (
        <h1 key={block.id} className="mt-8 text-3xl font-bold tracking-tight">
          <Text text={block.heading_1?.rich_text || []} />
        </h1>
      );
    case "heading_2":
      return (
        <h2 key={block.id} className="mt-6 text-2xl font-semibold tracking-tight">
          <Text text={block.heading_2?.rich_text || []} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 key={block.id} className="mt-4 text-xl font-semibold tracking-tight">
          <Text text={block.heading_3?.rich_text || []} />
        </h3>
      );
    case "code": {
      const code = block.code?.rich_text.map((t) => t.plain_text).join("") ?? "";
      const language = block.code?.language ?? "text";
      return <CodeBlock key={block.id} code={code} language={language} />;
    }

    case "column_list": {
      const columns = (block.children ?? []).filter((b) => b.type === "column");
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
      const url = block.image?.type === "external" ? block.image.external?.url : block.image?.file?.url;
      if (!url) return null;
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
          <Text text={block.quote?.rich_text || []} />
        </blockquote>
      );
    case "callout": {
      const calloutIcon = block.callout?.icon;
      const calloutEmoji = calloutIcon?.type === "emoji" ? calloutIcon.emoji : null;

      return (
        <div key={block.id} className="flex gap-3 rounded-xl border border-border/60 bg-muted/60 px-4 py-3 text-[15px]">
          {calloutEmoji ? <span className="text-lg leading-6">{calloutEmoji}</span> : null}
          <div className="leading-7">
            <Text text={block.callout?.rich_text || []} />
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

export function NotionRenderer({ blocks }: { blocks: NotionBlock[] }) {
  if (!blocks?.length) return null;

  const content: ReactNode[] = [];

  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i];

    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      const listType = block.type;
      const items: NotionBlock[] = [];

      while (i < blocks.length && blocks[i].type === listType) {
        items.push(blocks[i]);
        i += 1;
      }

      i -= 1;
      const ListTag = listType === "bulleted_list_item" ? "ul" : "ol";
      const listClassName =
        listType === "bulleted_list_item"
          ? "ml-6 list-disc space-y-2 text-[15px] leading-7 text-foreground/90"
          : "ml-6 list-decimal space-y-2 text-[15px] leading-7 text-foreground/90";

      content.push(
        <ListTag key={`list-${items[0]?.id ?? i}`} className={listClassName}>
          {items.map((item) => (
            <li key={item.id}>
              <Text text={item[listType]?.rich_text || []} />
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
