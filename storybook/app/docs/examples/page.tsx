import type { Metadata } from "next";

import { CodeBlock } from "@/components/code-block";
import { Callout, DocSection, InlineCode, PageTitle } from "@/components/docs-components";
import {
  basicUsage,
  dragContextSnippet,
  fullWidthSnippet,
  layoutAnimationSnippet,
  minimalExample,
} from "@/lib/snippets";

export const metadata: Metadata = {
  title: "Examples",
  description:
    "Copy-paste kanban board examples: minimal board, custom cards, controlled columns, and full-width columns.",
};

const customCard = `const renderItem = (item: Lead, isDragged?: boolean) => (
  <View style={[styles.card, isDragged && styles.lifted]}>
    <View style={styles.row}>
      <Text style={styles.name}>{item.name}</Text>
      <View
        style={[
          styles.priority,
          item.priority === 'high' && styles.priorityHigh,
          item.priority === 'medium' && styles.priorityMedium,
        ]}
      >
        <Text style={styles.priorityLabel}>{item.priority}</Text>
      </View>
    </View>

    <Text style={styles.company}>{item.company}</Text>

    <View style={styles.footer}>
      <Text style={styles.owner}>{item.owner}</Text>
      <Text style={styles.date}>{item.createdOn}</Text>
    </View>
  </View>
);`;

const useKanban = `import { useCallback, useState } from 'react';

export function useKanban(initialColumns: Column[]) {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = useCallback(
    ({ fromColumnIndex, toColumnIndex, itemId }: DragEnd) => {
      if (fromColumnIndex === toColumnIndex) return;

      setColumns((current) => {
        const next = current.map((column) => ({
          ...column,
          items: [...column.items],
        }));

        const source = next[fromColumnIndex].items;
        const index = source.findIndex((item) => item.id === itemId);
        if (index === -1) return current;

        const [moved] = source.splice(index, 1);
        next[toColumnIndex].items.push(moved);
        return next;
      });
    },
    []
  );

  return { columns, setColumns, onDragEnd };
}`;

export default function ExamplesPage() {
  return (
    <article className="flex flex-col gap-10">
      <PageTitle
        eyebrow="Getting started"
        title="Examples"
        description="Recipes that mirror real screens. Each example is intentionally small enough to copy into your app."
      />

      <DocSection
        id="basic-board"
        title="Basic board"
        description="The smallest useful board: three columns, custom cards, and local state."
      >
        <CodeBlock
          code={minimalExample}
          language="tsx"
          filename="MinimalBoard.tsx"
        />
        <p>
          For the complete screen including types, data, and styles, see the{" "}
          <InlineCode>Usage</InlineCode> page.
        </p>
      </DocSection>

      <DocSection
        id="custom-cards"
        title="Custom cards"
        description="Render priority, owner, and dates without the component knowing about them."
      >
        <CodeBlock
          code={customCard}
          language="tsx"
          filename="LeadCard.tsx"
        />
        <Callout type="tip" title="Style the lifted state">
          The second argument is only true for the floating preview. Use it to
          add elevation, scale, or a rotation-free shadow.
        </Callout>
      </DocSection>

      <DocSection
        id="controlled-columns"
        title="Controlled columns"
        description="Extract the move logic into a hook and reuse it across screens."
      >
        <CodeBlock
          code={useKanban}
          language="tsx"
          filename="useKanban.ts"
        />
        <p>
          Keeping <InlineCode>onDragEnd</InlineCode> stable with{" "}
          <InlineCode>useCallback</InlineCode> prevents unnecessary card
          re-renders while dragging.
        </p>
        <CodeBlock
          code={basicUsage}
          language="tsx"
          filename="BoardScreen.tsx"
        />
      </DocSection>

      <DocSection
        id="full-width"
        title="Full-width columns"
        description="One column per screen with zero gap."
      >
        <CodeBlock
          code={fullWidthSnippet}
          language="tsx"
          filename="FullWidthBoard.tsx"
        />
        <p>
          Use <InlineCode>gapBetweenColumns={0}</InlineCode> when columns should
          meet edge to edge. The board still snaps one full screen at a time.
        </p>
      </DocSection>

      <DocSection
        id="using-hooks"
        title="Using the hooks"
        description="The internals are importable if you need to build a custom board."
      >
        <CodeBlock
          code={layoutAnimationSnippet}
          language="tsx"
          filename="MyList.tsx"
        />
        <p>
          The hooks are compiled into the package at{" "}
          <InlineCode>react-native-expo-kanban/dist/hooks</InlineCode> and{" "}
          <InlineCode>dist/utils</InlineCode>. They are useful references, but
          deep imports are not covered by semver and may change between minor
          releases.
        </p>
        <CodeBlock
          code={dragContextSnippet}
          language="tsx"
          filename="CardOverlay.tsx"
        />
      </DocSection>
    </article>
  );
}
