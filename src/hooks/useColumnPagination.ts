import { throttle } from "lodash";
import type Animated from "react-native-reanimated";
import { useSharedValue, type AnimatedRef } from "react-native-reanimated";

interface UseColumnPaginationProps {
  columnsHorizontalScrollRef: AnimatedRef<Animated.FlatList<any>>;
  constants: {
    edgeColumnOff: number;
    columnContainerWidth: number;
  };
}

export const useColumnPagination = ({
  columnsHorizontalScrollRef,
  constants,
}: UseColumnPaginationProps) => {
  const { edgeColumnOff, columnContainerWidth } = constants;

  const currentVisibleColumnIndex = useSharedValue(0);

  const updateCurrentColumnIndex = (columnIndex: number) => {
    currentVisibleColumnIndex.value = columnIndex;
  };

  const paginate = throttle(
    (to: "left" | "right" | "center") => {
      switch (to) {
        case "right":
          columnsHorizontalScrollRef.current?.scrollToOffset({
            offset:
              edgeColumnOff +
              currentVisibleColumnIndex.value * columnContainerWidth,
            animated: true,
          });
          break;
        case "center":
          columnsHorizontalScrollRef.current?.scrollToOffset({
            offset:
              edgeColumnOff +
              (currentVisibleColumnIndex.value - 1) * columnContainerWidth,
            animated: true,
          });
          break;
        case "left":
          columnsHorizontalScrollRef.current?.scrollToOffset({
            offset:
              edgeColumnOff +
              (currentVisibleColumnIndex.value - 2) * columnContainerWidth,
            animated: true,
          });
          break;
      }
    },
    1000,
    { leading: true, trailing: false }
  );

  return { paginate, updateCurrentColumnIndex };
};
