import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicine } from 'src/app/model/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  constructor(private http: HttpClient) {}

  getMedicine() {
    return this.http.get<Medicine[]>('http://localhost:3000/');
  }
}
