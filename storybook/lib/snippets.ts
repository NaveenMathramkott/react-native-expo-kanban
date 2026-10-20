export const installDependencies = `# Core component
npm install react-native-expo-kanban

# Required peer dependencies
npm install react-native-reanimated react-native-gesture-handler lodash`;

export const babelConfig = `// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};`;

export const basicTypes = `type Lead = {
  id: string;
  name: string;
  company: string;
  priority: 'low' | 'medium' | 'high';
};

type ColumnHeader = {
  title: string;
  subtitle?: string;
};

type Column = {
  header: ColumnHeader;
  items: Lead[];
};`;

export const basicData = `const initialColumns: Column[] = [
  {
    header: { title: 'Enquiry', subtitle: 'Target 20 leads' },
    items: [
      {
        id: '101',
        name: 'Bhageerathan Pillai',
        company: 'Muthalali Inc.',
        priority: 'high',
      },
      {
        id: '102',
        name: 'Kittunni',
        company: 'Army Inc.',
        priority: 'medium',
      },
    ],
  },
  {
    header: { title: 'Interested', subtitle: 'Make sure fixed' },
    items: [
      {
        id: '104',
        name: 'Shaji Pappan',
        company: 'Kalasamithi Inc.',
        priority: 'high',
      },
    ],
  },
  {
    header: { title: 'Sold', subtitle: 'Check on reports' },
    items: [
      {
        id: '106',
        name: 'Mahesh Bhavana',
        company: 'Bhavana Studio Inc.',
        priority: 'low',
      },
    ],
  },
];`;

export const basicUsage = `import React, { useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import ReactNativeKanbanBoard from 'react-native-expo-kanban';

export default function BoardScreen() {
  const { width } = useWindowDimensions();
  const [columns, setColumns] = useState(initialColumns);

  const renderHeader = (header: ColumnHeader) => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{header.title}</Text>
      {header.subtitle ? (
        <Text style={styles.headerSubtitle}>{header.subtitle}</Text>
      ) : null}
    </View>
  );

  const renderItem = (item: Lead, isDragged?: boolean) => (
    <View style={[styles.card, isDragged && styles.cardDragged]}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardMeta}>{item.company}</Text>
      <Text style={styles.cardMeta}>Priority: {item.priority}</Text>
    </View>
  );

  const onDragEnd = ({ fromColumnIndex, toColumnIndex, itemId }: {
    fromColumnIndex: number;
    toColumnIndex: number;
    itemId: string;
  }) => {
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
  };

  return (
    <ReactNativeKanbanBoard
      columnData={columns}
      renderHeader={renderHeader}
      renderItem={renderItem}
      onDragEnd={onDragEnd}
      columnWidth={width * 0.8}
      gapBetweenColumns={12}
      columnContainerStyle={styles.column}
      columnContainerStyleOnDrag={styles.columnHover}
      columnHeaderStyle={styles.columnHeader}
    />
  );
}

const styles = StyleSheet.create({
  column: {
    borderRadius: 16,
    backgroundColor: '#f4f4f5',
  },
  columnHover: {
    backgroundColor: '#e4e4e7',
    borderColor: '#a1a1aa',
    borderWidth: 1,
  },
  columnHeader: {
    paddingBottom: 8,
  },
  header: {
    gap: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#71717a',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    gap: 4,
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  cardDragged: {
    transform: [{ scale: 1.02 }],
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardMeta: {
    fontSize: 12,
    color: '#71717a',
  },
});`;

export const dragEndSnippet = `const onDragEnd = ({
  fromColumnIndex,
  toColumnIndex,
  itemId,
}: {
  fromColumnIndex: number;
  toColumnIndex: number;
  itemId: string;
}) => {
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
};`;

export const renderSnippet = `const renderItem = (item: Lead, isDragged?: boolean) => (
  <View style={[styles.card, isDragged && styles.cardDragged]}>
    <Text style={styles.cardTitle}>{item.name}</Text>
    <Text style={styles.cardMeta}>{item.company}</Text>
  </View>
);

const renderHeader = (header: ColumnHeader) => (
  <View>
    <Text style={styles.headerTitle}>{header.title}</Text>
    <Text style={styles.headerSubtitle}>{header.subtitle}</Text>
  </View>
);`;

export const stylingSnippet = `<ReactNativeKanbanBoard
  columnData={columns}
  renderItem={renderItem}
  renderHeader={renderHeader}
  onDragEnd={onDragEnd}
  // The board fills the screen; style the columns instead
  containerStyle={{ flex: 1 }}
  contentContainerStyle={{ paddingVertical: 12 }}
  columnContainerStyle={{
    backgroundColor: '#f4f4f5',
    borderRadius: 16,
  }}
  columnHeaderStyle={{ paddingBottom: 8 }}
  columnContainerStyleOnDrag={{
    backgroundColor: '#e4e4e7',
    borderColor: '#a1a1aa',
    borderWidth: 1,
  }}
  gapBetweenColumns={12}
  columnWidth={320}
/>`;

export const fullWidthSnippet = `import { useWindowDimensions } from 'react-native';

const { width } = useWindowDimensions();

<ReactNativeKanbanBoard
  columnData={columns}
  renderItem={renderItem}
  renderHeader={renderHeader}
  onDragEnd={onDragEnd}
  columnWidth={width}
  gapBetweenColumns={0}
/>;`;

export const typeDefinitions = `export type columnDataType<T, K> = {
  header: K;
  items: T[];
};

export type ItemType = { id: string };

export type HeaderParams = {
  title: string;
  subtitle?: string;
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
}`;

export const itemParamsType = `export type ItemParams = {
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
};`;

export const dragGestureSignature = `const { pan, dragItem, dragX, dragY, setDragCard } = useDragGesture({
  paginate,
  toColumnIndex,
  onDragEndSuccess: props.onDragEnd,
  onDrop: enableScrollers,
});`;

export const paginationSignature = `const { paginate, updateCurrentColumnIndex } = useColumnPagination({
  columnsHorizontalScrollRef,
  constants: {
    edgeColumnOff,
    columnContainerWidth,
  },
});

// Longitudinal pagination while dragging near the screen edges
paginate('left');
paginate('center');
paginate('right');`;

export const layoutAnimationSnippet = `import { useLayoutAnimation } from 'react-native-expo-kanban/dist/hooks/useLayoutAnimation';

function MyList({ items }) {
  useLayoutAnimation(items, { effectType: 'easeInEaseOut', duration: 200 });
  return <List data={items} />;
}`;

export const dragContextSnippet = `import { useDragContext } from 'react-native-expo-kanban/dist/utils/DraggedCardContext';

function CardOverlay() {
  const { dragCard, dragCardX, dragCardY } = useDragContext();

  if (!dragCard) return null;

  return <Text>Dragging {dragCard.id}</Text>;
}`;

export const minimalExample = `<ReactNativeKanbanBoard
  columnData={columns}
  renderItem={(item, isDragged) => <Card item={item} active={isDragged} />}
  renderHeader={(header) => <Text>{header.title}</Text>}
  onDragEnd={({ fromColumnIndex, toColumnIndex, itemId }) => {
    moveItem(fromColumnIndex, toColumnIndex, itemId);
  }}
/>;`;
