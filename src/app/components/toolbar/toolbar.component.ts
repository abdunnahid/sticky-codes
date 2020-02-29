import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../core/services';
import { NavigatorService } from '../../core/services/app/navigator.service';
import { NoteStoreService } from '../../store/note-store.service';
@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private _electron: ElectronService,
    private _navigator: NavigatorService,
    private _noteStore: NoteStoreService,
  ) { }

  ngOnInit(): void {
  }

  addNewNote(): void {
    const note = this._noteStore.addNewNote();
    this._navigator.navigateByUrl(`home?id=${note.id}`)
  }
  
  gotoList(): void {
    this._navigator.navigateByUrl('notes');
  }

  gotoSettings(): void {
    this._navigator.navigateByUrl('settings');
  }

  minimize(): void {
    if (!this._electron.isElectron) {
      return;
    }
    this._electron.remote.getCurrentWindow().minimize();
  }

  close(): void {
    if (!this._electron.isElectron) {
      return;
    }
    this._electron.remote.getCurrentWindow().close();
  }

}
