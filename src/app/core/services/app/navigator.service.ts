import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../electron/electron.service';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor(
    public _zone: NgZone,
    private _router: Router,
    private _electronService: ElectronService
  ) { }

  public navigateByUrl(route: string): void {

    if (!route) {
      return;
    }

    if (!this._electronService.isElectron) {
      this._router.navigateByUrl(route);
      return;
    }

    this._zone.run(() => {
      this._router.navigateByUrl(route);
    });

  }

}
