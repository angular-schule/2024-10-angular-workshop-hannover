import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStoreService } from '../shared/book-store.service';
import { Store } from '@ngrx/store';
import { getBookByIsbn, selectBooks } from './book.selectors';
import { Book } from '../shared/book';


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

  // OPTION A
  //
  // Eine "selector factory" kann bei withLatestFrom nicht einsetzen.
  // Statt dessen suchen wir nach dem Buch direkt im Effect.
  updateBook$ = createEffect(() => {
    return inject(Actions).pipe(

      ofType(BookActions.rateUp, BookActions.rateDown),
      withLatestFrom(this.store.select(selectBooks)),
      map(([{ book }, books]) => books.find(b => b.isbn === book.isbn)),
      mergeMap(bookFromStore =>

        this.bs.updateBook(bookFromStore!).pipe(
          map(book => BookActions.updateSuccess({ book })),
          catchError(error => of(BookActions.createBooksFailure({ error }))))
      )
    );
  });


  // OPTION B
  //
  // Wir setzen einen "selector factory" ein (`getBookByIsbn`) und subscriben direkt auf den Selector
  /*
  updateBook$ = createEffect(() => {
    return inject(Actions).pipe(

      ofType(BookActions.rateUp, BookActions.rateDown),
      mergeMap(({ book }) =>
        this.store.select(getBookByIsbn(book.isbn)).pipe(

          mergeMap(bookFromStore =>

            this.bs.updateBook(bookFromStore!).pipe(
              map(book => BookActions.updateSuccess({ book })),
              catchError(error => of(BookActions.updateFailure({ error }))))
          )
        )
      )
    );
  });
  */
}
