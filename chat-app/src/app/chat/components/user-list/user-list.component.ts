import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { ChatService } from '../../services/chat.service';
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

  currentUser: string;
  currentRoomUser: string;

  @Output() changeUserRoom: EventEmitter<User> = new EventEmitter();

  constructor(private userService: UserService, private loginService: LoginService) {}

  ngOnInit() {
    this.currentUser = this.loginService.currentUserId;
    this.setUsers();
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  setUsers() {
    this.usersSubscription = this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.changeRoom(this.users[0]);
    });
  }

  changeRoom(user: User) {
    this.changeUserRoom.emit(user);
    this.currentRoomUser = user.id;
  }
}
