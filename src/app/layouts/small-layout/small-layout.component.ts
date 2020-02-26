import { Component, OnInit, OnDestroy } from '@angular/core';
import { Note } from '../../models';
import { ElectronService } from '../../core/services';
import { Guid } from '../../utils/guid';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NoteRepository } from '../../repositories';
import { NavigatorService } from '../../core/services/app/navigator.service';
import { NoteStoreService } from '../../store/note-store.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'small-layout',
  templateUrl: './small-layout.component.html',
  styleUrls: ['./small-layout.component.scss']
})
export class SmallLayoutComponent implements OnInit, OnDestroy {

  notes: Note[];
  activeNoteIndex = 0;

  constructor(
    private _noteRepository: NoteRepository,
    private _dialog: MatDialog,
    private _electronService: ElectronService,
    private _navigator: NavigatorService,
    private _noteStore: NoteStoreService,
    private _activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.notes = JSON.parse(JSON.stringify(this._noteRepository.notes)) || [];
    if (this.notes.length > 0) {
      this._setActiveNote(0);
    }

    this._activatedroute.queryParamMap.subscribe((paramMap: ParamMap) => {
      const activeNoteId = paramMap.get('id');
      if (activeNoteId) {
        this.activateNoteById(activeNoteId);
      };
    })

  }

  private _setActiveNote(noteIndex: number): void {
    if (noteIndex === null || noteIndex === undefined) {
      return;
    }
    this.activeNoteIndex = noteIndex;
    this._noteStore.activeNote = this.notes[noteIndex];
  }

  addNote(): void {
    let clipBoardText = ''
    if (this._electronService.isElectron) {
      clipBoardText = this._electronService.clipboard.readHTML();
    }
    this.notes.push(
      {
        id: Guid.newGuid().toString(),
        title: `New Note`,
        color: '#fff',
        content: clipBoardText,
        createdAt: new Date()
      }
    )
    this.activeNoteIndex = this.notes.length;
  }

  deleteNote(index: number): void {

    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        messageHeader: 'Do you really wanna delete this note?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.activeNoteIndex = index;
        this.notes.splice(index, 1);
        this._noteRepository.deleteNoteByIndex(index);
      }
    });
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.updateNotes();
    this._setActiveNote(event.index);
  }

  updateNotes(): void {
    this._noteRepository.notes = this.notes;
  }

  gotoSettingsPage(): void {
    this._navigator.navigateByUrl('settings');
  }

  gotoNotesPage(): void {
    this._navigator.navigateByUrl('notes');
  }

  private activateNoteById(id: string): void {
    this.notes.forEach((note, index) => {
      if (note.id === id) {
        this._setActiveNote(index);
      }
    })
  }

  ngOnDestroy(): void {
    this.updateNotes();
  }

}
