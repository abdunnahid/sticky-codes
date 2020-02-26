import { Component, OnInit } from '@angular/core';
import { ElectronService, EventManagerService } from './core/services';
import { AppConfig } from '../environments/environment';
import { NoteFinderService } from './core/services/app/note-finder.service';
import { WindowFocusChangeService } from './core/services/app/window-focus-change.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _electronService: ElectronService,
    private _eventManager: EventManagerService,
    private _noteFinderService: NoteFinderService,
    private _windowFocusChangeService: WindowFocusChangeService
  ) {
    _eventManager.init();
    _noteFinderService.init();
    _windowFocusChangeService.init();
  }

  ngOnInit(): void {
  }

  private _showAppEnvironment(): void {
    console.log('AppConfig', AppConfig);
    if (this._electronService.isElectron) {
      console.log('Mode electron');
    } else {
      console.log('Mode web');
    }
  }


}
