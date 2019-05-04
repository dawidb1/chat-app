import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ChatMessage } from '../../model/chat-message.model';
import { User } from 'src/app/model/user.model';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: firebase.User;
  chatMessages: AngularFirestoreCollection<ChatMessage>;
  chatMessages$: Observable<ChatMessage[]>;
  private usersCollection: AngularFirestoreCollection<User>;
  users$: Observable<User[]>;

  private usersDoc: AngularFirestoreDocument<User>;
  user$: Observable<User>;
  chatMessage: ChatMessage;
  userName$: Observable<string>;
  userName: string;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().subscribe((a: any) => {
        this.userName = a.user.displayName;
      });
    });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.collection<User>(path).valueChanges();
  }

  getUsers() {
    const path = '/users';
    return this.db.collection<User>(path).valueChanges();
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = 'email@example.pl'; // todo
    this.userName = 'test dawid';

    this.chatMessages$ = this.getMessages();
    this.chatMessages.add({
      message: msg,
      timeSent: new Date(timestamp),
      userName: this.userName,
      email
    });

    console.log('sendMessage called');
  }

  getMessages(): Observable<ChatMessage[]> {
    // query to create our message feed binding
    this.chatMessages = this.db.collection<ChatMessage>('messages', ref => ref.orderBy('timeSent', 'desc').limit(25));
    this.chatMessages$ = this.chatMessages.valueChanges();
    return this.chatMessages$;

    // return this.db.list('messages', {
    //   query: {
    //     limitToLast: 25,
    //     orderByKey: true
    //   }
    // });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();

    return date + ' ' + time;
  }
}
