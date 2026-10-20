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
import {
  dragContextSnippet,
  dragGestureSignature,
  layoutAnimationSnippet,
  paginationSignature,
} from "@/lib/snippets";

export const metadata: Metadata = {
  title: "Hooks",
  description:
    "Reference for useDragGesture, useColumnPagination, useLayoutAnimation, and useDragContext.",
};

const dragOptions: PropRow[] = [
  {
    name: "paginate",
    type: '"left" | "right" | "center"',
    required: true,
    description:
      "Scrolls the horizontal pager while the drag pointer nears an edge.",
  },
  {
    name: "toColumnIndex",
    type: "number",
    required: true,
    description:
      "The column currently under the viewport, used to decide whether a drop changed columns.",
  },
  {
    name: "onDragEndSuccess",
    type: "(params) => void",
    required: true,
    description: "The board's onDragEnd callback.",
  },
  {
    name: "onDrop",
    type: "() => void",
    required: true,
    description:
      "Called on every gesture finalize, used to re-enable scrolling.",
  },
];

const paginationOptions: PropRow[] = [
  {
    name: "columnsHorizontalScrollRef",
    type: "AnimatedRef<Animated.FlatList>",
    required: true,
    description: "Ref to the horizontal column list.",
  },
  {
    name: "constants",
    type: "{ edgeColumnOff: number; columnContainerWidth: number }",
    required: true,
    description:
      "Precomputed offsets derived from the screen and column widths.",
  },
];

const layoutOptions: PropRow[] = [
  {
    name: "effectType",
    type: "'linear' | 'spring' | 'easeInEaseOut' | 'opacitiy'",
    defaultValue: "'opacitiy'",
    description:
      "LayoutAnimation preset. Note the original spelling in the source.",
  },
  {
    name: "duration",
    type: "number",
    defaultValue: "200",
    description: "Animation duration in milliseconds.",
  },
];

export default function HooksPage() {
  return (
    <article className="flex flex-col gap-10">
      <PageTitle
        eyebrow="API reference"
        title="Hooks"
        description="The board is assembled from four hooks. They are internal, but understanding them helps when debugging gestures or building a custom board."
      />

      <DocSection
        id="use-drag-gesture"
        title="useDragGesture"
        description="Owns the pan gesture, drag preview values, and the dropped-item state."
      >
        <p>
          The hook creates a manual-activation pan gesture. It only activates
          after a card has been lifted via long-press, then writes translation
          values into <InlineCode>dragX</InlineCode> and{" "}
          <InlineCode>dragY</InlineCode> shared values.
        </p>
        <CodeBlock
          code={dragGestureSignature}
          language="tsx"
          filename="useDragGesture.ts"
        />
        <PropsTable rows={dragOptions} />
        <Callout type="tip" title="Edge thresholds">
          Pagination triggers when <InlineCode>absoluteX</InlineCode> is within
          50px of either screen edge. The throttle in{" "}
          <InlineCode>useColumnPagination</InlineCode> prevents rapid repeats.
        </Callout>
      </DocSection>

      <DocSection
        id="use-column-pagination"
        title="useColumnPagination"
        description="Scrolls the board left, right, or back to center."
      >
        <CodeBlock
          code={paginationSignature}
          language="tsx"
          filename="useColumnPagination.ts"
        />
        <PropsTable rows={paginationOptions} />
        <p>
          <InlineCode>paginate</InlineCode> is throttled to one call per second
          with leading edge execution. It also stores the currently visible
          column index, updated when horizontal momentum scrolling ends.
        </p>
      </DocSection>

      <DocSection
        id="use-layout-animation"
        title="useLayoutAnimation"
        description="A small wrapper around React Native LayoutAnimation."
      >
        <CodeBlock
          code={layoutAnimationSnippet}
          language="tsx"
          filename="MyList.tsx"
        />
        <PropsTable rows={layoutOptions} />
        <p>
          The hook enables layout animations, applies a preset, and disables them
          again after 250ms. This workaround keeps Android animations reliable
          alongside Reanimated.
        </p>
      </DocSection>

      <DocSection
        id="use-drag-context"
        title="useDragContext"
        description="Read the card currently being dragged from any descendant."
      >
        <CodeBlock
          code={dragContextSnippet}
          language="tsx"
          filename="CardOverlay.tsx"
        />
        <p>
          The context exposes <InlineCode>setDragCard</InlineCode>,{" "}
          <InlineCode>dragCard</InlineCode>, and the shared{" "}
          <InlineCode>dragX</InlineCode> / <InlineCode>dragY</InlineCode>{" "}
          values. It is provided by the board, so consumers must render inside
          it.
        </p>
      </DocSection>

      <DocSection
        id="composing-hooks"
        title="Composing hooks"
        description="How the board wires them together."
      >
        <ol className="flex list-decimal flex-col gap-2 pl-5">
          <li>
            <InlineCode>useColumnPagination</InlineCode> exposes{" "}
            <InlineCode>paginate</InlineCode> and the current column index.
          </li>
          <li>
            <InlineCode>useDragGesture</InlineCode> consumes{" "}
            <InlineCode>paginate</InlineCode> and the current column index.
          </li>
          <li>
            The board subscribes to the drop preview with{" "}
            <InlineCode>useAnimatedStyle</InlineCode>.
          </li>
          <li>
            <InlineCode>DragContextValue.Provider</InlineCode> shares drag state
            with cards.
          </li>
        </ol>
        <Callout type="warning" title="Not a public API">
          These hooks are shipped in <InlineCode>dist</InlineCode> and can be
          imported by deep path, but they are not covered by semver. Prefer the
          component unless you need something custom.
        </Callout>
      </DocSection>
    </article>
  );
}
