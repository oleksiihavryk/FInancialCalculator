import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BookService } from '../services/book.service';
import { Record } from 'src/app/shared/domain/record';
import { CurrenciesService } from 'src/app/currencies/services/currencies.service';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css']
})
export class CreateRecordComponent {
  public title: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(128)
  ]);
  
  public form: FormGroup = new FormGroup({
    title: this.title,
  });

  constructor(
    private bookService: BookService,
    private currenciesService: CurrenciesService) { }

  public create(): boolean {
    if (this.form.invalid) 
    {
      this.form.markAllAsTouched();
      this.title.markAsDirty();

      return false;
    }

    const oneValueCurrency = this.currenciesService.currencies.filter(v => v.value === 1)[0];

    const record: Record = {
      title: this.title.value,
      debit: [],
      credit: [],
      resultCurrency: oneValueCurrency
    }

    this.bookService.addRecord(record);
    this.clear();

    return false;
  }
  public clear(): boolean {
    this.title.setValue('');
    this.title.markAsUntouched();

    return false;
  }
}
