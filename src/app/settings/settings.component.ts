import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    public _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.settingsForm = this._formBuilder.group({
      alwaysOnTop: [true],
      autocopy: ['always'],
      theme: ['light'],
    })
  }

  gotoNotes(): void {
    this.router.navigateByUrl('');
  }

}
