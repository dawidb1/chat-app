import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Medicine } from 'src/app/model/medicine-list.model';
import { ClinicUserService } from 'src/app/authorization/services/clinic-user.service';
import { ClinicUser } from 'src/app/authorization/model/clinic-user.model';
import { UserType } from 'src/app/authorization/model/user-type.enum';
import { MatDialog } from '@angular/material';
import { MedicineDialogComponent } from '../medicine-dialog/medicine-dialog.component';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit, OnChanges {
  constructor(private clinicUserService: ClinicUserService, public dialog: MatDialog) {}
  @Input() roomUserEmail: string;
  @Input() userType: UserType;
  @Input() currentUserEmail: string;
  med: Medicine[];

  // med=MEDICINES;
  selectedMedicine: Medicine;

  ngOnInit() {
    this.getMedicineList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getMedicineList();
  }

  onSelect(medicine: Medicine): void {
    this.selectedMedicine = medicine;

    const dialogRef = this.dialog.open(MedicineDialogComponent, {
      height: '400px',
      width: '600px'
    });
  }

  getMedicineList() {
    console.log('Get medicine list called');
    console.log(this.roomUserEmail);

    if (this.userType == UserType.PATIENT) {
      this.clinicUserService.getUserByEmail(this.currentUserEmail).subscribe((res: ClinicUser) => {
        const clinicUser: ClinicUser = res;
        this.med = res.Medicine_list;
        return res.Medicine_list;
      });
    } else if (this.userType == UserType.DOCTOR) {
      this.clinicUserService.getUserByEmail(this.roomUserEmail).subscribe((res: ClinicUser) => {
        const clinicUser: ClinicUser = res;
        this.med = res.Medicine_list;
        return res.Medicine_list;
      });
    }
  }
}
