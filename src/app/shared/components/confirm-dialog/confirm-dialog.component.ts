import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'fuse-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
    confirmMessage: string;
    showConfirmMessageInput = false;

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        this.showConfirmMessageInput = data.confirmMessage;
    }

    confirm(): void {

        if (this.showConfirmMessageInput) {
            this.dialogRef.close({
                confirmMessage: this.confirmMessage
            });
        }
        else { this.dialogRef.close(true); }
    }
    
    cancel(): void {
        this.dialogRef.close(false);
    }

}
