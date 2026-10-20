import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

export function CodeBlock({
  code,
  language,
  filename,
  className,
  compact = false,
}: {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-zinc-950 dark:bg-black/60 group relative min-w-0 max-w-full overflow-hidden rounded-lg border border-zinc-800 text-zinc-100 shadow-sm",
        className
      )}
    >
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-4 py-2">
          <span className="font-mono text-xs text-zinc-400">
            {filename ?? language}
          </span>
          <CopyButton
            value={code}
            className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          />
        </div>
      )}
      <pre
        className={cn(
          "scrollbar-thin max-w-full overflow-x-auto p-4 font-mono text-[13px] leading-relaxed",
          compact && "p-3 text-xs"
        )}
      >
        <code>{code}</code>
      </pre>
      {!filename && !language && (
        <CopyButton
          value={code}
          className="absolute right-2 top-2 text-zinc-400 opacity-0 transition-opacity hover:bg-zinc-800 hover:text-zinc-100 group-hover:opacity-100"
        />
      )}
    </div>
  );
}
