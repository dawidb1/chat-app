import { UserType } from './user-type.enum';
import { Medicine } from 'src/app/model/medicine-list.model'

export class ClinicUser {
  email: string;
  token: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  Medicine_list: Medicine[];
}
