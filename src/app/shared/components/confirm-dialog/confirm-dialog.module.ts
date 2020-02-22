import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from "./confirm-dialog.component";
import { MaterialModule } from '../../../libraries/angular-material';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ConfirmDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ]
})
export class ConfirmDialogModule {
}
