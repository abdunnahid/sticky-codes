import { Guid } from "../utils/guid";

export interface Note {
    id: Guid;
    title: string;
    content: string;
    color: string;
}