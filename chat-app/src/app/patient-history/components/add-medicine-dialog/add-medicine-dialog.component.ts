import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-medicine-dialog',
  templateUrl: './add-medicine-dialog.component.html',
  styleUrls: ['./add-medicine-dialog.component.scss']
})
export class AddMedicineDialogComponent {
  dosePerDay: number;
  startDate: string;
  endDate: string;
  name: string;
  constructor(public dialogRef: MatDialogRef<AddMedicineDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
