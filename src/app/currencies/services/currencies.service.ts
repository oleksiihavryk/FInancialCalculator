import { Injectable } from '@angular/core';
import { Currency } from 'src/app/shared/domain/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private innerCurrencies: Currency[] = [
    {
      name: 'Dollar',
      value: 1,
      symbol: '$',
      canBeDeleted: false
    },
    {
      name: 'Hryvnia',
      value: 0.0265604,
      symbol: '₴',
      canBeDeleted: false
    }
  ];

  public get isHaveAny(): boolean {
    return this.innerCurrencies.length > 0;
  }
  public get currencies(): Currency[] {
    return this.innerCurrencies;
  }

  constructor() { }

  public addCurrency(currency: Currency): void
  {
    var newCurrencies = this.innerCurrencies.map(v => v);
    newCurrencies.push(currency);
    this.innerCurrencies = newCurrencies;
  }
  public removeCurrency(currency: Currency): void
  {
    var newCurrencies = this.innerCurrencies.filter(v => v != currency);
    this.innerCurrencies = newCurrencies;
  }
}
