import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NoteRepository } from '../../repositories';
import { Note } from '../../models';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewPageComponent implements OnInit, OnDestroy {

  private _unsubscribeAll$: Subject<any> = new Subject();
  private noteId: string;

  note: Note;

  constructor(
    private route: ActivatedRoute,
    private noteRepository: NoteRepository
  ) { }

  ngOnInit(): void {
    this.noteId = this.route.snapshot.paramMap.get('id');
    console.log("TCL: NoteViewComponent -> this.noteId", this.noteId)
  }

  getNote(id: string): void {
    if (!this.noteId) {
      return;
    }

    this.note = this.noteRepository.getNoteById(id);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }

}
