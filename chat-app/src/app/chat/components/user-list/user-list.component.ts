import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
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

  currentRoomUser: string;

  @Output() changeUserRoom: EventEmitter<string> = new EventEmitter();

  constructor(private chat: ChatService, private userService: UserService) {}

  ngOnInit() {
    this.setUsers();
    this.changeRoom(this.users[0]);
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  setUsers() {
    this.usersSubscription = this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  changeRoom(user: User) {
    this.changeUserRoom.emit(user.id);
    this.currentRoomUser = user.id;
  }
}
