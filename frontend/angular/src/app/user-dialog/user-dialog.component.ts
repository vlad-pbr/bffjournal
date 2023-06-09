import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../shared/services/user.service';
import { Error } from '../shared/models/models';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { LogService } from '../shared/services/log.service';

const enum Tab {
  LOGIN = "Log In",
  REGISTER = "Register"
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent {

  userForm: FormGroup = this.formBuilder.group({
    username: '',
    password: ''
  });
  tabs: Tab[] = [ Tab.LOGIN, Tab.REGISTER ]
  message: string = ""
  currentTab: Tab = this.tabs[0]

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private logService: LogService) {}

  onNoClick(): void {
    this.dialogRef.close(false)
  }

  handleTabChange(e: MatTabChangeEvent): void {
    this.currentTab = e.tab.textLabel as Tab
  }

  handleError(e: Error) {
    this.message = e.detail
  }

  isSubmittable(): boolean {
    return Object.entries(this.userForm.value).map(([_, value]) => value !== "").indexOf(false) === -1
  }

  isLoggedIn(): boolean {
    return this.userService.loggedIn
  }

  getUsername(): string {
    return this.userService.loggedIn ? this.userService.user!.username : ""
  }

  logout(): void {
    this.userService.logout()
    this.logService.clear_logs()
    this.dialogRef.close(false)
  }

  delete(): void {
    this.userService.delete$().subscribe({
      error: (e: Error) => this.handleError(e),
      next: () => { this.logout() }
    })
  }

  submit(): void {

    this.message = ""

    const login = () => {
      this.userService.login$(this.userForm.value).subscribe({
        error: (e: Error) => this.handleError(e),
        next: () => { this.dialogRef.close(true) }
      })
    }

    if (this.currentTab === Tab.LOGIN) {
      login()
    } else if (this.currentTab === Tab.REGISTER) {
      this.userService.create$(this.userForm.value).subscribe({
        error: (e: Error) => this.handleError(e),
        next: () => { login() }
      })
    }
  }
}
