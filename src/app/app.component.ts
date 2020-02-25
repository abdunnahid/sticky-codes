import { Component, OnInit } from '@angular/core';
import { ElectronService, EventManagerService } from './core/services';
import { AppConfig } from '../environments/environment';
import { NavigatorService } from './core/services/app/navigator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public electronService: ElectronService,
    private _navigatorService: NavigatorService,
    private _eventManager: EventManagerService,

  ) {
    this._eventManager.initEventManger();

    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log('Mode electron');
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit(): void {
    this.listenToMainWindowFocusEvents();
  }

  private listenToMainWindowFocusEvents(): void {
    this._eventManager.hasMainWindowFocused$.subscribe(
      (isFocused: boolean) => {
        console.log("TCL: AppComponent -> isFocused", isFocused)
        if (isFocused) {
          this._navigatorService.navigateByUrl('home');
        }
        else {
          this._navigatorService.navigateByUrl('view');
        }
      }
    )
  }
}
