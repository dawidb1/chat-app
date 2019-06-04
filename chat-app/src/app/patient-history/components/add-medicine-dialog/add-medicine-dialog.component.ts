import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewMedicine } from 'src/app/model/new-medicine.model';
import { Medicine } from 'src/app/model/medicine-list.model';
import { User } from 'src/app/model/user.model';
import { MedicineService } from '../../services/medicine.service';

@Component({
  selector: 'app-add-medicine-dialog',
  templateUrl: './add-medicine-dialog.component.html',
  styleUrls: ['./add-medicine-dialog.component.scss']
})
export class AddMedicineDialogComponent {
  newMedicine: NewMedicine;

  constructor(public dialogRef: MatDialogRef<AddMedicineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public patient: User,
    private medicineService: MedicineService) {
      this.newMedicine = new NewMedicine();
    }

  add(): void {
    const stringMed: Medicine = {
      patientId: this.patient.id,
      dosePerDay: this.newMedicine.dosePerDay,
      startDate: this.newMedicine.startDate.toString(),
      endDate: this.newMedicine.endDate.toString(),
      name: this.newMedicine.name
    };

    this.medicineService.addMedicine(stringMed).subscribe();

    this.dialogRef.close();
  }
}
