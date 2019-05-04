import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ChatMessage } from 'src/app/model/chat-message.model';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: AngularFirestoreCollection<ChatMessage>;
  feed$: Observable<ChatMessage[]>;

  @Input() roomUserId: string;

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.feed$ = this.chat.getMessages(this.roomUserId);
  }

  ngOnChanges() {
    this.feed$ = this.chat.getMessages(this.roomUserId);
  }
}
