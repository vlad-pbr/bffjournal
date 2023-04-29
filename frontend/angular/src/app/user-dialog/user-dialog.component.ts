import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent {
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close()
  }
}
