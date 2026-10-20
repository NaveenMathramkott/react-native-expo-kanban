import ReactNativeKanbanBoard from "react-native-expo-kanban";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useState } from "react";
import { columnData as initialColumnData } from "../../dummyData";

const SCREEN_WIDTH = Dimensions.get("window").width;

const renderItem = (item: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardName}>{item.first_name}</Text>
      <Text style={styles.cardEmail}>{item.email}</Text>
    </View>
  );
};

const renderHeader = (header: any) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{header?.title}</Text>
      <Text style={styles.headerSubtitle}>{header?.subtitle}</Text>
    </View>
  );
};

const columnContainerStyle = {
  backgroundColor: "#f2f4f8",
  borderRadius: 16,
  padding: 12,
  gap: 10,
  width: SCREEN_WIDTH * 0.82,
};

export default function Index() {
  const [columns, setColumns] = useState(initialColumnData);
  const onDragEnd = (data: any) => {
    setColumns((prev) => {
      const next = prev.map((c: any) => ({ ...c, items: [...c.items] }));
      const from = next[data.fromColumnIndex];
      const to = next[data.toColumnIndex];
      const idx = from.items.findIndex((i: any) => i.id === data.itemId);
      if (idx !== -1) {
        const [moved] = from.items.splice(idx, 1);
        to.items.push(moved);
      }
      return next;
    });
  };
  return (
    <View style={styles.container}>
      <ReactNativeKanbanBoard
        columnData={columns}
        renderItem={renderItem}
        renderHeader={renderHeader}
        columnHeaderStyle={styles.header}
        columnContainerStyle={columnContainerStyle}
        gapBetweenColumns={12}
        columnWidth={SCREEN_WIDTH * 0.85}
        columnContainerStyleOnDrag={styles.columnActive}
        onDragEnd={onDragEnd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f8",
    marginTop: 150,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 8,
    minHeight: 64,
    width: "100%",
  },
  cardName: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111827",
    marginBottom: 2,
  },
  cardEmail: {
    fontSize: 12,
    color: "#6b7280",
  },
  header: {
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 8,
    minHeight: 56,
    width: "100%",
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: "#111827",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  columnActive: {
    backgroundColor: "#dbeafe",
    borderRadius: 16,
    padding: 12,
    gap: 10,
    width: SCREEN_WIDTH * 0.82,
  },
});
