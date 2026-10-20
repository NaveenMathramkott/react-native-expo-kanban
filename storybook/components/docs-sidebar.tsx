"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Download, Github } from "lucide-react";

import { docsNav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <nav className="flex flex-col gap-7">
        {docsNav.map((section) => (
          <div key={section.title} className="flex flex-col gap-1.5">
            <p className="text-foreground px-2 text-xs font-semibold uppercase tracking-wider">
              {section.title}
            </p>
            {section.items.map((item) => {
              const active =
                item.href === "/docs"
                  ? pathname === "/docs"
                  : pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative rounded-md px-2 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {active && (
                    <span className="bg-brand absolute inset-y-1.5 left-0 w-0.5 rounded-full" />
                  )}
                  {item.title}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-2 border-t pt-5">
        <Link
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-foreground group flex items-center gap-2 px-2 text-sm transition-colors"
        >
          <Github className="size-4" />
          GitHub repository
          <ArrowUpRight className="ml-auto size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
        <Link
          href={siteConfig.npm}
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-foreground group flex items-center gap-2 px-2 text-sm transition-colors"
        >
          <Download className="size-4" />
          npm package
          <ArrowUpRight className="ml-auto size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </div>
    </div>
  );
}
