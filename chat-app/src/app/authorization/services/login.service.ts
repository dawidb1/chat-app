import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../../model/user.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { UserStatus } from '../model/user-status.enum';
import { Routing } from 'src/app/model/routing.enum';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authState: firebase.auth.UserCredential;
  user: User;
  authUid: string;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    private userService: UserService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(user => {
      this.authState = user;
      this.authUid = user.user.uid;

      this.getLoggedInUser().subscribe(res => {
        this.user = res;
        this.setUserStatus(UserStatus.ONLINE);
      });

      this.router.navigate([Routing.CHAT]);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.setUserStatus(UserStatus.OFFLINE);
  }

  private setUserStatus(status: UserStatus) {
    this.user.status = status;
    this.userService.updateUser(this.user);
  }

  getLoggedInUser() {
    const userId = this.currentUserId;
    const result = this.userService
      .getUsers()
      .pipe(map(users => users.filter(user => user.uid === this.currentUserId)));
    return result.pipe(map(users => users[0]));
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.user.uid : '';
  }
}
