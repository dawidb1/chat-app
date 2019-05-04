import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentSnapshot, Action } from '@angular/fire/firestore';
import { User } from '../../model/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection = 'users';

  constructor(private firestore: AngularFirestore) {}

  getUsers() {
    return this.getUsersSnapshot().pipe(
      map(items => {
        return items.map((item: DocumentChangeAction<User>) => this.mapUser(item));
      })
    );
  }

  mapUser(item: DocumentChangeAction<User>) {
    return {
      id: item.payload.doc.id,
      ...item.payload.doc.data()
    };
  }

  getUsersSnapshot() {
    return this.firestore.collection(this.userCollection).snapshotChanges();
  }

  getUserSnapshot(id: string) {
    return this.firestore
      .collection(this.userCollection)
      .doc(id)
      .snapshotChanges();
  }

  getUserById(id: string) {
    const user$ = this.getUserSnapshot(id);
    return user$.pipe(
      map((user: Action<DocumentSnapshot<User>>) => {
        return {
          id: user.payload.id,
          ...user.payload.data()
        } as User;
      })
    );
  }

  addUser(user: User) {
    return this.firestore
      .collection(`${this.userCollection}`)
      .doc(user.uid)
      .set(user);
  }

  updateUser(user: User) {
    const userId = user.id;
    delete user.id;
    this.firestore.doc(this.userCollection + '/' + userId).update(user);
    user.id = userId;
  }

  deleteUser(userId) {
    this.firestore.doc(this.userCollection + '/' + userId).delete();
  }
}
