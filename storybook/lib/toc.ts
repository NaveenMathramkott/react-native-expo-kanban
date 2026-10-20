import type { TocItem } from "@/components/on-this-page";

export const docsToc: Record<string, TocItem[]> = {
  "/docs": [
    { title: "Overview", id: "overview" },
    { title: "Features", id: "features" },
    { title: "How it works", id: "how-it-works" },
    { title: "Quick start", id: "quick-start" },
    { title: "Project status", id: "project-status" },
  ],
  "/docs/installation": [
    { title: "Requirements", id: "requirements" },
    { title: "Install the package", id: "install-package" },
    { title: "Peer dependencies", id: "peer-dependencies" },
    { title: "Reanimated setup", id: "reanimated-setup" },
    { title: "Expo setup", id: "expo-setup" },
    { title: "Verify", id: "verify" },
  ],
  "/docs/usage": [
    { title: "Data model", id: "data-model" },
    { title: "Basic example", id: "basic-example" },
    { title: "Rendering cards", id: "rendering-cards" },
    { title: "Handling drops", id: "handling-drops" },
    { title: "Styling", id: "styling" },
    { title: "Layout & sizing", id: "layout-sizing" },
    { title: "Performance notes", id: "performance" },
  ],
  "/docs/examples": [
    { title: "Basic board", id: "basic-board" },
    { title: "Custom cards", id: "custom-cards" },
    { title: "Controlled columns", id: "controlled-columns" },
    { title: "Full-width columns", id: "full-width" },
    { title: "Using the hooks", id: "using-hooks" },
  ],
  "/docs/props": [
    { title: "Required props", id: "required-props" },
    { title: "Layout props", id: "layout-props" },
    { title: "Style props", id: "style-props" },
    { title: "Full reference", id: "full-reference" },
  ],
  "/docs/types": [
    { title: "Board props", id: "board-props" },
    { title: "Column data", id: "column-data" },
    { title: "Item types", id: "item-types" },
    { title: "Drag types", id: "drag-types" },
    { title: "Generics", id: "generics" },
  ],
  "/docs/hooks": [
    { title: "useDragGesture", id: "use-drag-gesture" },
    { title: "useColumnPagination", id: "use-column-pagination" },
    { title: "useLayoutAnimation", id: "use-layout-animation" },
    { title: "useDragContext", id: "use-drag-context" },
    { title: "Composing hooks", id: "composing-hooks" },
  ],
  "/docs/architecture": [
    { title: "Entry point", id: "entry-point" },
    { title: "Components", id: "components" },
    { title: "Hooks", id: "hooks" },
    { title: "Utilities", id: "utilities" },
    { title: "Data flow", id: "data-flow" },
    { title: "File index", id: "file-index" },
  ],
};
