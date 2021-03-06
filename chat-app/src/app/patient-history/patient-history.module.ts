import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './components/history/history.component';
import { MedicineListComponent } from './components/medicine-list/medicine-list.component';
import { ImportModule } from '../shared/modules/import.module';
import { SharedModule } from '../shared/modules/shared.module';
import { MedicineDialogComponent } from './components/medicine-dialog/medicine-dialog.component';
import { AddMedicineDialogComponent } from './components/add-medicine-dialog/add-medicine-dialog.component';
import {MyMaterialModule} from '../shared/modules/material.module';



@NgModule({
  declarations: [HistoryComponent, MedicineListComponent, MedicineDialogComponent, AddMedicineDialogComponent],
  imports: [CommonModule, ImportModule, SharedModule,MyMaterialModule],
  exports: [MedicineListComponent,HistoryComponent],
  entryComponents: [MedicineDialogComponent, AddMedicineDialogComponent]
})
export class PatientHistoryModule {}
