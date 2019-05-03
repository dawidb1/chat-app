import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../model/user.model';
import { map } from 'rxjs/operators';
import { UserStatus } from '../model/user-status.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection = 'users';

  constructor(private firestore: AngularFirestore) {}

  getUsersSnapshot() {
    return this.firestore.collection(this.userCollection).snapshotChanges();
  }

  getUsers() {
    return this.getUsersSnapshot().pipe(
      map(items => {
        return items.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as User;
        });
      })
    );
  }

  addUser(user: User) {
    return this.firestore.collection(this.userCollection).add(user);
  }

  updateUser(user: User) {
    const userId = user.id;
    delete user.id;
    this.firestore.doc(this.userCollection + '/' + userId).update(user);
  }

  changeUserStatus(user: User, status: UserStatus) {}

  deleteUser(userId) {
    this.firestore.doc(this.userCollection + '/' + userId).delete();
  }
}
