import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from 'src/app/model/chat-message.model';
import { LoginService } from 'src/app/authorization/services/login.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  @Input() roomUserId: string;

  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  ownEmail: string;

  isOwnMessage: boolean;

  constructor() {}

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent.toDate();
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
    this.isOwnMessage = this.roomUserId === chatMessage.toUserId;
  }
}
