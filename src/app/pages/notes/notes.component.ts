import { Component, OnInit } from '@angular/core';
import { NoteStoreService } from '../../store/note-store.service';
import { Note } from '../../models';
import { NavigatorService } from '../../core/services/app/navigator.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: Note[] = [];

  constructor(
    private _noteStore: NoteStoreService,
    private _navigator: NavigatorService
  ) { }

  ngOnInit(): void {
    this.notes = this._noteStore.notes;
    this._noteStore.activeNote = null;
  }

  addNote(): void {
    const note = this._noteStore.addNewNote();
    this.gotoNote(note);
  }

  gotoNote(note: Note): void {
    this._navigator.navigateByUrl(`home?id=${note.id}`)
  }


}
