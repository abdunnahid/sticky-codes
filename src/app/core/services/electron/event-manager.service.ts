import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  private _hasMainWindowFocused: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public hasMainWindowFocused$: Observable<boolean> = this._hasMainWindowFocused.asObservable();

  constructor(
    private electronService: ElectronService
  ) { }

  public initEventManger(): void {
    this.registerNativeEvents();
  }

  private registerNativeEvents(): void {


    if (!this.electronService.isElectron) {
      // setInterval(() => {
      //   this._hasMainWindowFocused.next(!this._hasMainWindowFocused.value);
      // }, 3000);
      return;
    }

    this.electronService.ipcRenderer.on('focus', () => {
      console.log("TCL: EventManagerService -> 'focus'", 'focus')
      this._hasMainWindowFocused.next(true);
    })
    this.electronService.ipcRenderer.on('blur', () => {
      this._hasMainWindowFocused.next(false);
    })

  }

}
