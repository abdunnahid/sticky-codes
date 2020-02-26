import { Component, OnInit, HostListener } from '@angular/core';
import { ElectronService } from '../../core/services';
import { MatDialog } from '@angular/material/dialog';
import { FindNoteComponent } from '../../components/find-note/find-note.component';
import { Note } from '../../models';
import { NavigatorService } from '../../core/services/app/navigator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  constructor(
    private _electronService: ElectronService,
    private _dialog: MatDialog,
    private _navigator: NavigatorService
  ) { }

  ngOnInit(): void {
  }



}
