import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../models';
@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {

  @Input() note: Note;
  @Output() updated: EventEmitter<Note> = new EventEmitter<Note>()

  public options: Object = {
    placeholder: "Write something",
    charCounterCount: true,
    autofocus: true
  }
  
  change(e): void {
    this.updated.emit(this.note);
  }
}
