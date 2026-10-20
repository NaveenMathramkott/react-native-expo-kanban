import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5 text-sm font-semibold tracking-tight",
        className,
      )}
    >
      <span className="hidden flex-col leading-none sm:flex">
        <span>React Native Expo Kanban</span>
      </span>
      <span className="sm:hidden">Expo Kanban</span>
    </Link>
  );
}
