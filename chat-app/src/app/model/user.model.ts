import { UserType } from '../authorization/model/user-type.enum';

export class User {
  id?: string;
  email: string;
  username: string;
  password?: string;

  userType: UserType;
  status: string;
  uid: string;
}
