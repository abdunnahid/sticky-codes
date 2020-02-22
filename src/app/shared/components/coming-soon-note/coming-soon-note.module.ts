import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComingSoonNoteComponent } from './coming-soon-note.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ComingSoonNoteComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule
  ],
  exports: [
    ComingSoonNoteComponent
  ]
})
export class ComingSoonNoteModule { }
