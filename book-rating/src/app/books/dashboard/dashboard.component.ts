import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { BookComponent } from '../book/book.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [NgFor, BookComponent, NgIf, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  // books = signal<Book[]>([]);
  rs = inject(BookRatingService);
  bs = inject(BookStoreService);

  books = toSignal(this.bs.getAllBooks(), { initialValue: [] });

  
  constructor() {
    // this.bs.getAllBooks().subscribe(books => this.books.set(books))
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
    // this.books = this.books
    //   .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
    //   .sort((a, b) => b.rating - a.rating);
  }
}
