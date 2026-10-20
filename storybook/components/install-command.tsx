"use client";

import { Check, Copy, Terminal } from "lucide-react";
import * as React from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const managers = [
  { id: "npm", command: "npm install react-native-expo-kanban" },
  { id: "pnpm", command: "pnpm add react-native-expo-kanban" },
  { id: "yarn", command: "yarn add react-native-expo-kanban" },
  { id: "bun", command: "bun add react-native-expo-kanban" },
];

function CommandRow({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex min-w-0 items-center gap-2 font-mono text-[13px] sm:text-sm">
      <Terminal className="text-muted-foreground size-4 shrink-0" />
      <span className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap">
        <span className="text-brand">$ </span>
        {command}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy command"
        className="text-muted-foreground hover:bg-accent hover:text-foreground inline-flex size-7 shrink-0 items-center justify-center rounded-md transition-colors"
      >
        {copied ? (
          <Check className="text-success size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    </div>
  );
}

export function InstallCommand({
  className,
  centered = false,
}: {
  className?: string;
  centered?: boolean;
}) {
  return (
    <Tabs defaultValue="npm" className={cn("min-w-0", className)}>
      <TabsList
        className={cn("bg-muted/60 h-8", centered && "self-center")}
      >
        {managers.map((manager) => (
          <TabsTrigger key={manager.id} value={manager.id} className="text-xs">
            {manager.id}
          </TabsTrigger>
        ))}
      </TabsList>
      {managers.map((manager) => (
        <TabsContent
          key={manager.id}
          value={manager.id}
          className="bg-card min-w-0 overflow-hidden rounded-lg border px-3 py-2.5 shadow-xs"
        >
          <CommandRow command={manager.command} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
