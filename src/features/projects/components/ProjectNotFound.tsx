"use client";

import { useRouter } from "next/navigation";

export function ProjectNotFound() {
  const router = useRouter();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.push("/");
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, [router]);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-2xl font-semibold mb-4">Project not found</h1>
      <p className="text-muted-foreground mb-6">Redirecting to homepage...</p>
      <button 
        onClick={() => router.push("/")}
        className="text-blue-600 hover:text-blue-800 underline"
      >
        Go home now
      </button>
    </div>
  );
}
