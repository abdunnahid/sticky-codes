import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../core/services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NoteRepository } from '../../repositories';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;

  constructor(
    private electronService: ElectronService,
    private router: Router,
    public _formBuilder: FormBuilder,
    private _noteRepository: NoteRepository,
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.settingsForm = this._formBuilder.group({
      alwaysOnTop: [true],
      deleteConfirm: [true],
      autocopy: ['always'],
      theme: ['light'],
    });
    this.settingsForm.disable();
  }

  gotoNotes(): void {
    this.router.navigateByUrl('');
  }

  eraseAll(): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        messageHeader: 'Do you really want to delete all your data?',
        messageBody: 'This action will erase all your data!'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._noteRepository.eraseAll();
        window.location.reload();
      }
    });
  }

}
