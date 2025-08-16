import React, { createRef, useRef } from 'react'
import { type LayoutChangeEvent, Pressable, View } from 'react-native'
import { type DraggedCardProps, type ItemType, type KanbanBoardProps } from '../types'

interface CardItemProps<T extends ItemType, K> {
 item: T
 isDraggable: boolean
 itemColumnIndex: number
 renderItem: KanbanBoardProps<T, K>['renderItem']
 disableScroll: () => void
 isBeingDragged: boolean
 setDragCard: (props: DraggedCardProps<T>) => void
}

export const DataCard = React.memo(<_, K>({ item, setDragCard, renderItem, itemColumnIndex, isDraggable, disableScroll, isBeingDragged }: CardItemProps<any, K>) => {
 const positionRef = useRef<{ x: number; y: number; width: number }>(undefined)

 const onLongPress = () => {
  if (positionRef.current && isDraggable) {
   disableScroll()

   viewRef.current?.measureInWindow((x, y, width) => {
    setDragCard({ props: item, width, x, y: y - 100, columnIndex: itemColumnIndex, id: item.id })
   })
  }
 }

 const onLayout = (event: LayoutChangeEvent) => {
  event.currentTarget.measure((_x: number, _y: number, width: number, _height: number, pageX: number, pageY: number) => {
   positionRef.current = { x: pageX, y: pageY, width }
  })
 }

 const viewRef = createRef<View>()

 return (
  <Pressable delayLongPress={200} style={{ opacity: isBeingDragged ? 0 : 1, marginVertical: 2 }} onLongPress={onLongPress} onLayout={onLayout}>
   <View ref={viewRef}>
    {renderItem(item)}
   </View>
  </Pressable>
 )
})
