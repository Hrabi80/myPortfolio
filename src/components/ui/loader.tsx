import { cn } from "@/lib/utils";

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center", className)}>
      <div className="relative grid size-14 place-items-center">
        <div className="absolute size-12 animate-spin rounded-md border-2 border-primary/20 border-t-primary" />
        <div
          className="size-5 rounded-md gradient-primary shadow-glow"
          style={{ transform: "rotate(45deg)" }}
        />
      </div>
    </div>
  );
}
