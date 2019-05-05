import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  @Input() roomUserId: string;
  message: string;

  constructor(private chat: ChatService) {}

  ngOnInit() {
    console.log(this.roomUserId);
  }

  send() {
    this.chat.sendMessage(this.message, this.roomUserId);
    this.message = '';
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
