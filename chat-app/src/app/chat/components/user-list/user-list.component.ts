import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/authorization/services/user.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/authorization/services/login.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];
  usersSubscription: Subscription;

  currentRoomUser: string;

  @Output() changeUserRoom: EventEmitter<User> = new EventEmitter();
  @Input() currentUser: User;

  constructor(private userService: UserService, private loginService: LoginService) {}

  ngOnInit() {
    this.setUsers();
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  setUsers() {
    this.usersSubscription = this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users
        .filter(user => user.userType !== this.currentUser.userType)
        .sort(this.sortByUsername)
        .sort(this.sortByStatus);

      if (this.users[0]) {
        this.changeRoom(this.users[0]);
      }
    });
  }

  changeRoom(user: User) {
    this.changeUserRoom.emit(user);
    this.currentRoomUser = user.id;
  }

  sortByStatus(a: User, b: User) {
    if (a.status > b.status) {
      return -1;
    }
    if (a.status < b.status) {
      return 1;
    }
    return 0;
  }

  sortByUsername(a: User, b: User) {
    if (a.username < b.username) {
      return -1;
    }
    if (a.username > b.username) {
      return 1;
    }
    return 0;
  }
}
