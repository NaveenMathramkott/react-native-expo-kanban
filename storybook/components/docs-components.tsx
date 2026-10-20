import * as React from "react";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PageTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-3">
      {eyebrow && (
        <p className="text-brand text-xs font-semibold uppercase tracking-widest">
          {eyebrow}
        </p>
      )}
      <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground max-w-2xl text-base leading-7">
          {description}
        </p>
      )}
    </div>
  );
}

export function DocSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t pt-10 first:border-t-0 first:pt-0">
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="group flex scroll-mt-24 items-center gap-2 text-xl font-semibold tracking-tight">
          <a href={`#${id}`} className="hover:text-brand transition-colors">
            {title}
          </a>
        </h2>
        {description && (
          <p className="text-muted-foreground text-sm leading-6">{description}</p>
        )}
      </div>
      <div className="flex flex-col gap-4 text-sm leading-7 [&_code]:font-mono [&_code]:text-[13px] [&_p]:text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-muted text-foreground rounded-md border px-1.5 py-0.5 text-[12.5px] font-medium">
      {children}
    </code>
  );
}

const calloutStyles = {
  info: {
    icon: Info,
    className: "border-sky-500/25 bg-sky-500/5 text-sky-900 dark:text-sky-100",
    iconClassName: "text-sky-500",
  },
  tip: {
    icon: Lightbulb,
    className:
      "border-emerald-500/25 bg-emerald-500/5 text-emerald-900 dark:text-emerald-100",
    iconClassName: "text-emerald-500",
  },
  warning: {
    icon: AlertTriangle,
    className:
      "border-amber-500/25 bg-amber-500/5 text-amber-900 dark:text-amber-100",
    iconClassName: "text-amber-500",
  },
} as const;

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof calloutStyles;
  title?: string;
  children: React.ReactNode;
}) {
  const style = calloutStyles[type];
  const Icon = style.icon;

  return (
    <div className={cn("my-2 flex gap-3 rounded-lg border p-4", style.className)}>
      <Icon className={cn("mt-0.5 size-4 shrink-0", style.iconClassName)} />
      <div className="flex flex-col gap-1 text-sm leading-6">
        {title && <p className="font-semibold">{title}</p>}
        <div className="opacity-90 [&_a]:font-medium [&_a]:underline">{children}</div>
      </div>
    </div>
  );
}

export type PropRow = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
};

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="scrollbar-thin my-2 overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-muted/60">
            <th className="px-4 py-2.5 font-semibold">Prop</th>
            <th className="px-4 py-2.5 font-semibold">Type</th>
            <th className="px-4 py-2.5 font-semibold">Default</th>
            <th className="px-4 py-2.5 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t align-top">
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="font-mono text-[12.5px] font-medium">
                  {row.name}
                </span>
                {row.required && (
                  <Badge variant="brand" className="ml-2 text-[10px]">
                    required
                  </Badge>
                )}
              </td>
              <td className="text-muted-foreground px-4 py-3 font-mono text-[12px]">
                {row.type}
              </td>
              <td className="text-muted-foreground px-4 py-3 font-mono text-[12px] whitespace-nowrap">
                {row.defaultValue ?? "—"}
              </td>
              <td className="text-muted-foreground px-4 py-3 text-[13px] leading-6">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="bg-brand/10 text-brand flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
        {number}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 pb-2">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex flex-col gap-3 text-sm leading-7 [&_p]:text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
