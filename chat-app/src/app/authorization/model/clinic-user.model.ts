import { UserType } from './user-type.enum';

export class ClinicUser {
  email: string;
  token: string;
  firstName: string;
  lastName: string;
  userType: UserType;
}
