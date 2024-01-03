import { Component, Input } from '@angular/core';
import { Record } from 'src/app/shared/domain/record';
import * as $ from 'jquery';
import { CurrenciesService } from 'src/app/currencies/services/currencies.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Entry } from 'src/app/shared/domain/entry';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent {
  @Input() record: Record = {
    title: '',
    credit: [],
    debit: [],
    resultCurrency: {
      name: '',
      value: 0,
      symbol: '',
      canBeDeleted: false
    }
  }

  public nameDebit: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(128)
  ]);
  public costDebit: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);
  public currencyDebit: FormControl = new FormControl('', [
    Validators.required
  ]);
  public nameCredit: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(128)
  ]);
  public costCredit: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);
  public currencyCredit: FormControl = new FormControl('', [
    Validators.required
  ]);

  public debitForm: FormGroup = new FormGroup({
    nameDebit: this.nameDebit,
    costDebit: this.costDebit,
    currencyDebit: this.currencyDebit
  });
  public creditForm: FormGroup = new FormGroup({
    nameCredit: this.nameCredit,
    costCredit: this.costCredit,
    currencyCredit: this.currencyCredit
  });

  constructor(public currenciesService: CurrenciesService) { }

  public toggle(panel: HTMLElement, chevron: HTMLElement): void {
    $(panel).slideToggle();
    let chevronEl = $(chevron);
    chevronEl.animate({
      'rotate': chevronEl.css('rotate') === '180deg' ? '0deg' : '180deg'
    })
  }
  public changeResultCurrency(resultCurrencySelect: HTMLSelectElement): void {
    const currency = this.currenciesService.currencies.filter(v => v.name === resultCurrencySelect.value)[0];
    this.record.resultCurrency = currency;
  }
  public addDebit(): boolean {
    if (this.debitForm.invalid) 
    {
      this.debitForm.markAllAsTouched();
      this.nameDebit.markAsDirty();
      this.costDebit.markAsDirty();
      this.currencyDebit.markAsDirty();

      return false;
    }

    const debitEntry: Entry = {
      name: this.nameDebit.value,
      count: this.costDebit.value,
      currency: this.currenciesService.currencies.filter(v => v.name === this.currencyDebit.value)[0]
    };
    this.record.debit.push(debitEntry);

    this.clearDebit();

    return false;
  }
  public removeDebit(debit: Entry) {
    var newDebit = this.record.debit.filter(v => v != debit);
    this.record.debit = newDebit;
  }
  public clearDebit(): boolean {
    this.nameDebit.setValue('');
    this.nameDebit.markAsUntouched();

    this.costDebit.setValue('');
    this.costDebit.markAsUntouched();

    this.currencyDebit.setValue('');
    this.currencyDebit.markAsUntouched();

    return false;
  }
  public addCredit(): boolean {
    if (this.creditForm.invalid) 
    {
      this.creditForm.markAllAsTouched();
      this.nameCredit.markAsDirty();
      this.costCredit.markAsDirty();
      this.currencyCredit.markAsDirty();

      return false;
    }

    const creditEntry: Entry = {
      name: this.nameCredit.value,
      count: this.costCredit.value,
      currency: this.currenciesService.currencies.filter(v => v.name === this.currencyCredit.value)[0]
    };
    this.record.credit.push(creditEntry);

    this.clearCredit();

    return false;
  }
  public removeCredit(credit: Entry) {
    var newCredit = this.record.credit.filter(v => v != credit);
    this.record.credit = newCredit;
  }
  public clearCredit(): boolean {
    this.nameCredit.setValue('');
    this.nameCredit.markAsUntouched();

    this.costCredit.setValue('');
    this.costCredit.markAsUntouched();

    this.currencyCredit.setValue('');
    this.currencyCredit.markAsUntouched();

    return false;
  }
  public calculateResult(): number {
    const resCurr = this.record.resultCurrency;
    
    const debitMap = this.record.debit.map(v => {
      if (resCurr.name == v.currency.name) {
        return v.count * 1;
      } else {
        return v.count * (v.currency.value / resCurr.value)
      }
    });
    const debitTotal = debitMap.length > 0 ? debitMap.reduce((s, c) => s + c) : 0;
    
    const creditMap = this.record.credit.map(v => {
      if (resCurr.name == v.currency.name) {
        return v.count;
      } else {
        return v.count * (v.currency.value / resCurr.value)
      }
    });
    const creditTotal = creditMap.length > 0 ? creditMap.reduce((s, c) => s + c) : 0;

    return debitTotal - creditTotal;
  }
}
