import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Medicine } from 'src/app/model/medicine-list.model';

@Component({
  selector: 'app-medicine-dialog',
  templateUrl: './medicine-dialog.component.html',
  styleUrls: ['./medicine-dialog.component.scss']
})
export class MedicineDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MedicineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medicine
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
