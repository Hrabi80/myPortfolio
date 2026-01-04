import { Box } from "@/components/layout/primitives";
import { cn } from "@/lib/utils";

// Minimal types for Notion blocks
type Block = {
  id: string;
  type: string;
  paragraph?: { rich_text: RichText[] };
  heading_1?: { rich_text: RichText[] };
  heading_2?: { rich_text: RichText[] };
  heading_3?: { rich_text: RichText[] };
  bulleted_list_item?: { rich_text: RichText[] };
  numbered_list_item?: { rich_text: RichText[] };
  code?: { rich_text: RichText[]; language: string };
  image?: { type: "external" | "file"; external?: { url: string }; file?: { url: string } };
};

type RichText = {
  plain_text: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  href?: string | null;
};

const Text = ({ text }: { text: RichText[] }) => {
  if (!text) return null;
  return (
    <>
      {text.map((t, i) => {
        const { annotations } = t;
        const className = cn(
          annotations.bold && "font-bold",
          annotations.italic && "italic",
          annotations.strikethrough && "line-through",
          annotations.underline && "underline",
          annotations.code && "rounded bg-muted px-1 py-0.5 font-mono text-sm",
          annotations.color !== "default" && `text-${annotations.color}-500`
        );

        if (t.href) {
          return (
            <a key={i} href={t.href} className={cn(className, "text-primary underline")} target="_blank" rel="noopener noreferrer">
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

export function NotionRenderer({ blocks }: { blocks: Block[] }) {
  if (!blocks) return null;

  return (
    <Box className="space-y-4">
      {blocks.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={block.id} className="leading-7">
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
          case "bulleted_list_item":
            return (
              <ul key={block.id} className="ml-6 list-disc [&>li]:mt-2">
                <li>
                  <Text text={block.bulleted_list_item?.rich_text || []} />
                </li>
              </ul>
            );
          case "numbered_list_item":
            return (
              <ol key={block.id} className="ml-6 list-decimal [&>li]:mt-2">
                <li>
                  <Text text={block.numbered_list_item?.rich_text || []} />
                </li>
              </ol>
            );
          case "code":
            return (
              <pre key={block.id} className="overflow-x-auto rounded-lg bg-muted p-4">
                <code className="text-sm font-mono">
                  {block.code?.rich_text.map((t) => t.plain_text).join("")}
                </code>
              </pre>
            );
          case "image":
            const url = block.image?.type === "external" ? block.image.external?.url : block.image?.file?.url;
            if (!url) return null;
            return (
              <figure key={block.id} className="my-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="Notion Image" className="rounded-lg border bg-muted" />
              </figure>
            );
          default:
            return null;
        }
      })}
    </Box>
  );
}
