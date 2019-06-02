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
  ElementRef,
  SimpleChanges
} from '@angular/core';
import { ChatMessage } from 'src/app/model/chat-message.model';
import { ChatService } from '../../services/chat.service';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { ChatScroll } from '../../classes/chat-scroll';
import { MatSnackBar } from '@angular/material';

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

  constructor(private chat: ChatService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.subscribeFeed();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === 'roomUser' && this.chatScroll) {
        this.chatScroll.reset();
      }
    }
    this.subscribeFeed();
  }

  ngAfterViewInit() {
    this.chatScroll = new ChatScroll(this.scroller);
    this.chatScroll.setScrollState();
  }

  ngAfterViewChecked() {
    if (this.lastMessage) {
      if (this.lastMessage.toUserId === this.roomUser.id) {
        // this.chatScroll.reset();
        this.chatScroll.scrollIfPossible();
      }
    }
  }

  subscribeFeed() {
    this.feed$ = this.chat.getMessages(this.roomUser.id);
    this.feed$.subscribe(res => {
      this.feeds = res;
      this.lastMessage = res[0];
      if (res[0]) {
        if (this.isMyMessage(res[0])) {
          this.chatScroll.scrollIfPossible();
        } else {
          this.isNewUnreadMessage(res[0]);
        }
      }
    });
  }

  isMyMessage(msg: ChatMessage) {
    return msg.toUserId === this.roomUser.id;
  }

  isNewUnreadMessage(msg: ChatMessage) {
    if (!msg.read && msg.fromUserId === this.roomUser.id) {
      this.newMessageNotif();
      this.isNewUnreadedMessage.emit(msg);
    }
  }

  newMessageNotif() {
    const message = 'You have new unreaded message';
    const action = 'message';
    this._snackBar
      .open(message, action, {
        verticalPosition: 'top'
      })
      .onAction()
      .subscribe(() => {
        this.chatScroll.reset();
        console.log('onAction');
        this.isNewUnreadedMessage.emit(null);

      });
  }

  onScroll() {
    console.log('on scroll');

    this.chatScroll.manageAutoScroll();
    if (this.chatScroll.atBottom && this.lastMessage && !this.lastMessage.read) {
      this.setMessageRead();
    }
  }

  setMessageRead() {
    this.chat.setMessageRead(this.lastMessage);
  }
}
