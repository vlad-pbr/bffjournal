import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user/user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bff-journal';

  constructor(public dialog: MatDialog) {}

  openUserDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent)
  }
}
