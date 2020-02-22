import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Note } from '../../models';
import { NoteService, ElectronService } from '../../core/services';
import { Guid } from '../../utils/guid';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog';
import { FindNoteComponent } from '../../components/find-note/find-note.component';
@Component({
  selector: 'small-layout',
  templateUrl: './small-layout.component.html',
  styleUrls: ['./small-layout.component.scss']
})
export class SmallLayoutComponent implements OnInit, OnDestroy {

  notes: Note[];

  activeNote: number = 0;


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.ctrlKey) {
      if (this.electronService.isElectron && event.key == 'f') {
        this.findAndGoToNote();
        return;
      }

      if (event.key == 'q') {
        this.findAndGoToNote();
      }
    }
  }

  constructor(
    private noteService: NoteService,
    public dialog: MatDialog,
    private electronService: ElectronService
  ) { }

  ngOnInit(): void {
    this.notes = JSON.parse(JSON.stringify(this.noteService.notes)) || [];
    this.findAndGoToNote();
  }

  addNote(): void {
    let clipBoardText = ''
    if (this.electronService.isElectron) {
      clipBoardText = this.electronService.clipboard.readHTML();
    }
    this.notes.push(
      {
        id: Guid.newGuid(),
        title: `New Note`,
        color: '#fff',
        content: clipBoardText
      }
    )
    this.activeNote = this.notes.length;
  }

  deleteNote(index: number): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        messageHeader: 'Do you really wanna delete this note?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.activeNote = index;
        this.notes.splice(index, 1);
        this.noteService.deleteNoteByIndex(index);
      }
    });
  }

  updateNotes(): void {
    this.noteService.notes = this.notes;
  }

  findAndGoToNote(): void {

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
        this.activeNote = selectedNoteindex;
      }
    });

  }

  ngOnDestroy(): void {
    this.updateNotes();
  }

}
