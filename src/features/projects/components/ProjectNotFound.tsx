"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProjectNotFound() {
  const router = useRouter();

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-5 py-24 text-center">
      <h1 className="font-display text-4xl text-foreground">
        Project not found
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        This project is not published or the URL is incorrect.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button variant="outline" onClick={() => router.push("/projects")}>
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to projects
        </Button>
        <Button onClick={() => router.push("/")}>
          <Home className="size-4" aria-hidden="true" />
          Go home
        </Button>
      </div>
    </div>
  );
}
