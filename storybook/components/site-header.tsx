import Link from "next/link";
import { ArrowUpRight, Download, GitFork, Github, Star } from "lucide-react";

import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { TopNav } from "@/components/top-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { getStats } from "@/lib/stats";
import { formatCount } from "@/lib/utils";

export async function SiteHeader() {
  const stats = await getStats();

  return (
    <header className="bg-background/80 supports-[backdrop-filter]:bg-background/65 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <MobileNav />

        <Logo />

        <Badge
          variant="outline"
          className="text-muted-foreground hidden font-mono text-[11px] sm:inline-flex"
        >
          v{stats.version}
        </Badge>

        <div className="ml-2">
          <TopNav />
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            title={`${formatCount(stats.stars ?? undefined)} GitHub stars`}
            className="text-muted-foreground hover:text-foreground hover:border-border hidden h-8 items-center gap-1.5 rounded-md border border-transparent px-2 text-xs font-medium transition-colors sm:flex"
          >
            <Star className="size-3.5" />
            <span>{formatCount(stats.stars ?? undefined)}</span>
          </Link>

          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            title={`${formatCount(stats.forks ?? undefined)} forks`}
            className="text-muted-foreground hover:text-foreground hover:border-border hidden h-8 items-center gap-1.5 rounded-md border border-transparent px-2 text-xs font-medium transition-colors lg:flex"
          >
            <GitFork className="size-3.5" />
            <span>{formatCount(stats.forks ?? undefined)}</span>
          </Link>

          <Link
            href={siteConfig.npm}
            target="_blank"
            rel="noreferrer"
            title={`${formatCount(stats.totalDownloads ?? undefined)} total npm downloads`}
            className="text-muted-foreground hover:text-foreground hover:border-border flex h-8 items-center gap-1.5 rounded-md border border-transparent px-2 text-xs font-medium transition-colors"
          >
            <Download className="size-3.5" />
            <span>{formatCount(stats.totalDownloads ?? undefined)}</span>
          </Link>

          <Button
            asChild
            variant="ghost"
            size="icon-sm"
            className="sm:hidden"
            aria-label="GitHub repository"
          >
            <Link href={siteConfig.github} target="_blank" rel="noreferrer">
              <Github className="size-4" />
            </Link>
          </Button>

          <ThemeToggle />

          <Button asChild size="sm" className="ml-1 hidden sm:inline-flex">
            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="gap-2"
            >
              <Github className="size-4" />
              GitHub
              <ArrowUpRight className="size-3.5 opacity-70" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
