import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book/book.component';
import { CreateRecordComponent } from './create-record/create-record.component';
import { RecordsListComponent } from './records-list/records-list.component';
import { RecordComponent } from './record/record.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BookComponent,
    CreateRecordComponent,
    RecordsListComponent,
    RecordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    BookComponent
  ]
})
export class BookModule { }
