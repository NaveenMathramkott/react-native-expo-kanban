"use client";

import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { OnThisPage } from "@/components/on-this-page";
import { docsToc } from "@/lib/toc";

export function DocsToc() {
  const pathname = usePathname();
  const items = docsToc[pathname] ?? [];

  return <OnThisPage items={items} />;
}

export function DocsMobileToc() {
  const pathname = usePathname();
  const items = docsToc[pathname] ?? [];

  if (!items.length) return null;

  return (
    <details className="group mb-8 rounded-lg border px-4 py-3 xl:hidden">
      <summary className="text-muted-foreground flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-wider [&::-webkit-details-marker]:hidden">
        <span>
          On this page
          <span className="text-muted-foreground/70 ml-2 font-normal normal-case tracking-normal">
            {items.length} sections
          </span>
        </span>
        <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            {item.title}
          </a>
        ))}
      </div>
    </details>
  );
}
