import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { LoginService } from 'src/app/authorization/services/login.service';
import { UserType } from 'src/app/authorization/model/user-type.enum';
import { ChatMessage } from 'src/app/model/chat-message.model';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  currentUser: User;
  roomUser: User;
  medicine: boolean;

  patient: User;

  unreadMessage: ChatMessage;

  UserType: typeof UserType = UserType;

  constructor(private loginService: LoginService, private messageService: ChatService) {
    this.medicine = true;
  }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const currentUserSubscription = this.loginService.getLoggedInUser().subscribe(user => {
      this.currentUser = user;
      currentUserSubscription.unsubscribe();
    });
  }

  checkMedicineOrHistory() {
    this.medicine = !this.medicine;
  }

  changeUserRoomEvent(eventUser: User) {
    this.roomUser = eventUser;

    if (this.roomUser.userType === UserType.PATIENT) {
      this.patient = this.roomUser;
    } else if (this.roomUser.userType === UserType.DOCTOR) {
      this.patient = this.currentUser;
    }
  }

  isNewUnreadedMessage(e: ChatMessage) {
    this.unreadMessage = e;
  }
}
