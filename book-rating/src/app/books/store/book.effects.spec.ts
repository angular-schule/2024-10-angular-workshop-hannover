import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { BookEffects } from './book.effects';
import { BookStoreService } from '../shared/book-store.service';
import { BookActions } from './book.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { hot, cold } from 'jasmine-marbles'; // npm i jasmine-marbles
import { Book } from '../shared/book';

describe('BookEffects', () => {
  let actions$: Observable<any>;
  let effects: BookEffects;
  let bookStoreService: jasmine.SpyObj<BookStoreService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookEffects,
        provideMockActions(() => actions$),
        {
          provide: BookStoreService,
          useValue: jasmine.createSpyObj('BookStoreService', ['getAllBooks'])
        }
      ]
    });

    effects = TestBed.inject(BookEffects);
    bookStoreService = TestBed.inject(BookStoreService) as jasmine.SpyObj<BookStoreService>;
  });

  it('should dispatch loadBooksSuccess on success', () => {
    const books = [{ } as Book];
    bookStoreService.getAllBooks.and.returnValue(of(books));

    actions$ = hot('--a', { a: BookActions.loadBooks() });
    const expected = cold('--b', { b: BookActions.loadBooksSuccess({ books }) });
    expect(effects.loadBooks$).toBeObservable(expected);
  });

  it('should dispatch loadBooksFailure on error', () => {
    const errorResponse = new HttpErrorResponse({ error: 'Error loading books' });
    bookStoreService.getAllBooks.and.returnValue(throwError(() => errorResponse));

    actions$ = hot('--a', { a: BookActions.loadBooks() });
    const expected = cold('--b', { b: BookActions.loadBooksFailure({ error: errorResponse }) });
    expect(effects.loadBooks$).toBeObservable(expected);
  });
});
