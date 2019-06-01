import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { LoginService } from 'src/app/authorization/services/login.service';
import { Subscription } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
  medicine: boolean;
  currentUserSubscription: Subscription;

  constructor(private loginService: LoginService) {
    this.medicine = true;
  }

  ngOnInit() {
    this.setCurrentUser();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  setCurrentUser() {
    this.currentUserSubscription = this.loginService.getLoggedInUser().subscribe(user => {
      this.currentUser = user;
      this.currentUserSubscription.unsubscribe();
    });
  }

  checkMedicineOrHistory() {
    this.medicine = !this.medicine;
  }

  changeUserRoomEvent(event: User) {
    this.roomUser = event;
  }

  isNewUnreadedMessage(e: boolean) {
    if (e) {
      alert('new message');
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

  scrollToBottom(): void {
    if (!this.disableScrollDown) {
      try {
        this.scroller.nativeElement.scrollTop = this.scroller.nativeElement.scrollHeight;
      } catch (err) {}
    }
  }
}
