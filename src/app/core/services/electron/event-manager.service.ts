import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  constructor(
    private electronService: ElectronService
  ) { }

  public initEventManger(): void {
    this.addListeners();
  }

  private addListeners(): void {
    if (this.electronService.isElectron) {
      this.electronService.ipcRenderer.on('focus', () => {
        console.log("TCL: EventManagerService -> 'focus'", 'focus');
      })
      this.electronService.ipcRenderer.on('blur', () => {
        console.log("TCL: EventManagerService -> 'blur'", 'blur')
      })
    }
  }
  
}
