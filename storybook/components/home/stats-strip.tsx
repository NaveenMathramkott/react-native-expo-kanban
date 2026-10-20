import { Download, GitFork, Scale, Star } from "lucide-react";

import type { RepoStats } from "@/lib/stats";
import { formatCount } from "@/lib/utils";

export function StatsStrip({ stats }: { stats: RepoStats }) {
  const items = [
    {
      label: "GitHub stars",
      value: formatCount(stats.stars ?? undefined),
      icon: Star,
    },
    {
      label: "Forks",
      value: formatCount(stats.forks ?? undefined),
      icon: GitFork,
    },
    {
      label: "Total npm downloads",
      value: formatCount(stats.totalDownloads ?? undefined),
      icon: Download,
    },
    {
      label: "License",
      value: "MIT",
      icon: Scale,
    },
  ];

  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-2 divide-x divide-y overflow-hidden rounded-xl border sm:grid-cols-4 sm:divide-y-0">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-card/50 flex flex-col items-center justify-center gap-1.5 px-4 py-6"
        >
          <item.icon className="text-muted-foreground size-4" />
          <p className="text-xl font-semibold tracking-tight">{item.value}</p>
          <p className="text-muted-foreground text-center text-[11px] font-medium uppercase tracking-wider">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
