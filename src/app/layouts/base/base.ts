import { IBase } from "./base.interface";
import { Note } from "../../models";
import { MatDialog } from "@angular/material/dialog";
import { NoteStoreService } from "../../store/note-store.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog";

export class Base implements IBase {

    notes: Note[];
    activeNoteIndex = 0;

    constructor(
        private _dialog: MatDialog,
        private _noteStore: NoteStoreService,
        private _activatedroute: ActivatedRoute,
    ) {
        this.notes = this._noteStore.notes;

        if (this.notes.length > 0) {
            this.setActiveNote(0);
        }

        this._activatedroute.queryParamMap.subscribe((paramMap: ParamMap) => {
            const activeNoteId = paramMap.get('id');
            if (activeNoteId) {
                this.activateNoteById(activeNoteId);
            };
        })
    }

    addNote(): void {
        const note = this._noteStore.addNewNote();
        this.setActiveNote(this.notes.length);
    }

    updateNote(note: Note): void {
        this._noteStore.updateNote(note);
    }

    deleteNote(note: Note): void {
        const dialogRef = this._dialog.open(ConfirmDialogComponent, {
            data: {
                messageHeader: 'Do you really wanna delete this note?',
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._noteStore.deleteNoteById(note.id);
            }
        });
    }
    
    activateNoteById(id: string): void {
        this.notes.forEach((note, index) => {
            if (note.id === id) {
                this.setActiveNote(index);
            }
        })
    }

    setActiveNote(noteIndex: number) {
        if (noteIndex === null || noteIndex === undefined) {
            return;
        }
        this.activeNoteIndex = noteIndex;
        this._noteStore.activeNote = this.notes[noteIndex];
    }


}