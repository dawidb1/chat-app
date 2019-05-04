import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatMessage } from '../../model/chat-message.model';
import { User } from 'src/app/model/user.model';
import { LoginService } from 'src/app/authorization/services/login.service';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatMessages: AngularFirestoreCollection<ChatMessage>;
  chatMessages$: Observable<ChatMessage[]>;
  users$: Observable<User[]>;

  user$: Observable<User>;
  chatMessage: ChatMessage;

  currentUser: User;

  constructor(private firestore: AngularFirestore, private loginService: LoginService) {
    // warning service subscribe
    this.loginService.getLoggedInUser().subscribe(res => (this.currentUser = res));
  }

  sendMessage(msg: string, toUserId: string) {
    this.chatMessages.add({
      message: msg,
      timeSent: new Date(this.getTimeStamp()),
      userName: this.currentUser.username,
      email: this.currentUser.email,
      fromUserId: this.currentUser.id,
      toUserId,
      id: null
    });
  }

  getMessages(toUserId: string): Observable<ChatMessage[]> {
    this.chatMessages = this.firestore.collection<ChatMessage>('messages', ref =>
      ref
        .orderBy('timeSent', 'desc')
        .limit(25)
        .where('fromUserId', '==', this.currentUser.id)
        .where('toUserId', '==', toUserId)
    );
    this.chatMessages$ = this.chatMessages.valueChanges();
    return this.chatMessages$;
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();

    return date + ' ' + time;
  }
}
