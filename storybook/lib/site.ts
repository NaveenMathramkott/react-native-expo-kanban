export const siteConfig = {
  name: "React Native Expo Kanban",
  shortName: "Kanban",
  version: "1.0.8",
  description:
    "A feature-rich, customizable Kanban board component for React Native applications built with Expo.",
  github: "https://github.com/NaveenMathramkott/react-native-expo-kanban",
  website: "https://naveenmathramkott.vercel.app",
  npm: "https://www.npmjs.com/package/react-native-expo-kanban",
  npmPackage: "react-native-expo-kanban",
  license: "MIT",
};

export type NavItem = {
  title: string;
  href: string;
  description?: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const docsNav: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
        description: "What the Kanban board does and how it is built.",
      },
      {
        title: "Installation",
        href: "/docs/installation",
        description: "Install the package and its peer dependencies.",
      },
      {
        title: "Usage",
        href: "/docs/usage",
        description: "Define columns, render cards, and handle drops.",
      },
      {
        title: "Examples",
        href: "/docs/examples",
        description: "Copy-paste recipes for common layouts.",
      },
    ],
  },
  {
    title: "API Reference",
    items: [
      {
        title: "Props",
        href: "/docs/props",
        description: "Every prop accepted by ReactNativeKanbanBoard.",
      },
      {
        title: "Types",
        href: "/docs/types",
        description: "Board, column, item, and drag types.",
      },
      {
        title: "Hooks",
        href: "/docs/hooks",
        description: "The hooks that power dragging and pagination.",
      },
      {
        title: "Architecture",
        href: "/docs/architecture",
        description: "A file-by-file index of the library.",
      },
    ],
  },
];

export const flatDocsNav = docsNav.flatMap((section) => section.items);

export const topNav: NavItem[] = [
  { title: "Docs", href: "/docs" },
  { title: "Examples", href: "/docs/examples" },
  { title: "Props", href: "/docs/props" },
];
