import type { Metadata } from "next";

import { CodeBlock } from "@/components/code-block";
import {
  Callout,
  DocSection,
  InlineCode,
  PageTitle,
  PropsTable,
  type PropRow,
} from "@/components/docs-components";
import { typeDefinitions } from "@/lib/snippets";

export const metadata: Metadata = {
  title: "Props",
  description:
    "Complete reference for every prop accepted by ReactNativeKanbanBoard.",
};

const requiredRows: PropRow[] = [
  {
    name: "columnData",
    type: "columnDataType<T, K>[]",
    required: true,
    description:
      "Ordered list of columns. Each entry has a header object K and an items array T[].",
  },
  {
    name: "renderItem",
    type: "(props: T, isDragged?: boolean) => JSX.Element",
    required: true,
    description:
      "Renders each card. isDragged is true for the floating drag preview.",
  },
  {
    name: "renderHeader",
    type: "(props: K) => JSX.Element",
    required: true,
    description:
      "Renders the header of each column. The item count is appended by the board.",
  },
  {
    name: "onDragEnd",
    type: "(params: { fromColumnIndex: number; toColumnIndex: number; itemId: string }) => void",
    required: true,
    description:
      "Called when a card is dropped into a different column. Mutate your state here.",
  },
];

const layoutRows: PropRow[] = [
  {
    name: "columnWidth",
    type: "number",
    defaultValue: "screen width × 0.8",
    description:
      "Width of each column in pixels. Also used as the horizontal snap interval.",
  },
  {
    name: "gapBetweenColumns",
    type: "number",
    defaultValue: "12",
    description:
      "Horizontal gap between columns. The same value is used as inner column padding.",
  },
  {
    name: "containerStyle",
    type: "ViewStyle",
    defaultValue: "{}",
    description:
      "Style for the outer horizontal FlatList. Use it for flex, background, or margins.",
  },
  {
    name: "contentContainerStyle",
    type: "ViewStyle",
    defaultValue: "{}",
    description:
      "Style for the horizontal FlatList content container. Useful for vertical padding.",
  },
];

const styleRows: PropRow[] = [
  {
    name: "columnHeaderStyle",
    type: "ViewStyle",
    defaultValue: "{}",
    description:
      "Style for the header wrapper of each column, above the card list.",
  },
  {
    name: "columnContainerStyle",
    type: "ViewStyle",
    defaultValue: "{}",
    description:
      "Base style applied to every column container.",
  },
  {
    name: "columnContainerStyleOnDrag",
    type: "ViewStyle",
    defaultValue: "{}",
    description:
      "Merged over columnContainerStyle when another column is the active drop target.",
  },
];

export default function PropsPage() {
  return (
    <article className="flex flex-col gap-10">
      <PageTitle
        eyebrow="API reference"
        title="Props"
        description="The component accepts four required props and seven optional styling and layout props."
      />

      <DocSection
        id="required-props"
        title="Required props"
        description="These four props define the board."
      >
        <PropsTable rows={requiredRows} />
        <Callout type="info" title="The board never mutates your data">
          <InlineCode>columnData</InlineCode> is treated as read-only. Moving
          an item is your responsibility inside{" "}
          <InlineCode>onDragEnd</InlineCode>.
        </Callout>
      </DocSection>

      <DocSection
        id="layout-props"
        title="Layout props"
        description="Control how wide columns are and how the board sits in its parent."
      >
        <PropsTable rows={layoutRows} />
      </DocSection>

      <DocSection
        id="style-props"
        title="Style props"
        description="All styles are React Native ViewStyle objects."
      >
        <PropsTable rows={styleRows} />
      </DocSection>

      <DocSection
        id="full-reference"
        title="Full reference"
        description="The complete TypeScript interface, copied from src/types.ts."
      >
        <CodeBlock
          code={typeDefinitions}
          language="ts"
          filename="types.ts"
        />
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            ["4", "required props"],
            ["7", "optional props"],
            ["2", "generics"],
            ["1", "drag callback"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-card flex items-baseline gap-2 rounded-lg border p-3"
            >
              <span className="text-lg font-semibold">{value}</span>
              <span className="text-muted-foreground text-xs uppercase tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </div>
      </DocSection>
    </article>
  );
}
