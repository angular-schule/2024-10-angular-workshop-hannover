import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBooks, selectBooksLoading } from './book.selectors';
import { Book } from '../shared/book';
import { BookActions } from './book.actions';

@Injectable({
  providedIn: 'root'
})
export class BookFacadeService {

  store = inject(Store);

  books = this.store.selectSignal(selectBooks);
  loading = this.store.selectSignal(selectBooksLoading);

  doRateUp(book: Book) {
    this.store.dispatch(BookActions.rateUp({ book }));
  }

  doRateDown(book: Book) {
    this.store.dispatch(BookActions.rateDown({ book }));
  }

  addBook(book: Book) {
    this.store.dispatch(BookActions.create({ book }));
  }
}
