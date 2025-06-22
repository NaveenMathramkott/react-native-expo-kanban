export interface PriorityColors {
  high: string;
  medium: string;
  low: string;
  [key: string]: string;
}

export interface BoardHeader {
  id: number;
  status: string;
  color: string;
}

export interface CardData {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  phone: string;
  notes?: string;
  status?: string;
  priority: string;
  created_on: string;
  assigned_to: {
    first_name: string;
    last_name?: string;
  };
}

export interface BoardCardData {
  [key: string]: {
    columnData: CardData[];
    total_count: number;
  };
}

export interface ReactNativeKanbanBoardProps {
  boardHeaderData: BoardHeader[];
  boardCardData: BoardCardData;
  onCardPress?: (data: CardData) => void;
  onBoardChange?: (data: any) => void;
  onAddCard?: (boardId: number) => void;
  onDeleteLead?: (leadId: number, boardId: number) => Promise<void>;
  cardStyle?: object;
  priorityColors?: PriorityColors;
  isLoading?: boolean;
}
