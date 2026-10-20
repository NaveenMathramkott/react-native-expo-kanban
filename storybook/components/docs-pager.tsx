"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { flatDocsNav } from "@/lib/site";

export function DocsPager() {
  const pathname = usePathname();
  const index = flatDocsNav.findIndex((item) => item.href === pathname);
  const previous = index > 0 ? flatDocsNav[index - 1] : undefined;
  const next =
    index >= 0 && index < flatDocsNav.length - 1
      ? flatDocsNav[index + 1]
      : undefined;

  if (!previous && !next) return null;

  return (
    <div className="mt-16 grid gap-3 border-t pt-6 sm:grid-cols-2">
      {previous ? (
        <Link
          href={previous.href}
          className="hover:bg-accent/60 group flex flex-col gap-1 rounded-lg border p-4 transition-colors"
        >
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="text-sm font-medium">{previous.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link
          href={next.href}
          className="hover:bg-accent/60 group flex flex-col items-end gap-1 rounded-lg border p-4 text-right transition-colors sm:col-start-2"
        >
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
            Next
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="text-sm font-medium">{next.title}</span>
        </Link>
      )}
    </div>
  );
}
