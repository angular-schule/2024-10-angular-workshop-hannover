import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { BookComponent } from '../book/book.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookFormComponent } from '../book-form/book-form.component';

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

  updateAndSortList(ratedBook: Book) {

    /*
    const updatedBooks = this.books()
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating);

    this.books.set(updatedBooks);
    */

    // ODER update

    this.books.update(books => books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating));

    // TODO: Buch zum Server senden (Hausaufgabe)

  }
}
