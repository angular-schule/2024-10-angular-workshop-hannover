import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';

import { Book } from '../shared/book';
import { BookFacadeService } from '../store/book-facade.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  imports: [CurrencyPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {

  bookFacade = inject(BookFacadeService)

  book = input.required<Book>();
  mwst = input(1.19);

  preisBrutto = computed(() => this.book().price * this.mwst());

  // rateUp = output<Book>();
  // rateDown = output<Book>();
  edit = output<Book>();

  doRateUp() {
    // this.rateUp.emit(this.book());
    this.bookFacade.doRateUp(this.book());
  }

  doRateDown() {
    // this.rateDown.emit(this.book());
    this.bookFacade.doRateDown(this.book());
  }
}
