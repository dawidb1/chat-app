import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserType } from 'src/app/authorization/model/user-type.enum';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  @Input() active: boolean;
  @Input() unread: boolean;

  UserType: typeof UserType = UserType;

  constructor() {}

  ngOnInit() {}
}
