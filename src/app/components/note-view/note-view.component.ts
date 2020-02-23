import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent implements OnInit {

  @Input() note = "";

  constructor() { }

  ngOnInit(): void {
  }

}
