import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './components/history/history.component';
import { MedicineListComponent } from './components/medicine-list/medicine-list.component';
import { ImportModule } from '../shared/modules/import.module';
import { SharedModule } from '../shared/modules/shared.module';

@NgModule({
  declarations: [HistoryComponent, MedicineListComponent],
  imports: [CommonModule, ImportModule, SharedModule],
  exports: [MedicineListComponent]
})
export class PatientHistoryModule {}
