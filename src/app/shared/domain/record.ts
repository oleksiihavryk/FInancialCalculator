import { Currency } from "./currency";
import { Entry } from "./entry";

export interface Record {
    title: string
    debit: Entry[]
    credit: Entry[]
    resultCurrency: Currency
}
