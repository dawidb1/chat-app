import { Component, OnInit, OnChanges, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ChatMessage } from 'src/app/model/chat-message.model';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges {
  feed$: Observable<ChatMessage[]>;

  @Input() roomUser: User;
  @Output() isNewUnreadedMessage = new EventEmitter<boolean>();

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.feed$ = this.chat.getMessages(this.roomUser.id);
  }

  ngOnChanges() {
    this.handleNewMessages();
  }

  handleNewMessages() {
    this.feed$ = this.chat.getMessages(this.roomUser.id).pipe(
      map(x => {
        this.emitNewMessage(x[x.length - 1]);
        return x;
      })
    );
  }

  emitNewMessage(mess: ChatMessage) {
    console.log('emiting2');

    const isMy = this.isMyMessage(mess);
    this.isNewUnreadedMessage.emit(isMy);
  }

  isMyMessage(mess: ChatMessage) {
    return mess.toUserId === this.roomUser.id;
  }
}
