# React Native Expo Kanban Board

<div align="center">
  <br />
  <a href="https://github.com/NaveenMathramkott/react-native-expo-kanban" target="_blank">
    <img src="./demo/demo2.gif" height="500" alt="hero demo" style="border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.18); margin: 8px; width:48%" />
    <img src="./demo/demo.gif" height="500" alt="interaction demo" style="border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.18); margin: 8px; width:48%" />
  </a>
  <br /><br />

  <a href="https://www.npmjs.com/package/react-native-expo-kanban">
    <img src="https://img.shields.io/npm/v/react-native-expo-kanban?style=for-the-badge" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/react-native-expo-kanban">
    <img src="https://img.shields.io/npm/dt/react-native-expo-kanban?style=for-the-badge" alt="npm downloads" />
  </a>
  <a href="https://github.com/NaveenMathramkott/react-native-expo-kanban/issues">
    <img src="https://img.shields.io/github/issues/NaveenMathramkott/react-native-expo-kanban?style=for-the-badge" alt="issues" />
  </a>
  <a href="https://github.com/NaveenMathramkott/react-native-expo-kanban/stargazers">
    <img src="https://img.shields.io/github/stars/NaveenMathramkott/react-native-expo-kanban?style=for-the-badge" alt="stars" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT license" />
  </a>
</div>

<h1 align="center">📋 Interactive Kanban Board for React Native</h1>

<p align="center">
  A feature-rich, customizable Kanban board component built for Expo and React Native. Perfect for task management, sales pipelines, project tracking, and any workflow that benefits from visual organization.
</p>

---

## ✨ Features

<table>
  <tr>
    <td><b>👆 Drag-and-Drop</b></td>
    <td>Smooth card movement between columns powered by Reanimated + Gesture Handler.</td>
  </tr>
  <tr>
    <td><b>🎨 Fully Customizable</b></td>
    <td>Colors, styles, and behavior tailored to your app via style props and render functions.</td>
  </tr>
  <tr>
    <td><b>📱 Responsive</b></td>
    <td>Works flawlessly across iOS and Android mobile devices.</td>
  </tr>
  <tr>
    <td><b>🔢 Real-time Counts</b></td>
    <td>Automatic tracking of items per column.</td>
  </tr>
  <tr>
    <td><b>♻️ CRUD</b></td>
    <td>Built-in support for moving items across columns via <code>onDragEnd</code>.</td>
  </tr>
  <tr>
    <td><b>🟦 TypeScript</b></td>
    <td>Fully typed components and props.</td>
  </tr>
  <tr>
    <td><b>⚡ Performance</b></td>
    <td>Built with Reanimated for buttery-smooth 60fps interactions.</td>
  </tr>
</table>

---

## 🚀 Installation

```bash
npm install react-native-expo-kanban react-native-reanimated
```

`react-native-reanimated` is required for drag animations:  
https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started

---

## 🛠 Usage

### 1. Define your columns and cards

```tsx
import ReactNativeKanbanBoard from "react-native-expo-kanban";
import {
  KanbanBoardProps,
  ItemParams,
  HeaderParams,
} from "react-native-expo-kanban";

const columnData: KanbanBoardProps<ItemParams, HeaderParams>["columnData"] = [
  {
    header: { title: "Enquiry", subtitle: "Target 20 leads" },
    items: [
      {
        id: "101",
        first_name: "Bhageerathan",
        last_name: "Pillai",
        email: "Bhageerathan@Pillai.com",
        phone: "+1 555-123-4567",
        company: "Muthalali Inc.",
        created_on: new Date().toISOString(),
        priority: "high",
        status: "New",
        notes: "Interested in premium package",
        assigned_to: {
          first_name: "Ramanan",
          last_name: "",
          profile_pic: null,
        },
      },
      {
        id: "102",
        first_name: "Kittunni",
        last_name: "",
        email: "kittunni@kilukkam.com",
        phone: "+1 555-123-4567",
        company: "Army Inc.",
        created_on: new Date().toISOString(),
        priority: "high",
        status: "New",
        notes: "Interested in premium package",
        assigned_to: {
          first_name: "Pankajakshan",
          last_name: "Pillai",
          profile_pic: null,
        },
      },
    ],
  },
  {
    header: { title: "Interested", subtitle: "Make sure fixed" },
    items: [
      {
        id: "104",
        first_name: "Shaji",
        last_name: "Pappan",
        email: "ShajiPappan@Aadu.com",
        phone: "+1 555-123-4567",
        company: "Kalasamithi Inc.",
        created_on: new Date().toISOString(),
        priority: "high",
        status: "New",
        notes: "Interested in premium package",
        assigned_to: {
          first_name: "Eppan",
          last_name: "Pappachi",
          profile_pic: null,
        },
      },
    ],
  },
];
```

