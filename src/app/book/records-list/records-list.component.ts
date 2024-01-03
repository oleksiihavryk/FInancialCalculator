import { Component } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css']
})
export class RecordsListComponent {
  constructor(public bookService: BookService) { }
}
