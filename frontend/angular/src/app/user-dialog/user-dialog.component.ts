import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../shared/services/user.service';
import { Error, User } from '../shared/models/models';
import { MatTabChangeEvent } from '@angular/material/tabs';

const enum Tab {
  LOGIN = "Log-In",
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
  currentTab: Tab = Tab.LOGIN
  busy: boolean = false

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService) {}

  onNoClick(): void {
    this.dialogRef.close()
  }

  handleTabChange(e: MatTabChangeEvent): void {
    this.currentTab = e.tab.textLabel as Tab
  }

  isSubmittable(): boolean {
    return Object.entries(this.userForm.value).map(([_, value]) => value !== "").indexOf(false) === -1
  }

  submit(): void {

    this.message = ""
    this.busy = true

    const handleError = (e: Error) => { this.message = e.detail; this.busy = false }
    const login = () => {
      this.userService.login$(this.userForm.value).subscribe({
        error: handleError,
        next: () => { this.dialogRef.close() }
      })
    }

    if (this.currentTab === Tab.LOGIN) {
      login()
    } else if (this.currentTab === Tab.REGISTER) {
      this.userService.create$(this.userForm.value).subscribe({
        error: handleError,
        next: () => { login() }
      })
    }
  }
}
