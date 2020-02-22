import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NoteService } from '../../core/services';
import { Note } from '../../models';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-find-note',
  templateUrl: './find-note.component.html',
  styleUrls: ['./find-note.component.scss']
})
export class FindNoteComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;

  allNotes: Note[];
  notes: Note[];
  focusedNoteIndex: number;
  searchCtrl = new FormControl();
  searchCtrl$: Subscription;

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'ArrowDown') {
      this.navigateDown();
    }
    if (event.key == 'ArrowUp') {
      this.navigateUp();
    }
  }

  constructor(
    private noteService: NoteService,
    public dialogRef: MatDialogRef<FindNoteComponent>,
  ) { }

  ngOnInit(): void {
    this.allNotes = JSON.parse(JSON.stringify(this.noteService.notes)) || [];
    this.subscribeToSearchInput();
  }

  ngAfterViewInit() {
    this.fixDialogPosition();
  }

  subscribeToSearchInput(): void {
    this.searchCtrl$ = this.searchCtrl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(200)
      )
      .subscribe((value) => {
        this.filterNotes(value);
      });
  }

  filterNotes(value: string): void {
    if (!value) {
      this.notes = [];
      return;
    }
    value = value.trim().toLowerCase();
    this.notes = this.allNotes.filter((note) => {
      if (note.title.toLowerCase().indexOf(value) > -1) {
        return note;
      }
    })
  }

  navigateDown(): void {
    if (this.focusedNoteIndex == null || this.focusedNoteIndex === undefined) {
      this.focusedNoteIndex = 0;
      this.focusActiveNote();
      return;
    }

    if (this.focusedNoteIndex === this.notes.length - 1) {
      return;
    }
    this.focusedNoteIndex = this.focusedNoteIndex + 1;
    this.focusActiveNote();
  }

  navigateUp(): void {
    if (this.focusedNoteIndex == null || this.focusedNoteIndex === undefined) {
      return;
    }

    if (this.focusedNoteIndex === 0) {
      this.focusedNoteIndex = null;
      this.searchInput.nativeElement.focus();
      return;
    }

    this.focusedNoteIndex = this.focusedNoteIndex - 1;
    this.focusActiveNote();

  }

  focusActiveNote(): void {
    let items: NodeListOf<HTMLElement> = document.querySelectorAll('.mat-list-item') as NodeListOf<HTMLElement>;
    items[this.focusedNoteIndex].focus();
  }

  selectNote(e): void {
    this.dialogRef.close(this.notes[this.focusedNoteIndex]);
  }

  fixDialogPosition(): void {
    const modalWrapper = document.querySelectorAll('.cdk-global-overlay-wrapper') as NodeListOf<HTMLElement>;
    modalWrapper[0].classList.add('dialog-position-fix');
  }

  ngOnDestroy() {
    this.searchCtrl$.unsubscribe();
  }

}
