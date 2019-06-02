import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatMessage } from '../../model/chat-message.model';
import { LoginService } from 'src/app/authorization/services/login.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatMessages: AngularFirestoreCollection<ChatMessage>;
  chatMessages$: Observable<ChatMessage[]>;

  private msgCollection = 'messages';

  constructor(private firestore: AngularFirestore, private loginService: LoginService) {}

  sendMessage(msg: ChatMessage) {
    const messagesCollId = this.getMessegesCollectionId(msg.fromUserId, msg.toUserId);

    this.firestore
      .collection<ChatMessage>(this.msgCollection)
      .doc(messagesCollId)
      .collection(this.msgCollection)
      .add(msg);
  }

  getMessages(toUserId: string): Observable<ChatMessage[]> {
    const fuser = this.loginService.afAuth.auth.currentUser;

    if (fuser) {
      const messagesCollId = this.getMessegesCollectionId(fuser.uid, toUserId);

      this.chatMessages = this.firestore
        .collection(this.msgCollection)
        .doc(messagesCollId)
        .collection<ChatMessage>(this.msgCollection, ref => ref.orderBy('timeSent', 'desc').limit(25));

      this.chatMessages$ = this.chatMessages.snapshotChanges().pipe(
        map(items => {
          return items.map((item: DocumentChangeAction<ChatMessage>) => this.mapCollection(item));
        })
      );
      return this.chatMessages$;
    }
    throw new Error('Trying to get messages from nullable user');
  }

  mapCollection(item: DocumentChangeAction<any>) {
    const ids = {
      id: item.payload.doc.id,
      ...item.payload.doc.data()
    };

    return ids;
  }

  getMessegesCollectionId(from: string, to: string): string {
    if (from > to) {
      return from + to;
    }
    return to + from;
  }

  setMessageRead(msg: ChatMessage) {
    const id = msg.id;
    delete msg.id;

    const chanelId = this.getMessegesCollectionId(msg.fromUserId, msg.toUserId);

    this.firestore.doc(`${this.msgCollection}/${chanelId}/${this.msgCollection}/${id}`).update({ read: true });
    msg.id = id;
  }
}
