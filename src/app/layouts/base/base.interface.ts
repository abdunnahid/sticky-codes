import { Note } from "../../models";

export interface IBase {
    notes: Note[];
    activeNoteIndex: number;
    setActiveNote(noteIndex: number): void;
    addNote(): void;
    deleteNote(note: Note): void;
    updateNote(note: Note): void;
    activateNoteById(id: string): void;
}