import { Injectable } from '@angular/core';
import { Note } from '../models';

@Injectable({
  providedIn: 'root'
})
export class NoteRepository {

  private _notes: Note[];

  constructor() {
    this._notes = JSON.parse(localStorage.getItem('sticky_codes_notes'));
  }

  get notes(): Note[] {
    return this._notes;
  }
  set notes(notes: Note[]) {
    if (!notes) {
      return;
    }
    this._notes = JSON.parse(JSON.stringify(notes));
    localStorage.setItem('sticky_codes_notes', JSON.stringify(notes));
  }

  getNoteById(id: string): Note {
    if (!id) {
      return;
    }
    return this._notes.find(note => note.id === id);
  }

  getNoteByIndex(index: number): Note {
    if (!index) {
      return;
    }
    return this._notes[index];
  }

  deleteNoteById(id: string): Note {
    if (!id) {
      return;
    }
    this._notes.forEach((note, index) => {
      if (note.id === id) {
        this._notes.splice(index, 1);
      }
    });
    this.notes = this._notes;

    return this._notes.find(note => note.id === id);
  }

  deleteNoteByIndex(index: number): Note {
    if (index === null || index === undefined) {
      return;
    }
    this._notes.splice(index, 1);
    this.notes = this._notes;
  }

  addNote(note: Note): void {
    if (!note) {
      return;
    }
    this._notes.push(note);
    this.notes = this._notes;
  }


}
