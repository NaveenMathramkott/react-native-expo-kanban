import type { Metadata } from "next";

import { CodeBlock } from "@/components/code-block";
import {
  Callout,
  DocSection,
  InlineCode,
  PageTitle,
} from "@/components/docs-components";
import { itemParamsType, typeDefinitions } from "@/lib/snippets";

export const metadata: Metadata = {
  title: "Types",
  description:
    "Board, column, item, and drag types used by react-native-expo-kanban.",
};

const genericUsage = `type Lead = {
  id: string;
  name: string;
  company: string;
  priority: 'low' | 'medium' | 'high';
};

type ColumnHeader = {
  title: string;
  subtitle?: string;
};

// T = Lead, K = ColumnHeader
<ReactNativeKanbanBoard<Lead, ColumnHeader>
  columnData={columns}
  renderItem={(lead, isDragged) => (
    <LeadCard lead={lead} isDragged={isDragged} />
  )}
  renderHeader={(header) => <Header {...header} />}
  onDragEnd={({ itemId }) => console.log(itemId)}
/>;`;

const dragType = `export interface DraggedCardProps<T> {
  id: string;
  y: number;
  x: number;
  width: number;
  props: T;
  columnIndex: number;
}`;

export default function TypesPage() {
  return (
    <article className="flex flex-col gap-10">
      <PageTitle
        eyebrow="API reference"
        title="Types"
        description="The library is generic over your item and header shapes. These are the public types that describe the contract."
      />

      <DocSection
        id="board-props"
        title="Board props"
        description="KanbanBoardProps is the full prop contract."
      >
        <CodeBlock
          code={typeDefinitions}
          language="ts"
          filename="types.ts"
        />
      </DocSection>

      <DocSection
        id="column-data"
        title="Column data"
        description="A column pairs a header with its items."
      >
        <CodeBlock
          code={`export type columnDataType<T, K> = {
  header: K;
  items: T[];
};`}
          language="ts"
          filename="column.ts"
        />
        <p>
          The column order in the array is the visual order on screen. There is
          no separate id for a column — indices are used in{" "}
          <InlineCode>onDragEnd</InlineCode>.
        </p>
      </DocSection>

      <DocSection
        id="item-types"
        title="Item types"
        description="Any item shape works as long as it has a string id."
      >
        <CodeBlock
          code={`export type ItemType = { id: string };`}
          language="ts"
          filename="item.ts"
        />
        <p>
          The README&apos;s demo uses a lead-shaped item. It is a good example
          of a richer record, but it is not required by the component.
        </p>
        <CodeBlock
          code={itemParamsType}
          language="ts"
          filename="ItemParams.ts"
        />
      </DocSection>

      <DocSection
        id="drag-types"
        title="Drag types"
        description="Used internally by the drag context and card wrapper."
      >
        <CodeBlock code={dragType} language="ts" filename="drag.ts" />
        <p>
          <InlineCode>DraggedCardProps</InlineCode> stores the measured position
          and size of the lifted card so the overlay can be placed exactly where
          the card was before the gesture began.
        </p>
        <Callout type="warning" title="Import paths">
          The package entry point default-exports the component. The types are
          compiled to <InlineCode>dist/types.d.ts</InlineCode> but are not
          re-exported from <InlineCode>dist/index.d.ts</InlineCode>. Define your
          own item and header types locally — the generics keep them checked at
          the call site.
        </Callout>
      </DocSection>

      <DocSection
        id="generics"
        title="Generics"
        description="T is the item, K is the header."
      >
        <CodeBlock
          code={genericUsage}
          language="tsx"
          filename="BoardScreen.tsx"
        />
        <p>
          If you pass explicit generics, TypeScript validates every callback.
          Without them, the component infers <InlineCode>T</InlineCode> and{" "}
          <InlineCode>K</InlineCode> from <InlineCode>columnData</InlineCode>.
        </p>
      </DocSection>
    </article>
  );
}
