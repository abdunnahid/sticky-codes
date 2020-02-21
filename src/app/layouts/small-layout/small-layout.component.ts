import { Component, OnInit, OnDestroy } from '@angular/core';
import { Note } from '../../models';
import { NoteService } from '../../core/services';
import { Guid } from '../../utils/guid';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog';

@Component({
  selector: 'small-layout',
  templateUrl: './small-layout.component.html',
  styleUrls: ['./small-layout.component.scss']
})
export class SmallLayoutComponent implements OnInit, OnDestroy {

  notes: Note[];

  activeNote: number = 0;

  constructor(
    private noteService: NoteService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.notes = JSON.parse(JSON.stringify(this.noteService.notes)) || [];
  }

  addNote(): void {
    this.notes.push(
      {
        id: Guid.newGuid(),
        title: `New Note`,
        color: '#fff',
        content: ''
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

  ngOnDestroy(): void {
    this.updateNotes();
  }

}
