import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../shared/services/user.service';
import { Error } from '../shared/models/models';

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

  message: string = ""

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService) {}

  onNoClick(): void {
    this.dialogRef.close()
  }

  submit(): void {

    this.message = ""

    this.userService.login$(this.userForm.value).subscribe({
      next: () => { this.dialogRef.close() },
      error: (e: Error) => { this.message = e.detail }
    })
  }
}
