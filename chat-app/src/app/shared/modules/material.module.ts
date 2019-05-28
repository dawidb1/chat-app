import { NgModule } from  '@angular/core';
import {MatNativeDateModule,MatIconModule,MatButtonModule,MatCheckboxModule, MatToolbarModule, MatCardModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatListModule,} from  '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
    imports: [MatDialogModule, MatNativeDateModule,MatIconModule,MatButtonModule,MatCheckboxModule, MatToolbarModule,FormsModule, MatCardModule,MatFormFieldModule,MatInputModule,MatListModule,MatRadioModule,],
    exports: [MatDialogModule, MatNativeDateModule,FormsModule,
        MatIconModule,MatButtonModule,MatCheckboxModule, MatToolbarModule, MatCardModule,MatFormFieldModule,MatInputModule,MatListModule,MatRadioModule,],

})

export  class  MyMaterialModule { }