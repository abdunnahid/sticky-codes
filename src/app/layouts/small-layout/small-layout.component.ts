import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../core/services';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NoteStoreService } from '../../store/note-store.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Base } from '../base';
@Component({
  selector: 'small-layout',
  templateUrl: './small-layout.component.html',
  styleUrls: ['./small-layout.component.scss']
})
export class SmallLayoutComponent extends Base {

  constructor(
    _dialog: MatDialog,
    _electronService: ElectronService,
    _noteStore: NoteStoreService,
    _activatedroute: ActivatedRoute,
  ) {
    super(
      _dialog,
      _noteStore,
      _activatedroute
    );
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.setActiveNote(event.index);
  }

}
