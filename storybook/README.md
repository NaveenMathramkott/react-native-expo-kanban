# react-native-expo-kanban documentation

The documentation site for [`react-native-expo-kanban`](https://github.com/NaveenMathramkott/react-native-expo-kanban).

Built with Next.js 16, Tailwind CSS v4, and shadcn-style primitives. The layout
follows the shadcn docs pattern: sticky header, left sidebar navigation, article
content, and an "On this page" table of contents.

## What is documented

- Introduction and project status
- Installation, peer dependencies, Reanimated and Expo setup
- Usage, controlled data model, and drop handling
- Examples and customization recipes
- Props and TypeScript type reference
- Internal hooks (`useDragGesture`, `useColumnPagination`, `useLayoutAnimation`, `useDragContext`)
- File-by-file architecture index

The header shows live GitHub stars/forks and monthly npm downloads, fetched
server-side from the GitHub and npm public APIs and revalidated hourly.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Demo assets

The animated demos are copied from the repository `demo/` folder:

- `/public/demo.gif` — hero demo
- `/public/demo2.gif` — full interaction demo
