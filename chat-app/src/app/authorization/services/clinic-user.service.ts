import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClinicUser } from '../model/clinic-user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClinicUserService {
  userUrl: string = environment.clinicServer + '/users';

  constructor(private http: HttpClient) {}

  getUserByToken(token: string) {
    const url = `${this.userUrl}/?token=${token}`;
    return this.http.get<ClinicUser>(url).pipe(map(x => x[0]));
  }
}
