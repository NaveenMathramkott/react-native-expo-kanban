import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="flex max-w-md flex-col items-center text-center">
        <p className="text-brand mt-6 font-mono text-xs font-semibold uppercase tracking-widest">
          404
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          This column is empty.
        </h1>
        <p className="text-muted-foreground mt-3 text-sm leading-6">
          The page you are looking for does not exist. Head back to the docs or
          the home page.
        </p>
        <div className="mt-7 flex gap-3">
          <Button asChild>
            <Link href="/docs">Go to docs</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
