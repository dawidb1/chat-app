import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  user: User;

  constructor(public afAuth: AngularFireAuth, private userService: UserService) {}

  signUp(user: User): Promise<any> {
    this.user = user;

    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(
        res => {
          this.setUserUid(res.user.uid);
          this.addUserDb();
          resolve(res);
        },
        err => reject(err)
      );
    });
  }

  setUserUid(uid: string) {
    this.user.uid = uid;
  }

  addUserDb() {
    this.userService.addUser(this.user);
  }
}
