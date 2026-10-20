import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import {
  Callout,
  DocSection,
  InlineCode,
  PageTitle,
} from "@/components/docs-components";
import { Button } from "@/components/ui/button";
import {
  basicData,
  basicTypes,
  basicUsage,
  dragEndSnippet,
  renderSnippet,
  stylingSnippet,
} from "@/lib/snippets";

export const metadata: Metadata = {
  title: "Usage",
  description:
    "Define columns, render cards and headers, and move items in onDragEnd.",
};

export default function UsagePage() {
  return (
    <article className="flex flex-col gap-10">
      <PageTitle
        eyebrow="Getting started"
        title="Usage"
        description="The board is controlled: it renders the columns you pass and reports drops. You move the item in state."
      />

      <DocSection
        id="data-model"
        title="Data model"
        description="Columns are plain objects. Items only need an id."
      >
        <p>
          Define an item type with an <InlineCode>id: string</InlineCode> and a
          header type of your choosing. TypeScript will infer both through the
          component&apos;s generics.
        </p>
        <CodeBlock
          code={basicTypes}
          language="tsx"
          filename="types.ts"
        />
        <CodeBlock
          code={basicData}
          language="tsx"
          filename="columns.ts"
        />
        <Callout type="info" title="The id is the contract">
          Card identity comes from <InlineCode>item.id</InlineCode>. Keep ids
          stable and unique across all columns so the drag preview and drop
          callback can resolve the right item.
        </Callout>
      </DocSection>

      <DocSection
        id="basic-example"
        title="Basic example"
        description="A complete screen with headers, cards, and a drop handler."
      >
        <CodeBlock
          code={basicUsage}
          language="tsx"
          filename="BoardScreen.tsx"
        />
      </DocSection>

      <DocSection
        id="rendering-cards"
        title="Rendering cards"
        description="renderItem and renderHeader are called for every card and column."
      >
        <p>
          <InlineCode>renderItem</InlineCode> receives the item and an optional{" "}
          <InlineCode>isDragged</InlineCode> flag. The flag is true for the
          floating preview rendered while dragging, which lets you style the
          lifted card differently.
        </p>
        <CodeBlock
          code={renderSnippet}
          language="tsx"
          filename="renderers.tsx"
        />
        <p>
          The in-column card is wrapped in a <InlineCode>Pressable</InlineCode>{" "}
          with a 200ms long-press delay. The card itself fades out while its
          drag preview follows your finger.
        </p>
      </DocSection>

      <DocSection
        id="handling-drops"
        title="Handling drops"
        description="onDragEnd only fires when the item lands in a different column."
      >
        <CodeBlock
          code={dragEndSnippet}
          language="tsx"
          filename="onDragEnd.ts"
        />
        <p>
          Always return new arrays and objects so React can re-render the board.
          The snippet clones each column and its items array before splicing the
          moved item into the destination.
        </p>
        <Callout type="tip" title="Drops inside the same column are ignored">
          The component compares the source and destination column indices. If
          they match, <InlineCode>onDragEnd</InlineCode> is not called and the
          preview springs back into place.
        </Callout>
      </DocSection>

      <DocSection
        id="styling"
        title="Styling"
        description="Style columns, headers, and the drag-hover state independently."
      >
        <CodeBlock
          code={stylingSnippet}
          language="tsx"
          filename="StyledBoard.tsx"
        />
        <p>
          <InlineCode>columnContainerStyle</InlineCode> is applied to every
          column. <InlineCode>columnContainerStyleOnDrag</InlineCode> is merged
          on top when the column is the current drop target. Internal column
          padding comes from <InlineCode>gapBetweenColumns</InlineCode>.
        </p>
      </DocSection>

      <DocSection
        id="layout-sizing"
        title="Layout & sizing"
        description="How width, gap, and initial pagination behave."
      >
        <ul className="flex list-disc flex-col gap-2 pl-5">
          <li>
            <InlineCode>columnWidth</InlineCode> defaults to 80% of{" "}
            <InlineCode>Dimensions.get(&apos;screen&apos;).width</InlineCode>.
          </li>
          <li>
            <InlineCode>gapBetweenColumns</InlineCode> defaults to 12 and is
            also used as column padding.
          </li>
          <li>
            The board centers the initial column 200ms after mount by calling{" "}
            <InlineCode>paginate(&apos;center&apos;)</InlineCode>.
          </li>
          <li>
            The horizontal list snaps to <InlineCode>columnWidth</InlineCode>{" "}
            with paging enabled.
          </li>
        </ul>
        <Callout type="warning" title="Resizing columns">
          Changing <InlineCode>columnWidth</InlineCode> re-runs centering, but
          avoid changing it on every scroll frame. Derive it from{" "}
          <InlineCode>useWindowDimensions</InlineCode> once per render instead.
        </Callout>
      </DocSection>

      <DocSection
        id="performance"
        title="Performance notes"
        description="Where the component already optimizes, and where you can help."
      >
        <ul className="flex list-disc flex-col gap-2 pl-5">
          <li>
            <InlineCode>DataCard</InlineCode> is wrapped in{" "}
            <InlineCode>React.memo</InlineCode> to avoid re-rendering every
            card on drag state changes.
          </li>
          <li>
            The first column renders 8 items; other columns render 3 initially.
          </li>
          <li>
            Only the focused column is draggable, which also keeps gestures from
            fighting the horizontal pager.
          </li>
          <li>
            Keep <InlineCode>renderItem</InlineCode> and{" "}
            <InlineCode>renderHeader</InlineCode> stable with{" "}
            <InlineCode>useCallback</InlineCode> if they close over changing
            values.
          </li>
        </ul>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild size="sm">
            <Link href="/docs/props">
              Browse props
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/docs/examples">See examples</Link>
          </Button>
        </div>
      </DocSection>
    </article>
  );
}
