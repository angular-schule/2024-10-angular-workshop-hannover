import { Book } from '../shared/book';
import { BookActions } from './book.actions';
import { reducer, initialState } from './book.reducer';

describe('Book Reducer', () => {

  it('should set loading flag to `true` on loadBooks action', () => {
    const action =  BookActions.loadBooks();
    const newState = reducer(initialState, action);
    expect(newState.loading).toBeTrue();
  });

  it('should set books on loadBooksSuccess action', () => {

    const newBooks: Book[] = [];
    const action = BookActions.loadBooksSuccess({ books: newBooks });

    const oldState = {
      books: [],
      loading: true
    };

    // ODER
    // const oldState = reducer(initialState, BookActions.loadBooks());

    const newState = reducer(oldState, action);

    expect(newState.loading).toBeFalse();
    expect(newState.books).toBe(newBooks);
  });

  // Hands On (Gruppenarbeit):

  // 1. Teste den Reducer, der auf die create-Action reagiert
  // 2. Teste den Reducer, der auf die rateUp-Action reagiert

});
