import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from './currency/currency.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { AddCurrencyComponent } from './add-currency/add-currency.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CurrencyComponent,
    CurrencyListComponent,
    AddCurrencyComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CurrencyComponent
  ]
})
export class CurrenciesModule { }
