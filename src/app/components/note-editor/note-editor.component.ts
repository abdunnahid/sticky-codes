import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { Note } from '../../models';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'note',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements AfterViewInit, OnDestroy {

  @Input() note: Note;
  @Output() updated: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() delete: EventEmitter<Note> = new EventEmitter<Note>();

  private _unsubscribeAll$: Subject<any> = new Subject();

  title: FormControl = new FormControl();

  public options: Object = {
    placeholder: "Write something",
    charCounterCount: true,
    autofocus: true
  }

  ngAfterViewInit(): void {
    this.title.setValue(this.note?.title);
    this.title.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this._unsubscribeAll$),
        debounceTime(500),
      )
      .subscribe((value) => {
        this.note.title = value;
        this.updated.emit(this.note);
      })
  }

  change(e): void {
    this.updated.emit(this.note);
  }

  deleteNote(note: Note): void {
    this.delete.emit(note);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }

}
