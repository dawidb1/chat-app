import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') scroller: ElementRef;
  disableScrollDown = false;

  constructor() {}

  ngOnInit() {}

  ngAfterViewChecked() {
    this.scrollToBottom();
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