import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { BookComponent } from '../book/book.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookFormComponent } from '../book-form/book-form.component';
import { switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectBooks, selectBooksLoading } from '../store/book.selectors';
import { BookActions } from '../store/book.actions';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [BookComponent, BookFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  // rs = inject(BookRatingService);
  // bs = inject(BookStoreService);
  store = inject(Store);

  // books = toSignal(this.bs.getAllBooks(), { initialValue: [] });
  // books = signal<Book[]>([]);
  currentBook = signal<Book | undefined>(undefined);


  books = this.store.selectSignal(selectBooks);
  loading = this.store.selectSignal(selectBooksLoading);


  constructor() {
    // this.bs.getAllBooks().subscribe(books => this.books.set(books))
  }

  zeigeEinBuchAn() {
    // alert(this.books()[0]?.title);
  }

  doRateUp(book: Book) {
    this.store.dispatch(BookActions.rateUp({ book }));
  }

  doRateDown(book: Book) {
    this.store.dispatch(BookActions.rateDown({ book }));
  }

  addBook(book: Book) {
    this.store.dispatch(BookActions.create({ book }));
  }

  changeToEditMode(book: Book) {
    // this.currentBook.set(book)
  }

  changeBook(changedBook: Book) {
    // this.updateAndSortList(changedBook);
    // this.currentBook.set(undefined);


    // this.bs.updateBook(changedBook).pipe(
    //   switchMap(_ => this.bs.getAllBooks()),
    // ).subscribe(books => this.books.set(books));
  }
}
