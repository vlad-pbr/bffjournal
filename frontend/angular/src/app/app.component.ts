import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { LogService } from './shared/services/log.service';
import { Log, Error } from './shared/models/models';
import { UserService } from './shared/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { _MatTabGroupBase } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bff-journal';

  logForm: FormGroup = this.formBuilder.group({
    message: ''
  })
  busy: boolean = false
  message: string = ""

  constructor(
    public dialog: MatDialog,
    private logService: LogService,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {}

  getLogs(): Log[] {
    return this.logService.logs
  }

  isLoggedIn(): boolean {
    return this.userService.loggedIn
  }

  isValidLog(): boolean {
    return Object.entries(this.logForm.value).map(([_, value]) => value !== "").indexOf(false) === -1
  }

  handleError(e: Error) {
    this.message = e.detail
    this.busy = false
  }

  createLog(): void {
    this.busy = true

    this.logService.create$({
      username: this.userService.user!.username,
      date: Math.round(Date.now() / 1000),
      message: this.logForm.value.message
    }).subscribe({
      error: (e: Error) => { this.handleError(e) },
      next: () => {
        this.logService.update_logs$().subscribe({
          error: (e: Error) => { this.handleError(e) },
          next: () => { this.busy = false }
        })
      }
    })
  }

  openUserDialog(): void {
    this.busy = true

    this.dialog.open(UserDialogComponent).afterClosed().subscribe({
      next: (successful_login: boolean) => {
        if (successful_login) {
          this.logService.update_logs$().subscribe({
            error: (e: Error) => { this.handleError(e) },
            next: () => { this.busy = false }
          })
        } else {
          this.busy = false
        }
      }
    })
  }
}
