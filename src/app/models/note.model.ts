import { Guid } from "../utils/guid";

export interface Note {
    id: string;
    title: string;
    content: string;
    color: string;
    createdAt: Date;
}