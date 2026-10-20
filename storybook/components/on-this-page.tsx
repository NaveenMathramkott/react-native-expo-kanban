"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type TocItem = {
  title: string;
  id: string;
};

export function OnThisPage({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = React.useState(items[0]?.id ?? "");

  React.useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: [0, 1] }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-foreground text-xs font-semibold uppercase tracking-wider">
        On this page
      </p>
      <nav className="flex flex-col gap-0.5 border-l">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "-ml-px border-l py-1 pl-4 text-sm transition-colors",
              activeId === item.id
                ? "border-brand text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground border-transparent"
            )}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
