import { Injectable } from '@angular/core';
import { Note } from '../models';
import { NoteRepository } from '../repositories';

@Injectable({
  providedIn: 'root'
})
export class NoteStoreService {

  private _notes: Note[];
  private _activeNote: Note;

  constructor(
    private _noteRepository: NoteRepository
  ) {
    this._notes = _noteRepository.notes;
  }

  get notes(): Note[] {
    return this._notes;
  }
  set notes(note: Note[]) {
    this._notes = note;
  }

  get activeNote(): Note {
    return this._activeNote;
  }
  set activeNote(note: Note) {
    this._activeNote = note;
  }
}
