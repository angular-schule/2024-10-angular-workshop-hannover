import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookActions } from './book.actions';
import { reducer, initialState } from './book.reducer';

describe('Book Reducer', () => {

  it('should set loading flag to `true` on loadBooks action', () => {
    const action = BookActions.loadBooks();
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

  const getMockBook = () => ({
    isbn: '123',
    title: 'Test Book',
    rating: 3,
    description: 'asdadasdsd',
    price: 10
  });

  it('should rate up a book and sort the list on rateUp', () => {
    const initialBooks: Book[] = [getMockBook()];
    const updatedBook: Book = BookRatingService.rateUp(getMockBook());

    const action = BookActions.rateUp({ book: getMockBook() });
    const state = reducer({ ...initialState, books: initialBooks }, action);
    expect(state.books[0].rating).toBe(updatedBook.rating);
    expect(state.books).toEqual([updatedBook]);
  });

  it('should add a new book on create', () => {
    const action = BookActions.create({ book: getMockBook() });
    const state = reducer(initialState, action);
    expect(state.books).toContain(getMockBook());
  });
});
