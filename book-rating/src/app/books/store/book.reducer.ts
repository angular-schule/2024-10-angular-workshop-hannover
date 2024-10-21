import { createFeature, createReducer, on } from '@ngrx/store';
import { BookActions } from './book.actions';
import { Book } from '../shared/book';

export const bookFeatureKey = 'book';

export interface State {
  books: Book[],
  loading: boolean
}

export const initialState: State = {
  books: [],
  loading: false,
  // currentBook
};

export const reducer = createReducer(
  initialState,

  on(BookActions.loadBooks, state => ({
    ...state,
    loading: true
  })),

  on(BookActions.loadBooksSuccess, (state, { books }) => ({
    ... state,
    loading: false,
    books
  })),

  on(BookActions.loadBooksFailure, state => ({
    ...state,
    loading: false,
    books: []
  }))
);

export const bookFeature = createFeature({
  name: bookFeatureKey,
  reducer,
});



// type x = `${ typeof bookFeatureKey } Success`
