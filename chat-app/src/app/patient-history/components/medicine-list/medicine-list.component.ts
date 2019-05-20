import { Component, OnInit, Input} from '@angular/core';
import { AppPage } from 'e2e/src/app.po';
import { MEDICINES } from './mock-medicine';
import { Medicine } from 'src/app/model/medicine-list.model';
import { ClinicUserService } from 'src/app/authorization/services/clinic-user.service';
import { ClinicUser } from 'src/app/authorization/model/clinic-user.model';
import { UserType } from 'src/app/authorization/model/user-type.enum';
import { MatDatepickerInputEvent } from '@angular/material';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit {
  @Input() roomUserEmail: string;
  @Input() userType: string;
  @Input() currentUserEmail:string;
  med: Medicine[];
  constructor(
    private clinicUserService: ClinicUserService) {
      
    }

  ngOnInit() {
    this.getMedicineList();
  }
   
  //med=MEDICINES;
  selectedMedicine: Medicine;

  
  onSelect(medicine: Medicine): void {
    this.selectedMedicine = medicine;
  }
  
  getMedicineList()
  {
    if(this.userType=="1")
    {
        this.clinicUserService.getUserByEmail(this.currentUserEmail).subscribe((res: ClinicUser) => {
        const clinicUser: ClinicUser = res;
        this.med=res.Medicine_list;
        return (res.Medicine_list);            
      });
    }
    else if(this.userType=='0'){
      this.clinicUserService.getUserByEmail(this.roomUserEmail).subscribe((res: ClinicUser) => {
        const clinicUser: ClinicUser = res;
        this.med=res.Medicine_list;
        return (res.Medicine_list);      
      });
    }
  }
}