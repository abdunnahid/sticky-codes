import { Injectable } from '@angular/core';
import { NavigatorService } from './navigator.service';
import { EventManagerService } from '../electron/event-manager.service';
import { NoteStoreService } from '../../../store/note-store.service';

@Injectable({
  providedIn: 'root'
})
export class WindowFocusChangeService {

  private _hasWindowFocusChangeServiceInitialized: boolean;

  constructor(
    private _navigator: NavigatorService,
    private _eventManager: EventManagerService,
    private _noteStore: NoteStoreService,
  ) { }

  public init(): void {

    if (this._hasWindowFocusChangeServiceInitialized) {
      throw new Error("WindowFocusChangeService already initialized! Initialize it only once at bootstrap.");
    }

    this._eventManager.hasMainWindowFocused$.subscribe(
      (isFocused: boolean) => {
        console.log("WindowFocusChangeService -> init -> isFocused", isFocused)
        if (isFocused) {
          if (this._noteStore.activeNote?.id === null || this._noteStore.activeNote?.id === undefined) {
            return;
          }
          document.getElementById('app-layout').classList.remove('note-view');
          this._navigator.navigateByUrl(`home?id=${this._noteStore.activeNote.id}`);
        }
        else {
          if (this._noteStore.activeNote?.id === null || this._noteStore.activeNote?.id === undefined) {
            return;
          }
          document.getElementById('app-layout').classList.add('note-view');
          this._navigator.navigateByUrl(`view/${this._noteStore.activeNote.id}`);
        }
      }
    )

    this._hasWindowFocusChangeServiceInitialized = true;
  }

}
