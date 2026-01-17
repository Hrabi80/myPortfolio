import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tag } from "@/domain/entities/types";

interface NotionTagProps {
  tag: Tag;
  className?: string;
}

const notionColorMap: Record<string, string> = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  gray: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  brown: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  green: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  pink: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  red: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

export function NotionTag({ tag, className }: NotionTagProps) {
  const colorClass = tag.color ? notionColorMap[tag.color] : notionColorMap.default;

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-3 py-1 font-medium border-1",
        colorClass,
        className
      )}
    >
      {tag.name}
    </Badge>
  );
}
