import { Component, OnInit } from '@angular/core';
import { AppPage } from 'e2e/src/app.po';
import { MEDICINES } from './mock-medicine';
import { Medicines } from 'src/app/model/medicine-list.model';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  medicines=MEDICINES;
  
  selectedMedicine: Medicines;

  
  onSelect(medicine: Medicines): void {
    this.selectedMedicine = medicine;
  }
  
}
