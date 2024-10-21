import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { BookComponent } from '../book/book.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookFormComponent } from '../book-form/book-form.component';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [BookComponent, BookFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  rs = inject(BookRatingService);
  bs = inject(BookStoreService);

  //books = toSignal(this.bs.getAllBooks(), { initialValue: [] });
  books = signal<Book[]>([]);

  currentBook = signal<Book | undefined>(undefined);

  constructor() {
    this.bs.getAllBooks().subscribe(books => this.books.set(books))
  }

  zeigeEinBuchAn() {
    alert(this.books()[0]?.title);
  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateAndSortList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateAndSortList(ratedBook);
  }

  updateAndSortList(changedBook: Book) {
    this.books.update(books => books
      .map(b => b.isbn === changedBook.isbn ? changedBook : b)
      .sort((a, b) => b.rating - a.rating));

    // TODO: Buch zum Server senden (Hausaufgabe)
  }

  addBook(book: Book) {
    this.books.update(books => [...books, book]);
  }

  changeToEditMode(book: Book) {
    this.currentBook.set(book)
  }

  changeBook(changedBook: Book) {
    this.updateAndSortList(changedBook);
    this.currentBook.set(undefined);


    this.bs.updateBook(changedBook).pipe(
      switchMap(_ => this.bs.getAllBooks()),
    ).subscribe(books => this.books.set(books));
  }
}
