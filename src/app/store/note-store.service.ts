import { Injectable } from '@angular/core';
import { Note } from '../models';
import { NoteRepository } from '../repositories';
import { ElectronService } from '../core/services';
import { Guid } from '../utils/guid';

@Injectable({
  providedIn: 'root'
})
export class NoteStoreService {

  private _notes: Note[];
  private _activeNote: Note;

  constructor(
    private _noteRepository: NoteRepository,
    private _electronService: ElectronService,
  ) {
    this._notes = _noteRepository.notes || [];
  }

  get notes(): Note[] {
    return this._notes;
  }

  get activeNote(): Note {
    return this._activeNote;
  }
  set activeNote(note: Note) {
    this._activeNote = note;
  }

  addNewNote(): Note {
    let clipBoardText = ''
    if (this._electronService.isElectron) {
      clipBoardText = this._electronService.clipboard.readHTML();
    }
    const note = {
      id: Guid.newGuid().toString(),
      title: `New Note`,
      color: '#fff',
      content: clipBoardText,
      createdAt: new Date()
    }
    this._notes.push(note);
    this._noteRepository.notes = this._notes;
    return note;
  }

  deleteNoteById(id: string): void {
    if (!id) {
      return;
    }
    this._notes.forEach((note, index) => {
      if (note.id === id) {
        this._notes.splice(index, 1);
      }
    });
    this._noteRepository.deleteNoteById(id);
  }

  updateNote(noteToUpdate: Note): void {
    if (!noteToUpdate) {
      return;
    }
    this._notes.forEach((note, index) => {
      if (note.id === noteToUpdate.id) {
        this._notes[index] = noteToUpdate;
      }
    });
    this._noteRepository.notes = this._notes;
  }
}
