import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../../model/user.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { UserStatus } from '../model/user-status.enum';
import { Routing } from 'src/app/model/routing.enum';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: User;
  firebaseUser$: Observable<firebase.User>;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    private userService: UserService,
    private router: Router
  ) {
    this.setFirebaseUser();
  }

  setFirebaseUser() {
    this.firebaseUser$ = this.afAuth.authState;
  }

  authUser() {
    return this.firebaseUser$;
  }

  authorize(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  setLoginUser() {
    return this.getLoggedInUser().pipe(
      map(res => {
        this.user = res;
        this.setUserStatus(UserStatus.ONLINE);
        this.router.navigate([Routing.CHAT]);
        console.log('getLoggedInUser subscription was called');
      })
    );
  }

  logout() {
    console.log('logout called');

    return this.getLoggedInUser().pipe(
      map(user => {
        this.user = user;
        this.setUserStatus(UserStatus.OFFLINE);
        this.afAuth.auth.signOut().then(x => {
          this.router.navigate([Routing.LOGIN]);
        });
      })
    );
  }

  getLoggedInUser() {
    return this.userService.getUserById(this.currentUserId);
  }

  private setUserStatus(status: UserStatus) {
    // this.getLoggedInUser().subscribe(user => {
    this.user.status = status;
    this.userService.updateUser(this.user);
  }

  get currentUserId(): string {
    const uid = this.afAuth.auth.currentUser.uid;
    console.log(uid);

    return uid;
  }
}
