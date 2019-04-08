import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ChatMessage } from 'src/app/model/chat-message.model';
import { ChatService } from '../chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  feed: AngularFirestoreCollection<ChatMessage>;
  feed$: Observable<ChatMessage[]>;

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.feed$ = this.chat.getMessages();
  }

  ngOnChanges() {
    this.feed$ = this.chat.getMessages();
  }
}
