# React Native Expo Kanban Board

<div align="center">
  <br />
  <a href="https://github.com/NaveenMathramkott/react-native-expo-kanban" target="_blank" style="display:flex; width:90vw">
    <img src="./demo/demo2.gif" height="500" style="border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin: 8px; width:50%" >
    <img src="./demo/demo.gif" height="500" style="border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); margin: 8px;width:50%" >
  </a>
  <br /><br />
  
  <div>
    <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
    <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
    <img src="https://img.shields.io/npm/v/react-native-expo-kanban?style=for-the-badge" alt="npm version" />
    <img src="https://img.shields.io/npm/dt/react-native-expo-kanban?style=for-the-badge" alt="npm downloads" />
  </div>
</div>

<h1 align="center">Interactive Kanban Board for React Native</h1>

<p align="center">
  A feature-rich, customizable Kanban board component designed specifically for React Native applications with Expo. Perfect for task management, sales pipelines, project tracking, and any workflow that benefits from visual organization.
</p>

## Features

- **Drag-and-Drop Interface** - Smooth card movement between columns
- **Fully Customizable** - Colors, styles, and behavior tailored to your app
- **Responsive Design** - Works flawlessly across mobile devices
- **Priority Indicators** - Visual cues for task importance
- **Real-time Counts** - Automatic tracking of items per column
- **CRUD Operations** - Built-in support for adding, moving, and deleting items
- **TypeScript Support** - Fully typed components and props
- **Performance Optimized** - Built with Reanimated for buttery-smooth interactions

## Installation

```bash
npm install react-native-expo-kanban react-native-reanimated
```

react-native-reanimated must be also installed: https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/

## Usage

##### Refer the Demo page inside src to Use the ReactNativeKanbanBoard

Import the necessary components and types:

```bash
import ReactNativeKanbanBoard from "react-native-expo-kanban";
```

Define the columns and cards:

```tsx
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
      {
        id: "103",
        first_name: "Mamachan",
        last_name: "",
        email: "Mamachan@vellimoonga.com",
        phone: "+1 555-123-4567",
        company: "Panchayath Inc.",
        created_on: new Date().toISOString(),
        priority: "high",
        status: "New",
        notes: "Interested in premium package",
        assigned_to: {
          first_name: "Kuttan",
          last_name: "Thampuran",
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
      {
        id: "105",
        first_name: "Pachalam",
        last_name: "Bhasi",
        email: "Pachalam@bhasi.com",
        phone: "+1 555-123-4567",
        company: "Acme Inc.",
        created_on: new Date().toISOString(),
        priority: "high",
        status: "New",
        notes: "Interested in premium package",
        assigned_to: {
          first_name: "Goerge",
          last_name: "Kutty",
          profile_pic: null,
        },
      },
    ],
  },
  {
    header: { title: "Sold", subtitle: "Check on Reports" },
    items: [
      {
        id: "106",
        first_name: "Mahesh",
        last_name: "Bhavana",
        email: "mahesh@bhavana.com",
        phone: "+1 555-123-4567",
        company: "Bhavana Studio Inc.",
        created_on: new Date().toISOString(),
        priority: "high",
        status: "New",
        notes: "Interested in premium package",
        assigned_to: {
          first_name: "Chakkochi",
          last_name: "Anakattill",
          profile_pic: null,
        },
      },
      {
        id: "107",
        first_name: "Bonny",
        last_name: "",
        email: "bonny@kumbalangi.com",
        phone: "+1 555-123-4567",
        company: "Brothers Inc.",
        created_on: new Date().toISOString(),
        priority: "high",
        status: "New",
        notes: "Interested in premium package",
        assigned_to: {
          first_name: "Dasan",
          last_name: "",
          profile_pic: null,
        },
      },
      {
        id: "108",
        first_name: "Biju",
        last_name: "Paulose",
        email: "biju@paulose.com",
        phone: "+1 555-123-4567",
        company: "Ernakuam Station Inc.",
        created_on: new Date().toISOString(),
        priority: "high",
        status: "New",
        notes: "Interested in premium package",
        assigned_to: {
          first_name: "Ajooran",
          last_name: "",
          profile_pic: null,
        },
      },
    ],
  },
];
```

Render the Kanban Board component:

```tsx
<ReactNativeKanbanBoard
  columnData={columnDataStages}
  renderItem={renderItem}
  renderHeader={renderHeader}
  columnHeaderStyle={styles.columnHeader}
  columnContainerStyle={styles.columnContainer}
  gapBetweenColumns={8}
  columnWidth={SCREEN_WIDTH}
  columnContainerStyleOnDragHover={styles.columnContainerWhenPotenialDragTo}
  onDragEnd={onDragEnd}
/>
```

### Props

| Prop                          | Type                                                                                   | Default Value | Description                                                             | Required |
| :---------------------------- | :------------------------------------------------------------------------------------- | :------------ | :---------------------------------------------------------------------- | :------- |
| `columnData`                  | `columnData<T extends ItemType, K>[]`                                                  | []            | An array of columnData objects.                                         | Yes      |
| `renderItem`                  | `(props: T, isDragged?: boolean) => JSX.Element`                                       |               | Function component item within a columnData.                            | Yes      |
| `renderHeader`                | `(props: K) => JSX.Element`                                                            |               | Function component header for each columnData.                          | Yes      |
| `columnHeaderStyle`           | `ViewStyle`                                                                            | {}            | Style for the Header of the each Kanban boards.                         | No       |
| `columnContainerStyle`        | `ViewStyle`                                                                            | {}            | Style for the container of the Kanban Card.                             | No       |
| `columnContentContainerStyle` | `ViewStyle`                                                                            | {}            | Style for the content container.                                        | No       |
| `gapBetweenColumns`           | `number`                                                                               | 8             | The horizontal gap between the ColumnData Cards.                        | No       |
| `columnContainerStyleOnDrag`  | `ViewStyle`                                                                            | 0.7           | Style applied to a columnData container when an item is being dragged.  | No       |
| `onDragEnd`                   | `(params: { fromColumnIndex: number; toColumnIndex: number; itemId: string }) => void` | undefined     | Callback function called when an item is dropped into a new columnData. | Yes      |

### Types

```tsx
export type columnDataType<T, K> = {
  header: K;
  items: T[];
};

export type ItemType = { id: string };

export type State = {
  wixImage: boolean;
};

export type HeaderParams = {
  title: string;
  subtitle?: string;
};

export type ItemParams = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  created_on: string;
  priority: string;
  status: string;
  notes: string;
  assigned_to: {
    first_name: string;
    last_name: string;
    profile_pic: null;
  };
};

export interface DraggedCardProps<T> {
  id: string;
  y: number;
  x: number;
  width: number;
  props: T;
  columnIndex: number;
}

export interface KanbanBoardProps<T extends ItemType, K> {
  columnData: columnDataType<T, K>[];
  renderItem: (props: T, isDragged?: boolean) => JSX.Element;
  renderHeader: (props: K) => JSX.Element;
  onDragEnd: (params: {
    fromColumnIndex: number;
    toColumnIndex: number;
    itemId: string;
  }) => void;
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  columnHeaderStyle?: ViewStyle;
  columnContainerStyle?: ViewStyle;
  columnContainerStyleOnDrag?: ViewStyle;
  columnWidth?: number;
  gapBetweenColumns?: number;
}
```

#### Sharing is caring... until someone finds out❤️.

### Happy Coding

---
