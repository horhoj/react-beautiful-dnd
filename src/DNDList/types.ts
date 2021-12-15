export interface Item {
  content: string;
}

export interface ItemsData {
  [keys: number]: Item;
}

export interface Column {
  title: string;
}

export interface ItemIdListsData {
  [keys: number]: number[];
}

export interface ColumnsData {
  [keys: number]: Column;
}
