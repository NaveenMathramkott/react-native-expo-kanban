import { useState } from "react";
import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { runOnJS, useSharedValue, withSpring } from "react-native-reanimated";
import {
  type DraggedCardProps,
  type ItemType,
  type KanbanBoardProps,
} from "../types";
import { type useColumnPagination } from "./useColumnPagination";

interface UseDragGestureProps<T extends ItemType, K> {
  toColumnIndex: number;
  paginate: ReturnType<typeof useColumnPagination>["paginate"];
  onDragEndSuccess: KanbanBoardProps<T, K>["onDragEnd"];
  onDrop: () => void;
}

export const useDragGesture = <T extends ItemType, K>({
  paginate,
  toColumnIndex,
  onDragEndSuccess,
  onDrop,
}: UseDragGestureProps<T, K>) => {
  const SCREEN_WIDTH = Dimensions.get("screen").width;
  const [dragItem, setDragCard] = useState<DraggedCardProps<T>>();

  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);

  const drop = () => {
    onDrop();

    const isBeingDragged = dragItem !== undefined;

    if (isBeingDragged) {
      if (dragItem.columnIndex !== toColumnIndex) {
        onDragEndSuccess({
          fromColumnIndex: dragItem.columnIndex,
          toColumnIndex,
          itemId: dragItem.id,
        });
      }

      setDragCard(undefined);
    }
  };

  const pan = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((_: any, stateManager: any) => {
      if (dragItem?.id) {
        stateManager.activate();
      }
    })
    .onChange((event: any) => {
      dragX.value = event.translationX;
      dragY.value = event.translationY;

      if (event.absoluteX > SCREEN_WIDTH - 50) {
        runOnJS(paginate)("right");
      }

      if (event.absoluteX < 50) {
        runOnJS(paginate)("left");
      }
    })
    .onEnd(() => {
      dragX.value = withSpring(0, { duration: 1000 });
      dragY.value = withSpring(0, { duration: 1000 });
    })
    .onFinalize(() => {
      runOnJS(drop)();
    });

  return { pan, dragItem, setDragCard, dragX, dragY };
};
