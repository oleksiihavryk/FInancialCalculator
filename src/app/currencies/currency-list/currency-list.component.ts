import { Component } from '@angular/core';
import { CurrenciesService } from '../services/currencies.service';
import { Currency } from 'src/app/shared/domain/currency';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent {
  public modalId: string = 'DeleteCurrencyModalId';
  public deletingCurrency: Currency = {
    name: '',
    value: 0,
    symbol: '',
    canBeDeleted: true
  };

  constructor(
    public currenciesService: CurrenciesService,
    public modal: ModalService) { }

  public removeAsQuestion(currency: Currency) {
    this.modal.toggleModal(this.modalId);
    this.deletingCurrency = currency;
  }
  public createRemoveAction(): () => void {
    return () => {
      this.currenciesService.removeCurrency(this.deletingCurrency);
    }
  }
}
