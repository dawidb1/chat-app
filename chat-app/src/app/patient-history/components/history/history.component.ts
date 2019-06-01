import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { ClinicUserService } from 'src/app/authorization/services/clinic-user.service';
import { UserType } from 'src/app/authorization/model/user-type.enum';
import { ClinicUser } from 'src/app/authorization/model/clinic-user.model';
import { History } from 'src/app/model/history-list.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @Input() roomUserEmail: string;
  @Input() userType: UserType;
  @Input() currentUserEmail: string;
  his: History[];
  constructor(private clinicUserService: ClinicUserService,) { }
  selectedHistory: History;
  ngOnInit() {
    this.getHistoryList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getHistoryList();
  }

  onSelect(history: History): void {
    this.selectedHistory = history;

  }
  getHistoryList() {
    if (this.userType == UserType.PATIENT) {
      this.clinicUserService.getUserByEmail(this.currentUserEmail).subscribe((res: ClinicUser) => {
        const clinicUser: ClinicUser = res;
        this.his = res.History_list;
        return res.History_list;
      });
    } else if (this.userType == UserType.DOCTOR) {
      this.clinicUserService.getUserByEmail(this.roomUserEmail).subscribe((res: ClinicUser) => {
        const clinicUser: ClinicUser = res;
        this.his = res.History_list;
        return res.History_list;
      });
    }
  }
}
