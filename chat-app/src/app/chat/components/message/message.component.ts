import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from 'src/app/model/chat-message.model';
import { AuthService } from 'src/app/authorization/services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: string;

  constructor(private authService: AuthService) {
    // authService.authUser().subscribe(user => {
    //   this.ownEmail = user.email;
    //   this.isOwnMessage = this.ownEmail === this.userEmail;
    // });
  }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent.toDate();
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
  }
}
