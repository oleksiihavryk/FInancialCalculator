import { Injectable } from '@angular/core';
import { Record } from 'src/app/shared/domain/record';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private innerRecords: Record[] = [];

  public get records(): Record[] {
    return this.innerRecords;
  }
  public get isHaveAnyRecord(): boolean {
    return this.innerRecords.length > 0;
  }

  constructor() { }

  public addRecord(record: Record): void
  {
    var newRecords = this.innerRecords.map(v => v);
    newRecords.push(record);
    this.innerRecords = newRecords;
  }
  public removeRecord(record: Record): void
  {
    var newRecords = this.innerRecords.filter(v => v != record);
    this.innerRecords = newRecords;
  }
}
