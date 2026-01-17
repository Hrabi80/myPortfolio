import React from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  children: string;
  className?: string;
}

export function MarkdownRenderer({ children, className }: MarkdownRendererProps) {
  return (
    <article
      className={cn(
        "prose prose-lg prose-neutral dark:prose-invert max-w-none w-full break-words",
        "prose-li:my-0 prose-ul:my-2 prose-p:leading-relaxed [&_li>p]:my-0",
        className
      )}
    >
      <ReactMarkdown>{children}</ReactMarkdown>
    </article>
  );
}
