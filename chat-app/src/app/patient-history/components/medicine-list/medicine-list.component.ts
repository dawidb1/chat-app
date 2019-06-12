import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Medicine } from 'src/app/model/medicine-list.model';
import { ClinicUserService } from 'src/app/authorization/services/clinic-user.service';
import { ClinicUser } from 'src/app/authorization/model/clinic-user.model';
import { UserType } from 'src/app/authorization/model/user-type.enum';
import { MatDialog } from '@angular/material';
import { MedicineDialogComponent } from '../medicine-dialog/medicine-dialog.component';
import { AddMedicineDialogComponent } from '../add-medicine-dialog/add-medicine-dialog.component';
import { User } from 'src/app/model/user.model';
import { MedicineService } from '../../services/medicine.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit, OnChanges {
  constructor(
    private clinicUserService: ClinicUserService,
    public dialog: MatDialog,
    private medicineService: MedicineService
  ) {}
  @Input() roomUserEmail: string;
  @Input() currentUserType: UserType;
  @Input() currentUserEmail: string;
  @Input() patient: User;

  med: Medicine[];
  newMedicines: Medicine[];

  // med=MEDICINES;
  selectedMedicine: Medicine;

  ngOnInit() {
    this.getMedicineList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.patient) {
      this.getMedicineList();
    }
  }

  onSelect(medicine: Medicine): void {
    this.selectedMedicine = medicine;

    const dialogRef = this.dialog.open(MedicineDialogComponent, {
      height: '300px',
      width: '400px',
      data: medicine
    });
  }

  add() {
    const dialogRef = this.dialog.open(AddMedicineDialogComponent, {
      data: this.patient,
      height: '400px',
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(x => this.getMedicineList());
  }

  getMedicineList() {
    this.clinicUserService.getUserByEmail(this.patient.email).subscribe((res: ClinicUser) => {
      this.med = res.Medicine_list as Medicine[];

      this.getNewMedicines().subscribe(newMed => {
        this.newMedicines = newMed;
        this.connectMedicines();
      });
    });
  }

  getNewMedicines() {
    return this.medicineService.getNewMedicines(this.patient.id);
  }

  connectMedicines() {
    this.med = [...this.med, ...this.newMedicines];
  }
}
