import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;
  users$: Observable<User[]>;

  private usersDoc: AngularFirestoreDocument<User>;
  user$: Observable<User>;

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.usersCollection = afs.collection<User>('users');
    this.users$ = this.usersCollection.valueChanges();
  }

  addUser(item: User) {
    const url = `users/${item.uid}`;
    this.db.object(url).update(item);
  }

  updateUser(userUID: string, user: any) {
    const url = `users/${userUID}`;
    this.db.object(url).update(user);

    // const url = 'users/' + item.uid;
    // this.usersDoc = this.afs.doc<User>(url);
    // this.user$ = this.usersDoc.valueChanges();
    // this.usersDoc.update(item).catch(err => console.log(err));
  }
}
