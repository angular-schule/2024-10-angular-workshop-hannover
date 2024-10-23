/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EMPTY, catchError, map, of, retry, switchMap } from 'rxjs';

import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterLink, NgIf],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  bs = inject(BookStoreService);

  book$ = inject(ActivatedRoute).paramMap.pipe(
    map(paramMap => paramMap.get('isbn')!),
    switchMap(isbn => this.bs.getSingleBook(isbn).pipe(
      retry({
        count: 3,
        delay: 1000
      }),
      // catchError((e: HttpErrorResponse) => of({
      //   title: 'FEHLER',
      //   description: e.message
      // }))
      catchError((e: HttpErrorResponse) => EMPTY)
    ))
  );
}

export default BookDetailsComponent;
