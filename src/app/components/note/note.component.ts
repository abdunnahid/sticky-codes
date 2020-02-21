import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  note: string = '';

  public options: Object = {
    placeholder: "Edit Me",
    charCounterCount: true
  }

  constructor() { }

  ngOnInit(): void {
  }

  check(): void {
    console.log(this.note);
  }

}
