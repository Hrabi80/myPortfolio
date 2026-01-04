import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  language?: string | null;
};

const NOTION_TO_SHIKI_LANG: Record<string, string> = {
  "plain text": "text",
  plaintext: "text",
  text: "text",
  js: "javascript",
  javascript: "javascript",
  typescript: "typescript",
  ts: "typescript",
  bash: "bash",
  shell: "bash",
  sh: "bash",
  zsh: "bash",
  json: "json",
  yaml: "yaml",
  yml: "yaml",
  html: "html",
  css: "css",
  markdown: "markdown",
  md: "markdown",
  go: "go",
  java: "java",
  python: "python",
  c: "c",
  php: "php",
  ruby: "ruby",
  sql: "sql",
  docker: "dockerfile",
  "dockerfile": "dockerfile",
};

function normalizeLanguage(language?: string | null): string {
  if (!language) return "text";
  const key = language.trim().toLowerCase();
  return NOTION_TO_SHIKI_LANG[key] ?? "text";
}

export async function CodeBlock({ code, language }: CodeBlockProps) {
  const lang = normalizeLanguage(language);

  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark",
  });

  return (
    <div
      className={cn(
        "relative overflow-x-auto rounded-xl border border-border/60 bg-muted/40",
        "text-[13px] leading-6"
      )}
    >
      <div
        className={cn(
          "[&>pre]:m-0 [&>pre]:bg-transparent [&>pre]:p-4",
          "[&_.line]:px-0"
        )}
        // Shiki returns safe highlighted HTML (no user HTML), based on code input.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
