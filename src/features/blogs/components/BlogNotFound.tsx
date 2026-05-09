import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BlogNotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-5 py-24 text-center">
      <h1 className="font-display text-4xl text-foreground">Post not found</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        This article is not published in Notion or the URL is incorrect.
      </p>
      <Button variant="outline" asChild className="mt-8">
        <Link href="/blog">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to blog
        </Link>
      </Button>
    </div>
  );
}
