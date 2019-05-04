import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { ChatService } from '../../services/chat.service';
import { UserService } from 'src/app/authorization/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];
  usersSubscription: Subscription;

  constructor(private chat: ChatService, private userService: UserService) {}

  ngOnInit() {
    this.setUsers();
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  setUsers() {
    this.usersSubscription = this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);
    });
  }
}
