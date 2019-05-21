import { Component, OnInit, OnChanges, Input, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ChatMessage } from 'src/app/model/chat-message.model';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges, OnDestroy {
  feed$: Observable<ChatMessage[]>;

  @Input() roomUser: User;

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.feed$ = this.chat.getMessages(this.roomUser.id);
  }

  ngOnChanges() {
    this.feed$ = this.chat.getMessages(this.roomUser.id);
  }

  ngOnDestroy(): void {}
}
