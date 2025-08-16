import { createContext, useContext } from 'react'
import { type SharedValue } from 'react-native-reanimated'
import { type DraggedCardProps, type ItemType } from '../types'

type DragContext<T extends ItemType> = {
 setDragCard: (props: DraggedCardProps<T>) => void
 dragCard?: T
 dragCardY?: SharedValue<number>
 dragCardX?: SharedValue<number>
 dragOffsetY?: SharedValue<number>
}

export const DragContextValue = createContext<DragContext<ItemType> | undefined>(undefined)

export const useDragContext = () => useContext(DragContextValue)
