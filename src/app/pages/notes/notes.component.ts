import { Component, OnInit } from '@angular/core';
import { NoteStoreService } from '../../store/note-store.service';
import { Note } from '../../models';
import { NavigatorService } from '../../core/services/app/navigator.service';
import { ElectronService } from '../../core/services';
import { Guid } from '../../utils/guid';
import { NoteRepository } from '../../repositories';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: Note[] = [];

  constructor(
    private _noteStore: NoteStoreService,
    private _navigator: NavigatorService,
    private _electronService: ElectronService,
    private _noteRepository: NoteRepository,
  ) { }

  ngOnInit(): void {
    this.notes = this._noteStore.notes;
    this._noteStore.activeNote = null;
  }

  gotoNote(note: Note): void {
    this._navigator.navigateByUrl(`home?id=${note.id}`)
  }

  addNote(): void {
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
    if (!this.notes) {
      this.notes = [];
    }
    this.notes.push(note);
    this._noteRepository.notes = this.notes;
    this.gotoNote(note);
  }

}
