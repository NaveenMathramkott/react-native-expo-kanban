import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Gauge,
  Layers,
  MoveHorizontal,
  Palette,
  Smartphone,
} from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import {
  Callout,
  DocSection,
  InlineCode,
  PageTitle,
} from "@/components/docs-components";
import { InstallCommand } from "@/components/install-command";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { minimalExample } from "@/lib/snippets";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "An overview of react-native-expo-kanban: features, architecture, and a quick start.",
};

const features = [
  {
    icon: MoveHorizontal,
    title: "Drag & drop",
    copy: "Long-press to lift, drag to another column, release to drop.",
  },
  {
    icon: Palette,
    title: "Custom rendering",
    copy: "renderItem and renderHeader keep your design system intact.",
  },
  {
    icon: Smartphone,
    title: "Responsive",
    copy: "Column width defaults to 80% of the screen and is overridable.",
  },
  {
    icon: Layers,
    title: "Controlled data",
    copy: "Move items in onDragEnd; the board renders from your state.",
  },
  {
    icon: Gauge,
    title: "Reanimated 3",
    copy: "Drop previews and pagination run on the UI thread.",
  },
  {
    icon: Boxes,
    title: "Typed",
    copy: "Generic item and header types across every callback.",
  },
];

export default function IntroductionPage() {
  return (
    <article className="flex flex-col gap-10">
      <PageTitle
        eyebrow="Getting started"
        title="Introduction"
        description="react-native-expo-kanban is a controlled kanban board component for React Native and Expo. It handles gestures, drag previews, and column pagination while you keep ownership of data and rendering."
      />

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="brand">v1.0.8</Badge>
        <Badge variant="outline">MIT license</Badge>
        <Badge variant="outline">Expo</Badge>
        <Badge variant="outline">TypeScript</Badge>
        <Badge variant="outline">Reanimated 3</Badge>
      </div>

      <DocSection
        id="overview"
        title="Overview"
        description="One component, two callbacks you care about, and a plain array of columns."
      >
        <p>
          The package exports a single default component,{" "}
          <InlineCode>ReactNativeKanbanBoard</InlineCode>. You describe your
          board as an array of columns, each with a header object and an array
          of items. You render each card and header with your own components.
          When a card is dropped into a different column, the board calls{" "}
          <InlineCode>onDragEnd</InlineCode> with the source index, destination
          index, and item id.
        </p>

        <div className="my-2 overflow-hidden rounded-xl border">
          <Image
            src="/demo.gif"
            alt="Kanban board with cards being dragged between columns"
            width={864}
            height={864}
            unoptimized
            className="h-auto w-full"
          />
        </div>

        <Callout type="tip" title="Fits any Expo workflow">
          The component has no native code of its own. It builds on{" "}
          <InlineCode>react-native-reanimated</InlineCode> and{" "}
          <InlineCode>react-native-gesture-handler</InlineCode>, both of which
          are supported by Expo Go and development builds.
        </Callout>
      </DocSection>

      <DocSection
        id="features"
        title="Features"
        description="What ships in the box."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card flex items-start gap-3 rounded-lg border p-4"
            >
              <span className="bg-brand/10 text-brand flex size-8 shrink-0 items-center justify-center rounded-lg">
                <feature.icon className="size-4" />
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="text-foreground text-sm font-semibold">
                  {feature.title}
                </p>
                <p className="text-muted-foreground text-[13px] leading-6">
                  {feature.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection
        id="how-it-works"
        title="How it works"
        description="The component is a horizontal FlatList of vertical FlatLists."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Columns",
              copy: "A horizontal paging FlatList holds one view per column.",
            },
            {
              step: "02",
              title: "Cards",
              copy: "Each column is a vertical FlatList of DataCard wrappers.",
            },
            {
              step: "03",
              title: "Gesture",
              copy: "A shared pan gesture drives the drag overlay and pagination.",
            },
          ].map((item) => (
            <div key={item.step} className="bg-card rounded-lg border p-4">
              <p className="text-brand font-mono text-xs">{item.step}</p>
              <p className="mt-1.5 text-sm font-semibold">{item.title}</p>
              <p className="text-muted-foreground mt-1 text-[13px] leading-6">
                {item.copy}
              </p>
            </div>
          ))}
        </div>

        <p>
          Only the column under the viewport is draggable at a time.{" "}
          <InlineCode>useDragGesture</InlineCode> tracks the lifted card,{" "}
          <InlineCode>useColumnPagination</InlineCode> scrolls when the pointer
          nears an edge, and the drop callback decides whether{" "}
          <InlineCode>onDragEnd</InlineCode> should fire.
        </p>
      </DocSection>

      <DocSection
        id="quick-start"
        title="Quick start"
        description="Install the package, then render the board with your columns."
      >
        <InstallCommand />
        <CodeBlock
          code={minimalExample}
          language="tsx"
          filename="BoardScreen.tsx"
        />
        <div className="flex flex-wrap gap-3">
          <Button asChild size="sm">
            <Link href="/docs/installation">
              Installation guide
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/docs/usage">Full usage guide</Link>
          </Button>
        </div>
      </DocSection>

      <DocSection
        id="project-status"
        title="Project status"
        description="The package is open source and MIT licensed."
      >
        <p>
          The current published version is <InlineCode>1.0.5</InlineCode>.
          Source, issues, and releases live on{" "}
          <Link
            href="https://github.com/NaveenMathramkott/react-native-expo-kanban"
            target="_blank"
            rel="noreferrer"
            className="text-foreground font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          , and the package is on{" "}
          <Link
            href="https://www.npmjs.com/package/react-native-expo-kanban"
            target="_blank"
            rel="noreferrer"
            className="text-foreground font-medium underline underline-offset-4"
          >
            npm
          </Link>
          . GitHub stars, forks, and npm download counts shown in the header are
          fetched live from the GitHub and npm APIs and cached for one hour.
        </p>
      </DocSection>
    </article>
  );
}
