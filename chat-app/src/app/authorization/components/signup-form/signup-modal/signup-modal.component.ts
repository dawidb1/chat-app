import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SignUp } from 'src/app/model/sing-up.model';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss']
})
export class SignupModalComponent  {

  constructor(
    public dialogRef: MatDialogRef<SignupModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SignUp
  ) {}

  close(): void {
    this.dialogRef.close();
  }

}
