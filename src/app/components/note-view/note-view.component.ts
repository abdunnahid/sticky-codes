import { Component, Input } from '@angular/core';
import { Note } from '../../models';

@Component({
  selector: 'note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent {
  @Input() note: Note;
}
