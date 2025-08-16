import { JSX } from "react";
import { type ViewStyle } from "react-native";

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
