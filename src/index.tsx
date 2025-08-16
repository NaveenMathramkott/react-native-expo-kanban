import React, { useCallback, useEffect, useRef, useState } from "react"
import {
 type NativeScrollEvent,
 type NativeSyntheticEvent,
 Dimensions,
 FlatList,
 Text,
 View,
} from "react-native"
import { GestureDetector } from "react-native-gesture-handler"
import Animated, {
 interpolate,
 useAnimatedRef,
 useAnimatedStyle,
} from "react-native-reanimated"
import { DataCard } from "./components/DataCard"
import { useColumnPagination } from "./hooks/useColumnPagination"
import { useDragGesture } from "./hooks/useDragGesture"
import { DragContextValue } from "./utils/DraggedCardContext"
import {
 type columnDataType,
 type ItemType,
 type KanbanBoardProps,
} from "./types"

const ReactNativeKanbanBoard = <T extends ItemType, K>(props: KanbanBoardProps<T, K>) => {
 const [toColumnIndex, setToColumnIndex] = useState(0)
 const SCREEN_WIDTH = Dimensions.get("screen").width;
 const columnContainerWidth = props.columnWidth ?? SCREEN_WIDTH * 0.8
 const scrollTriggerWidth = SCREEN_WIDTH * 0.3
 const edgeColumnOff = columnContainerWidth * 1.5 - SCREEN_WIDTH * 0.5
 const marginAlign = (SCREEN_WIDTH - columnContainerWidth) / 2

 const constants = {
  columnContainerWidth,
  scrollTriggerWidth,
  edgeColumnOff,
  marginAlign,
 }
 const columnPadding = props.gapBetweenColumns ?? 12

 const columnsHorizontalScrollRef = useAnimatedRef<Animated.FlatList<K>>()
 const itemsVerticalScrollEnabledRef = useRef(false)

 const disableScroll = useCallback(() => {
  itemsVerticalScrollEnabledRef.current = false
  columnsHorizontalScrollRef.current?.setNativeProps({
   scrollEnabled: false,
  })
 }, [columnsHorizontalScrollRef, itemsVerticalScrollEnabledRef])

 function enableScrollers() {
  columnsHorizontalScrollRef.current?.setNativeProps({ scrollEnabled: true })
  itemsVerticalScrollEnabledRef.current = true
 }

 const { paginate, updateCurrentColumnIndex } = useColumnPagination({
  columnsHorizontalScrollRef,
  constants,
 })
 const { pan, dragItem, dragX, dragY, setDragCard } = useDragGesture({
  paginate,
  toColumnIndex,
  onDrop: enableScrollers,
  onDragEndSuccess: props.onDragEnd,
 })

 useEffect(() => {
  setTimeout(() => {
   paginate("center")
  }, 200)
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [props.columnWidth])

 const animatedStyle = useAnimatedStyle(() => {
  return {
   position: "absolute",
   top: dragItem?.y,
   left: dragItem?.x,
   width: dragItem?.width,
   transform: [
    { translateY: dragY.value },
    { translateX: dragX.value },
    {
     rotate:
      interpolate(
       dragX.value,
       [-scrollTriggerWidth, 0, scrollTriggerWidth],
       [12, 0, 12],
       "extend"
      ) + "deg",
    },
    {
     scale: interpolate(
      dragX.value,
      [-scrollTriggerWidth, 0, scrollTriggerWidth],
      [1.12, 1, 1.12],
      "extend"
     ),
    },
   ],
  }
 }, [dragItem])

 const renderColumn = ({
  item: columnData,
  index: i,
 }: {
  item: columnDataType<T, K>
  index: number
 }) => {
  const isPotentiallyBeingMoveTo =
   dragItem?.columnIndex !== undefined &&
   i !== dragItem.columnIndex &&
   toColumnIndex === i
  const isItemInFocusedColumn = i === toColumnIndex

  const renderCard = ({ item }: { item: T }) => {
   const isBeingDragged = dragItem?.id === item.id

   return (
    <DataCard
     disableScroll={disableScroll}
     setDragCard={setDragCard}
     renderItem={props.renderItem}
     isDraggable={!dragItem && isItemInFocusedColumn}
     itemColumnIndex={i}
     item={item}
     isBeingDragged={isBeingDragged}
    />
   )
  }

  return (
   <View
    key={i}
    style={[
     props.columnContainerStyle,
     {
      margin: columnPadding,
      padding: columnPadding,
      width: columnContainerWidth - columnPadding * 2,
     },
     isPotentiallyBeingMoveTo ? props.columnContainerStyleOnDrag : {},
    ]}
   >
    <View style={props.columnHeaderStyle}>
     {props.renderHeader(columnData.header)}
     <Text>{columnData.items.length}</Text>
    </View>
    <FlatList
     scrollEnabled={itemsVerticalScrollEnabledRef.current}
     data={columnData.items}
     renderItem={renderCard}
     keyExtractor={(_, index) => `${i}-${index}`}
     extraData={isItemInFocusedColumn}
     initialNumToRender={i === 0 ? 8 : 3}
     showsVerticalScrollIndicator={false}
    />
   </View>
  )
 }

 const onMomentumScrollEnd = (
  event: NativeSyntheticEvent<NativeScrollEvent>
 ) => {
  const columnIndex =
   event.nativeEvent.contentOffset.x === 0
    ? 0
    : Math.round(
     (event.nativeEvent.contentOffset.x + marginAlign) /
     columnContainerWidth
    )
  updateCurrentColumnIndex(columnIndex)
  setToColumnIndex(columnIndex)
 }

 return (
  <DragContextValue.Provider
   value={{
    setDragCard,
    dragCardY: dragItem?.id ? dragY : undefined,
    dragCardX: dragItem?.id ? dragX : undefined,
    dragCard: dragItem?.props,
   }}
  >
   <GestureDetector gesture={pan}>
    <View>
     <Animated.FlatList
      ref={columnsHorizontalScrollRef}
      horizontal
      pagingEnabled
      snapToInterval={columnContainerWidth}
      snapToAlignment={"center"}
      decelerationRate={"fast"}
      onMomentumScrollEnd={onMomentumScrollEnd}
      data={props.columnData}
      renderItem={renderColumn}
      contentContainerStyle={props.contentContainerStyle}
      style={props.containerStyle}
     />

     {dragItem?.props && (
      <Animated.View style={animatedStyle}>
       {props.renderItem(dragItem.props as T, true)}
      </Animated.View>
     )}
    </View>
   </GestureDetector>
  </DragContextValue.Provider>
 )
}

export default ReactNativeKanbanBoard
