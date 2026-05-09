import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tag } from "@/domain/entities/types";

interface NotionTagProps {
  tag: Tag;
  className?: string;
}

const notionColorMap: Record<string, string> = {
  default: "border-border bg-background/60 text-muted-foreground",
  gray: "border-border bg-background/60 text-muted-foreground",
  brown: "border-orange-400/30 bg-orange-500/10 text-orange-200",
  orange: "border-orange-400/30 bg-orange-500/10 text-orange-200",
  yellow: "border-yellow-400/30 bg-yellow-500/10 text-yellow-100",
  green: "border-primary/30 bg-primary/10 text-primary",
  blue: "border-sky-400/30 bg-sky-500/10 text-sky-200",
  purple: "border-violet-400/30 bg-violet-500/10 text-violet-200",
  pink: "border-pink-400/30 bg-pink-500/10 text-pink-200",
  red: "border-red-400/30 bg-red-500/10 text-red-200",
};

export function NotionTag({ tag, className }: NotionTagProps) {
  const colorClass = tag.color ? notionColorMap[tag.color] : notionColorMap.default;

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded px-2 py-1 font-mono text-[11px] font-medium",
        colorClass,
        className
      )}
    >
      {tag.name}
    </Badge>
  );
}
