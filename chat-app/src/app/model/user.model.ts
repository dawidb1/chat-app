import { UserType } from '../authorization/model/user-type.enum';

export class User {
  id?: string;
  email: string;
  username: string;
  password?: string;

  firstName: string;
  lastName: string;

  userType: UserType;
  status: string;
  uid: string;

  info?: string;
}
