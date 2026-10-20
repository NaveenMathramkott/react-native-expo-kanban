import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Check,
  Code2,
  Github,
} from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import { FeatureGrid } from "@/components/home/feature-grid";
import { PhoneShowcase } from "@/components/home/phone-showcase";
import { StatsStrip } from "@/components/home/stats-strip";
import { InstallCommand } from "@/components/install-command";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { getStats } from "@/lib/stats";

const homeUsage = `import React, { useState } from 'react';
import ReactNativeKanbanBoard from 'react-native-expo-kanban';

export default function BoardScreen() {
  const [columns, setColumns] = useState(initialColumns);

  return (
    <ReactNativeKanbanBoard
      columnData={columns}
      renderItem={(item, isDragged) => (
        <LeadCard item={item} isDragged={isDragged} />
      )}
      renderHeader={(header) => <ColumnHeader {...header} />}
      onDragEnd={({ fromColumnIndex, toColumnIndex, itemId }) => {
        setColumns((prev) =>
          moveCard(prev, fromColumnIndex, toColumnIndex, itemId)
        );
      }}
      columnWidth={320}
      gapBetweenColumns={12}
    />
  );
}`;

const highlights = [
  "Controlled columns — you own the data and the drop logic",
  "Custom cards and headers with render props",
  "Drag preview, drop hover states, and edge pagination",
  "TypeScript generics for items and column headers",
];

const steps = [
  "Install the package and its peer dependencies.",
  "Describe columns as an array of headers and items.",
  "Render your cards and column headers.",
  "Move the item in onDragEnd to update your state.",
];

const docCards = [
  {
    href: "/docs/installation",
    icon: BookOpen,
    title: "Installation",
    description:
      "Install the package, configure Reanimated, and wrap your app in GestureHandlerRootView.",
  },
  {
    href: "/docs/usage",
    icon: Code2,
    title: "Usage",
    description:
      "Define your data model, render cards, and handle dropped items with onDragEnd.",
  },
  {
    href: "/docs/props",
    icon: Boxes,
    title: "API reference",
    description:
      "Browse every prop, type, and hook that the board exposes.",
  },
];

export default async function Home() {
  const stats = await getStats();

  return (
    <>
      <main className="flex-1">
        <section className="border-b">
          <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:py-24">
            <div className="mb-5 flex flex-wrap justify-center gap-2">
              <Badge variant="outline">v{stats.version}</Badge>
              <Badge variant="outline">MIT License</Badge>
              <Badge variant="outline">TypeScript</Badge>
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              React Native Expo Kanban
            </h1>

            <p className="text-muted-foreground mt-4 text-xl font-medium sm:text-2xl">
              Drag-and-drop kanban boards for React Native.
            </p>

            <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
              A controlled kanban board component for Expo apps. Bring your own
              cards, keep your own state, and let Reanimated handle the motion.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/docs/installation">
                  Get started
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="size-4" />
                  View on GitHub
                </Link>
              </Button>
            </div>

            <div className="mt-6 w-full max-w-md">
              <InstallCommand centered />
            </div>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="min-w-0">
              <p className="text-muted-foreground mb-2 text-sm font-semibold uppercase tracking-wider">
                Overview
              </p>
              <h2 className="text-balance text-3xl font-bold tracking-tight">
                Create kanban screens for Android, iOS, and Expo
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-7">
                The board renders one column at a time on phones and pages
                horizontally as cards are dragged toward the edge. Cards lift on
                long-press, follow your finger, and drop into the column under
                the viewport.
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="text-success mt-1 size-4 shrink-0" />
                    <span className="text-muted-foreground text-sm leading-6">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Button asChild variant="outline" className="mt-7">
                <Link href="/docs/usage">
                  Read the usage guide
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="min-w-0">
              <PhoneShowcase
                src="/demo.gif"
                alt="Kanban board with cards being dragged between columns"
                caption="Long-press a card to lift it, then drag it to another column."
              />
            </div>
          </div>
        </section>

        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <StatsStrip stats={stats} />
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-muted-foreground mb-2 text-sm font-semibold uppercase tracking-wider">
                Features
              </p>
              <h2 className="text-balance text-3xl font-bold tracking-tight">
                Everything you need for a kanban screen
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-7">
                The component handles gestures, drag previews, and pagination.
                Your app keeps ownership of data, rendering, and business rules.
              </p>
            </div>

            <div className="mt-10">
              <FeatureGrid />
            </div>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="min-w-0">
              <p className="text-muted-foreground mb-2 text-sm font-semibold uppercase tracking-wider">
                Demo
              </p>
              <h2 className="text-balance text-3xl font-bold tracking-tight">
                Drag, page, and drop between columns
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-7">
                Dragging near either edge pages the board to the next column.
                Releasing a card over a new column fires onDragEnd, while a drop
                in the same column springs the preview back into place.
              </p>
              <p className="text-muted-foreground mt-4 text-base leading-7">
                Every interaction runs through Reanimated&apos;s shared values, so
                the drag preview stays smooth on both platforms.
              </p>
              <Button asChild variant="outline" className="mt-7">
                <Link href="/docs/examples">
                  Explore examples
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="min-w-0">
              <PhoneShowcase
                src="/demo2.gif"
                alt="Full interaction demo of the kanban board"
                caption="Column pagination, drag preview, and drop state."
              />
            </div>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="min-w-0">
              <p className="text-muted-foreground mb-2 text-sm font-semibold uppercase tracking-wider">
                Quick start
              </p>
              <h2 className="text-balance text-3xl font-bold tracking-tight">
                From install to dragging in four steps
              </h2>

              <ol className="mt-8 flex flex-col gap-5">
                {steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="bg-muted text-foreground flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground pt-0.5 text-sm leading-6">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              <Button asChild variant="outline" className="mt-8">
                <Link href="/docs/installation">
                  Installation guide
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="min-w-0">
              <CodeBlock
                code={homeUsage}
                language="tsx"
                filename="BoardScreen.tsx"
              />
            </div>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-muted-foreground mb-2 text-sm font-semibold uppercase tracking-wider">
                Documentation
              </p>
              <h2 className="text-balance text-3xl font-bold tracking-tight">
                Explore the documentation
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-7">
                Setup instructions, the full prop and type reference, and a
                file-by-file look at how the board is built.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {docCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="hover:border-foreground/30 flex flex-col gap-3 rounded-lg border p-5 transition-colors"
                >
                  <card.icon className="size-5" />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{card.title}</h3>
                    <p className="text-muted-foreground text-sm leading-6">
                      {card.description}
                    </p>
                  </div>
                  <span className="text-muted-foreground mt-auto flex items-center gap-1.5 pt-2 text-xs font-medium">
                    Read more
                    <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6">
            <h2 className="text-balance text-3xl font-bold tracking-tight">
              Ready to add a kanban board?
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl text-base leading-7">
              Install the package, render your cards, and handle one callback.
              The board takes care of gestures and column pagination.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/docs/installation">
                  Get started
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={siteConfig.github} target="_blank" rel="noreferrer">
                  <Github className="size-4" />
                  Star the repo
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
