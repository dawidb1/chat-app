import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicine } from 'src/app/model/medicine-list.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NewMedicine } from 'src/app/model/new-medicine.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  url = environment.clinicServer;
  constructor(private http: HttpClient) {}

  addMedicine(med: Medicine) {
    return this.http.post(this.url+ '/newMedicines', med);
  }

  getNewMedicines(patientId: string):Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${this.url}/newMedicines?patientId='${patientId}`).pipe(map(x => {
      x.map((item => {
        const old: Medicine = {
              dosePerDay: item.dosePerDay,
              startDate: item.startDate,
              name: item.name,
              endDate: item.endDate,
              patientId: patientId
            };
            return old;
      }));
      return x;
    }))

    // .pipe(map((x) => {
    //   const old: Medicine = {
    //     dosePerDay: x.dosePerDay,
    //     startDate: x.startDate.toString(),
    //     name: x.name,
    //     endDate: x.endDate.toString(),
    //     patientId: patientId
    //   }
    //   return old;
    // }))
      
  }
}
