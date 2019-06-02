import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { User } from 'src/app/model/user.model';
import { ChatMessage } from 'src/app/model/chat-message.model';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  @Input() roomUserId: string;
  @Input() currentUser: User;

  message: string;

  constructor(private chat: ChatService) {}

  ngOnInit() {}

  send() {
    console.log(`roomUser: ${this.roomUserId}, sender: ${this.message}`);

    const msg: ChatMessage = {
      message: this.message,
      timeSent: new Date(this.getTimeStamp()),
      userName: this.currentUser.username,
      email: this.currentUser.email,
      fromUserId: this.currentUser.id,
      toUserId: this.roomUserId
    };
    this.message = '';

    this.chat.sendMessage(msg);
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();

    return date + ' ' + time;
  }
}
