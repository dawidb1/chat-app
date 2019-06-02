import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  AfterViewChecked,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ChatMessage } from 'src/app/model/chat-message.model';
import { ChatService } from '../../services/chat.service';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { map } from 'rxjs/operators';
import { ChatScroll } from '../../classes/chat-scroll';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {
  @ViewChild('scroller') scroller: ElementRef;
  chatScroll: ChatScroll;

  feedSubscription: Subscription;
  feed$: Observable<ChatMessage[]>;
  feeds: ChatMessage[];

  lastMessage: ChatMessage;

  @Input() roomUser: User;
  @Output() isNewUnreadedMessage = new EventEmitter<ChatMessage>();

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.subscribeFeed();
  }

  ngOnChanges() {
    this.subscribeFeed();
  }

  ngAfterViewInit() {
    this.chatScroll = new ChatScroll(this.scroller);
    this.chatScroll.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.chatScroll.scrollToBottom();
  }

  subscribeFeed() {
    this.feed$ = this.chat.getMessages(this.roomUser.id);
    this.feed$.subscribe(res => {
      this.feeds = res;
      this.lastMessage = res[0];
    });
  }

  onScroll() {
    this.chatScroll.manageAutoScroll();
    if (this.chatScroll.atBottom && !this.lastMessage.read) {
      this.setMessageRead();
    }
  }

  setMessageRead() {
    this.chat.setMessageRead(this.lastMessage);
  }
}
