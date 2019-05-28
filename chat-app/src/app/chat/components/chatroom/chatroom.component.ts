import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { LoginService } from 'src/app/authorization/services/login.service';
import { Subscription } from 'rxjs';
import { UserType } from 'src/app/authorization/model/user-type.enum';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') scroller: ElementRef;
  disableScrollDown = false;

  currentUser: User;
  roomUser: User;

  currentUserSubscription: Subscription;

  UserType: typeof UserType = UserType;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.currentUserSubscription = this.loginService.getLoggedInUser().subscribe(user => {
      this.currentUser = user;
      this.currentUserSubscription.unsubscribe();
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  changeUserRoomEvent(event: User) {
    this.roomUser = event;
  }

  scrollToBottom(): void {
    if (!this.disableScrollDown) {
      try {
        this.scroller.nativeElement.scrollTop = this.scroller.nativeElement.scrollHeight;
      } catch (err) {}
    }
  }

  onScroll() {
    const element = this.scroller.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (this.disableScrollDown && atBottom) {
      this.disableScrollDown = false;
    } else {
      this.disableScrollDown = true;
    }
  }
}