### 2. Render item and header

```tsx
const renderItem = (item: any) => (
  <View style={styles.card}>
    <Text>{item.first_name}</Text>
    <Text>{item.email}</Text>
  </View>
);

const renderHeader = (header: any) => (
  <View style={styles.header}>
    <Text>{header.title}</Text>
    <Text>{header.subtitle}</Text>
  </View>
);
```

### 3. Render the board

```tsx
<ReactNativeKanbanBoard
  columnData={columnData}
  renderItem={renderItem}
  renderHeader={renderHeader}
  columnHeaderStyle={styles.columnHeader}
  columnContainerStyle={styles.columnContainer}
  gapBetweenColumns={12}
  columnWidth={SCREEN_WIDTH * 0.85}
  columnContainerStyleOnDrag={styles.columnActive}
  onDragEnd={({ fromColumnIndex, toColumnIndex, itemId }) => {
    // update your state here and pass new columnData back
  }}
/>
```

---

## 📋 Props

| Prop                         | Type                                                           | Default            | Required | Description                                                   |
| ---------------------------- | -------------------------------------------------------------- | ------------------ | :------: | ------------------------------------------------------------- |
| `columnData`                 | `columnData<T, K>[]`                                           | `[]`               |    ✅    | Array of columns, each with `header` and `items`.             |
| `renderItem`                 | `(props: T, isDragged?: boolean) => JSX.Element`               | —                  |    ✅    | Renders each card inside a column.                            |
| `renderHeader`               | `(props: K) => JSX.Element`                                    | —                  |    ✅    | Renders the header for each column.                           |
| `onDragEnd`                  | `(params: { fromColumnIndex, toColumnIndex, itemId }) => void` | `undefined`        |    ❌    | Fired when an item is dropped into a new column.              |
| `columnHeaderStyle`          | `ViewStyle`                                                    | `{}`               |    ❌    | Style for the column header.                                  |
| `columnContainerStyle`       | `ViewStyle`                                                    | `{}`               |    ❌    | Style for the column container.                               |
| `columnContainerStyleOnDrag` | `ViewStyle`                                                    | `0.7`              |    ❌    | Style applied while an item is being dragged into the column. |
| `gapBetweenColumns`          | `number`                                                       | `8`                |    ❌    | Horizontal gap between columns.                               |
| `columnWidth`                | `number`                                                       | screen width × 0.8 |    ❌    | Width of each column.                                         |

---

## 🏗 Architecture

> The package is **nine source files** under `src/`. Data flows one way: the board reports indices/ids on drop, and the **parent produces the new columns**.

### Entry point — `src/index.tsx`

Board container generic over `T extends ItemType` and `K`. Computes screen constants, renders one horizontal `FlatList` per column, wires the drag gesture, and draws the floating preview.

### Components

| File                          | Role                                                             |
| ----------------------------- | ---------------------------------------------------------------- |
| `src/index.tsx`               | Board container — column FlatList, drag wiring, floating preview |
| `src/components/DataCard.tsx` | Memoized `Pressable` card wrapper; measures itself on layout     |

### Hooks

| Hook                  | Role                                                               |
| --------------------- | ------------------------------------------------------------------ |
| `useDragGesture`      | Gesture lifecycle and drop decisions; calls `onDragEnd` on release |
| `useColumnPagination` | Throttled horizontal paging (left / right / re-center)             |
| `useLayoutAnimation`  | `LayoutAnimation` presets with Android workaround                  |

### Utilities — `src/utils/DraggedCardContext.tsx`

React context exposing the dragged card and shared drag coordinates (`dragX`, `dragY`). Provided by the board, consumed by cards/overlays via `useDragContext`.

### Data flow

```
long press
  → DataCard.onLongPress
  → measureInWindow()
  → setDragCard({ props, x, y, width, columnIndex, id })
  → gesture activates on touch move
  → dragX / dragY shared values update
  → near edge? paginate('left' | 'right')
  → release
  → drop()
  → onDragEnd({ fromColumnIndex, toColumnIndex, itemId })
```

The board never mutates `columnData`. It reports the indices and item id, then waits for the parent to produce new columns — keeping the component predictable and compatible with any state library.

### Types — `src/types.ts`

`KanbanBoardProps`, `columnDataType`, `ItemType`, `DraggedCardProps`, and example `HeaderParams`/`ItemParams` shapes.

---

## 📖 Documentation

Full architecture, props, types, hooks, and examples are hosted at:  
👉 https://rnkanban.vercel.app

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open a PR or file an issue on GitHub.

---

## 📄 License

MIT © [Naveen Mathramkott](https://github.com/NaveenMathramkott)

---

<div align="center">
  <sub>Built with ❤️ for the React Native community</sub>
</div>
