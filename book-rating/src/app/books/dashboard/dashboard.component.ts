import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { BookFormComponent } from '../book-form/book-form.component';
import { BookComponent } from '../book/book.component';
import { Book } from '../shared/book';
import { BookFacadeService } from '../store/book-facade.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [BookComponent, BookFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  currentBook = signal<Book | undefined>(undefined);

  bookFacade = inject(BookFacadeService);

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
