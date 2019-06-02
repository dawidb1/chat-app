import { ElementRef } from '@angular/core';

export class ChatScroll {
  disableScrollDown = false;
  scrollNative: any;
  atBottom: boolean;

  constructor(private scroller: ElementRef) {}

  scrollIfPossible(): void {
    if (!this.disableScrollDown) {
      this.scroll();
    }
  }

  private scroll() {
    try {
      this.scrollNative.scrollTop = this.scrollNative.scrollHeight;
    } catch (err) {
      console.error('cant scroll bottom');
    }
  }

  reset() {
    this.disableScrollDown = false;
    this.scrollIfPossible();
  }

  manageAutoScroll() {
    this.setScrollState();
    this.disableScrollIfInterrupted();
  }

  setScrollState() {
    this.scrollNative = this.scroller.nativeElement;
    this.atBottom = this.scrollNative.scrollHeight - this.scrollNative.scrollTop === this.scrollNative.clientHeight;
  }

  disableScrollIfInterrupted() {
    if (this.atBottom) {
      this.disableScrollDown = false;
    } else {
      this.disableScrollDown = true;
    }
  }
}
