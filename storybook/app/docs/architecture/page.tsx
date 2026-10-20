import type { Metadata } from "next";

import { CodeBlock } from "@/components/code-block";
import {
  Callout,
  DocSection,
  InlineCode,
  PageTitle,
} from "@/components/docs-components";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "A file-by-file index of react-native-expo-kanban and how data flows through the board.",
};

const fileIndex = [
  {
    file: "src/index.tsx",
    role: "Board container",
    copy: "Computes screen constants, renders the horizontal FlatList, wires the drag gesture, and draws the floating preview.",
  },
  {
    file: "src/types.ts",
    role: "Public types",
    copy: "KanbanBoardProps, columnDataType, ItemType, DraggedCardProps, and example header/item shapes.",
  },
  {
    file: "src/components/DataCard.tsx",
    role: "Card wrapper",
    copy: "Memoized Pressable that measures itself on layout and starts a drag on long-press.",
  },
  {
    file: "src/hooks/useDragGesture.ts",
    role: "Gesture state",
    copy: "Creates the manual pan gesture, stores the dragged card, and calls onDragEnd after a successful drop.",
  },
  {
    file: "src/hooks/useColumnPagination.ts",
    role: "Paging",
    copy: "Throttled scrollToOffset helper that pages left, right, or re-centers the board.",
  },
  {
    file: "src/hooks/useLayoutAnimation.ts",
    role: "Layout animation",
    copy: "Configures React Native LayoutAnimation with an Android workaround.",
  },
  {
    file: "src/utils/DraggedCardContext.tsx",
    role: "Drag context",
    copy: "React context that exposes the dragged card and shared drag coordinates.",
  },
];

const constantsSnippet = `const SCREEN_WIDTH = Dimensions.get('screen').width;

const columnContainerWidth = props.columnWidth ?? SCREEN_WIDTH * 0.8;
const scrollTriggerWidth = SCREEN_WIDTH * 0.3;
const edgeColumnOff = columnContainerWidth * 1.5 - SCREEN_WIDTH * 0.5;
const marginAlign = (SCREEN_WIDTH - columnContainerWidth) / 2;

const columnPadding = props.gapBetweenColumns ?? 12;`;

const dragFlow = `long press
  → DataCard.onLongPress
  → measureInWindow()
  → setDragCard({ props, x, y, width, columnIndex, id })
  → gesture activates on touch move
  → dragX / dragY shared values update
  → near edge? paginate('left' | 'right')
  → release
  → drop()
  → onDragEnd({ fromColumnIndex, toColumnIndex, itemId })`;

export default function ArchitecturePage() {
  return (
    <article className="flex flex-col gap-10">
      <PageTitle
        eyebrow="API reference"
        title="Architecture"
        description="The whole package is nine source files. This page is the map — useful when you need to debug a gesture or fork the component."
      />

      <DocSection
        id="entry-point"
        title="Entry point"
        description="Everything starts in src/index.tsx."
      >
        <p>
          The board is a function component generic over{" "}
          <InlineCode>T extends ItemType</InlineCode> and{" "}
          <InlineCode>K</InlineCode>. It keeps two pieces of React state: the
          current destination column and the dragged item. Shared values for X
          and Y live in Reanimated.
        </p>
        <CodeBlock
          code={constantsSnippet}
          language="ts"
          filename="constants.ts"
        />
        <p>
          <InlineCode>edgeColumnOff</InlineCode> and{" "}
          <InlineCode>marginAlign</InlineCode> convert between screen pixels and
          the horizontal list&apos;s offset space. They are what make the first
          column appear centered with neighbors peeking in.
        </p>
      </DocSection>

      <DocSection
        id="components"
        title="Components"
        description="Two components: the board and the card wrapper."
      >
        <p>
          The board renders one <InlineCode>View</InlineCode> per column. Each
          column contains the header, the count, and a vertical{" "}
          <InlineCode>FlatList</InlineCode>. Cards are wrapped in{" "}
          <InlineCode>DataCard</InlineCode>, a memoized{" "}
          <InlineCode>Pressable</InlineCode> that measures its own window
          position and hides itself while its preview is being dragged.
        </p>
        <Callout type="tip" title="Why measure in window?">
          The drag overlay is rendered as an absolute sibling of the column
          list. Window coordinates let it start exactly where the card was,
          regardless of scroll offsets or parent padding.
        </Callout>
      </DocSection>

      <DocSection
        id="hooks"
        title="Hooks"
        description="Each hook has one job."
      >
        <ul className="flex flex-col gap-2">
          {[
            "useDragGesture — gesture lifecycle and drop decisions",
            "useColumnPagination — horizontal paging with a throttle",
            "useLayoutAnimation — LayoutAnimation presets with Android support",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="bg-brand mt-2.5 size-1.5 shrink-0 rounded-full" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
        <p>
          The hooks are documented individually on the{" "}
          <a
            href="/docs/hooks"
            className="text-foreground font-medium underline underline-offset-4"
          >
            Hooks
          </a>{" "}
          page.
        </p>
      </DocSection>

      <DocSection
        id="utilities"
        title="Utilities"
        description="Shared drag state for descendants."
      >
        <p>
          <InlineCode>DraggedCardContext</InlineCode> creates a React context
          holding the lifted card and the drag shared values. The board provides
          it, and cards or overlays can consume it with{" "}
          <InlineCode>useDragContext</InlineCode>.
        </p>
      </DocSection>

      <DocSection
        id="data-flow"
        title="Data flow"
        description="From finger down to your state update."
      >
        <CodeBlock code={dragFlow} language="text" filename="flow.txt" />
        <p>
          The board never updates <InlineCode>columnData</InlineCode>. It
          reports the indices and id, then waits for the parent to produce new
          columns. That keeps the component predictable and compatible with any
          state library.
        </p>
      </DocSection>

      <DocSection
        id="file-index"
        title="File index"
        description="Every source file in the package."
      >
        <div className="flex flex-col gap-2">
          {fileIndex.map((entry) => (
            <div
              key={entry.file}
              className="bg-card flex flex-col gap-1 rounded-lg border p-3.5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <code className="text-foreground font-mono text-[12.5px] font-medium">
                  {entry.file}
                </code>
                <span className="text-brand text-[10px] font-semibold uppercase tracking-wider">
                  {entry.role}
                </span>
              </div>
              <p className="text-muted-foreground text-[13px] leading-6">
                {entry.copy}
              </p>
            </div>
          ))}
        </div>
        <Callout type="warning" title="Watch the typo">
          The layout animation option is spelled{" "}
          <InlineCode>opacitiy</InlineCode> in the source. It is documented
          as-is so a future fix is easy to spot.
        </Callout>
      </DocSection>
    </article>
  );
}
