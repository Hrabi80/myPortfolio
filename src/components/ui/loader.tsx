import { cn } from "@/lib/utils";

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center", className)}>
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute h-full w-full animate-ping rounded-full bg-primary/20 opacity-75 duration-1000" />
        <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
        <div className="h-3 w-3 rounded-full bg-primary" />
      </div>
    </div>
  );
}
