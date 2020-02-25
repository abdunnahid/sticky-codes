import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Note } from '../../models';
import { ElectronService } from '../../core/services';
import { Guid } from '../../utils/guid';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog';
import { FindNoteComponent } from '../../components/find-note/find-note.component';
import { Router } from '@angular/router';
import { NoteRepository } from '../../repositories';
import { NavigatorService } from '../../core/services/app/navigator.service';
@Component({
  selector: 'small-layout',
  templateUrl: './small-layout.component.html',
  styleUrls: ['./small-layout.component.scss']
})
export class SmallLayoutComponent implements OnInit, OnDestroy {

  notes: Note[];
  isNoteFinderActive: boolean;
  activeNoteIndex = 0;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.ctrlKey) {
      if (this.electronService.isElectron && event.code == 'KeyF') {
        this.findAndGoToNote();
        return;
      }
      if (event.code == 'KeyQ') {
        this.findAndGoToNote();
      }
    }
  }

  constructor(
    private noteService: NoteRepository,
    public dialog: MatDialog,
    private electronService: ElectronService,
    private _navigator: NavigatorService
  ) { }

  ngOnInit(): void {
    this.notes = JSON.parse(JSON.stringify(this.noteService.notes)) || [];
  }

  addNote(): void {
    let clipBoardText = ''
    if (this.electronService.isElectron) {
      clipBoardText = this.electronService.clipboard.readHTML();
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

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        messageHeader: 'Do you really wanna delete this note?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.activeNoteIndex = index;
        this.notes.splice(index, 1);
        this.noteService.deleteNoteByIndex(index);
      }
    });
  }

  updateNotes(): void {
    this.noteService.notes = this.notes;
  }

  findAndGoToNote(): void {

    if (this.isNoteFinderActive) {
      return;
    }
    this.isNoteFinderActive = true;

    const dialogRef = this.dialog.open(FindNoteComponent, {
      data: {
        messageHeader: 'Do you really wanna delete this note?',
      },
      panelClass: 'find-note-dialog'
    });

    dialogRef.afterClosed().subscribe((selectedNote: Note) => {
      if (selectedNote) {
        let selectedNoteindex = 0;
        this.notes.forEach((note, index) => {
          if (note.id === selectedNote.id) {
            selectedNoteindex = index;
          }
        });
        this.activeNoteIndex = selectedNoteindex;
      }

      this.isNoteFinderActive = false;
    });

  }

  gotoSettings(): void {
    this._navigator.navigateByUrl('settings');
  }

  ngOnDestroy(): void {
    this.updateNotes();
  }

}
