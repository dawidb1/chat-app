import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Credentials } from '../model/credentials.model';
import { User } from '../model/user.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: firebase.auth.UserCredential;
  user: User;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    private userService: UserService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(user => {
      this.authState = user;
      this.setUserStatus('ofline');
      this.router.navigate(['chat']);
    });
  }

  private setUserStatus(status: string) {
    const data = {
      status
    };
    this.userService.updateUser(this.currentUserId, data);

    // this.db
    //   .object(path)
    //   .update(data)
    //   .catch(error => console.log(error));
  }

  signUp(user: Credentials, userData: User): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(
        res => {
          this.authState = res;
          console.log(res);

          userData.status = 'online';
          userData.uid = res.user.uid;
          this.setUserData(user, userData);
          resolve(res);
        },
        err => reject(err)
      );
    });
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.user.uid : '';
  }

  setUserData(creds: Credentials, userData: User): void {
    const data: User = {
      email: creds.email,
      username: userData.username,
      status: userData.status,
      uid: userData.uid
    };

    this.userService.addUser(data);
  }
}
