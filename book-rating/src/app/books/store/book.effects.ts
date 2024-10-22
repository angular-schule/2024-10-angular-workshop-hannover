import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStoreService } from '../shared/book-store.service';
import { Store } from '@ngrx/store';
import { getBookByIsbn } from './book.selectors';


@Injectable()
export class BookEffects {

  bs = inject(BookStoreService);
  store = inject(Store);

  loadBooks$ = createEffect(() => {
    return inject(Actions).pipe(

      ofType(BookActions.loadBooks),
      switchMap(() =>
        this.bs.getAllBooks().pipe(
          map(books => BookActions.loadBooksSuccess({ books })),
          catchError(error => of(BookActions.loadBooksFailure({ error }))))
      )
    );
  });

  createBooks$ = createEffect(() => {
    return inject(Actions).pipe(

      ofType(BookActions.create),
      mergeMap(({ book }) =>
        this.bs.createBook(book).pipe(
          map(() => BookActions.createBooksSuccess()),
          // concatMap(() => [
          //   BookActions.createBooksSuccess(),
          //   BookActions.loadBooks(),
          // ]),
          catchError(error => of(BookActions.createBooksFailure({ error }))))
      )
    );
  });

  updateBook$ = createEffect(() => {
    return inject(Actions).pipe(

      ofType(BookActions.rateUp, BookActions.rateDown),
      // TODO: wie mit Parameter!
      withLatestFrom(this.store.select(getBookByIsbn('??'))),
      mergeMap(([action, book]) =>

        this.bs.updateBook(book!).pipe(
          map(() => BookActions.createBooksSuccess()),
          catchError(error => of(BookActions.createBooksFailure({ error }))))
      )
    );
  });
}
