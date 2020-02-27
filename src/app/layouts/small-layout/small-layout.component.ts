import { Component, OnInit, OnDestroy } from '@angular/core';
import { Note } from '../../models';
import { ElectronService } from '../../core/services';
import { Guid } from '../../utils/guid';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NoteRepository } from '../../repositories';
import { NavigatorService } from '../../core/services/app/navigator.service';
import { NoteStoreService } from '../../store/note-store.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Base } from '../base';
@Component({
  selector: 'small-layout',
  templateUrl: './small-layout.component.html',
  styleUrls: ['./small-layout.component.scss']
})
export class SmallLayoutComponent extends Base implements OnInit, OnDestroy {

  constructor(
    private _navigator: NavigatorService,
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

  ngOnInit(): void { }

  onTabChange(event: MatTabChangeEvent): void {
    this.setActiveNote(event.index);
  }

  gotoSettingsPage(): void {
    this._navigator.navigateByUrl('settings');
  }

  gotoNotesPage(): void {
    this._navigator.navigateByUrl('notes');
  }

  ngOnDestroy(): void {
  }

}
