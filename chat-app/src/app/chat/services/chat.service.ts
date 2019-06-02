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

  constructor(private firestore: AngularFirestore, private loginService: LoginService) {}

  sendMessage(msg: ChatMessage) {
    const messagesCollId = this.getMessegesCollectionId(msg.fromUserId, msg.toUserId);

    this.firestore
      .collection<ChatMessage>('messages')
      .doc(messagesCollId)
      .collection('messages')
      .add(msg);
  }

  getMessages(toUserId: string): Observable<ChatMessage[]> {
    if (this.loginService.afAuth.auth.currentUser) {
      const messagesCollId = this.getMessegesCollectionId(this.loginService.afAuth.auth.currentUser.uid, toUserId);

      this.chatMessages = this.firestore
        .collection('messages')
        .doc(messagesCollId)
        .collection<ChatMessage>('messages', ref => ref.orderBy('timeSent', 'desc').limit(25));

      this.chatMessages$ = this.chatMessages.valueChanges();
      return this.chatMessages$;
    }
    return null;
  }

  getMessegesCollectionId(from: string, to: string): string {
    if (from > to) {
      return from + to;
    }
    return to + from;
  }
}
