import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  private _hasEventManagerServiceInitialized: boolean;

  private _hasMainWindowFocused: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  public hasMainWindowFocused$: Observable<boolean> = this._hasMainWindowFocused.asObservable();

  constructor(
    private electronService: ElectronService
  ) { }

  public init(): void {

    if (this._hasEventManagerServiceInitialized) {
      throw new Error("EventManagerService already initialized! Initialize it only once at bootstrap.");
    }
    this._hasEventManagerServiceInitialized = true;
    if (!this.electronService.isElectron) {
      return;
    }

    this._registerMainWindowFocusEvent();
    this._registerMainWindowBlurEvent();
  }

  private _registerMainWindowFocusEvent(): void {
    this.electronService.ipcRenderer.on('focus', () => {
      this._hasMainWindowFocused.next(true);
    })
  }

  private _registerMainWindowBlurEvent(): void {
    this.electronService.ipcRenderer.on('blur', () => {
      this._hasMainWindowFocused.next(false);
    })
  }

}
