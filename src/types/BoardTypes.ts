import { Columns } from "./ColumnsType";

export interface Board {
  boardID: string;
  title: string;
  columns: Columns[];
}

export interface BoardInfo {
  boardID: string;
  title: string;
}
