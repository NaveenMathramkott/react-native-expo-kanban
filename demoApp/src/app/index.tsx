import ReactNativeKanbanBoard from "react-native-expo-kanban";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { columnData } from "../../dummyData";

const SCREEN_WIDTH = Dimensions.get("window").width;

const renderItem = (item: any) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 4,
      }}
    >
      <Text>{item.first_name}</Text>
      <Text>{item.email}</Text>
    </View>
  );
};

const renderHeader = (header: any) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 4,
      }}
    >
      <Text>{header?.title}</Text>
      <Text>{header?.subtitle}</Text>
    </View>
  );
};

const columnHeaderStyle = {
  backgroundColor: "#fff",
  borderRadius: 10,
  padding: 8,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
  marginBottom: 4,
};

const columnContainerStyle = {
  flex: 1,
  backgroundColor: "#e9ecef",
  borderRadius: 10,
  padding: 8,
  gap: 8,
};

const onDragEnd = (data: any) => {
  console.log("data", data);
};

export default function Index() {
  return (
    <View style={styles.container}>
      <ReactNativeKanbanBoard
        columnData={columnData}
        renderItem={renderItem}
        renderHeader={renderHeader}
        columnHeaderStyle={columnHeaderStyle}
        columnContainerStyle={columnContainerStyle}
        gapBetweenColumns={8}
        columnWidth={SCREEN_WIDTH}
        //         columnContainerStyleOnDragHover={
        //           styles.columnContainerWhenPotenialDragTo
        //         }
        onDragEnd={onDragEnd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
