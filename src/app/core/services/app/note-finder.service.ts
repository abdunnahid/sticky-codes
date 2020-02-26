import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ElectronService } from '../electron/electron.service';
import { MatDialog } from '@angular/material/dialog';
import { FindNoteComponent } from '../../../components/find-note/find-note.component';
import { Note } from '../../../models';
import { NavigatorService } from './navigator.service';

@Injectable({
  providedIn: 'root'
})
export class NoteFinderService {

  private _hasNoteFinderInitialized: boolean;
  private _isNoteFinderActive: boolean;

  constructor(
    private _electronService: ElectronService,
    private _dialog: MatDialog,
    private _navigator: NavigatorService
  ) { }

  public init(): void {

    if (this._hasNoteFinderInitialized) {
      throw new Error("NoteFinderService already initialized! Initialize it only once at bootstrap.");
    }

    fromEvent(document, 'keyup').subscribe((event: KeyboardEvent) => {
      if (event.ctrlKey) {
        if (this._electronService.isElectron && event.code == 'KeyF') {
          this._findAndGoToNote();
          return;
        }
        if (event.code == 'KeyQ') {
          this._findAndGoToNote();
        }
      }
    });
    this._hasNoteFinderInitialized = true;
  }

  private _findAndGoToNote(): void {
    if (this._isNoteFinderActive) {
      return;
    }
    this._isNoteFinderActive = true;

    const dialogRef = this._dialog.open(FindNoteComponent, {
      data: {
        messageHeader: 'Do you really wanna delete this note?',
      },
      panelClass: 'find-note-dialog'
    });

    dialogRef.afterClosed().subscribe((selectedNote: Note) => {
      if (selectedNote) {
        this._navigator.navigateByUrl(`home?id=${selectedNote.id}`);
      }
      this._isNoteFinderActive = false;
    });
  }
  
}
