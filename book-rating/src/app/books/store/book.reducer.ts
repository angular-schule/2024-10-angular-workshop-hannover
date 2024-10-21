import { createFeature, createReducer, on } from '@ngrx/store';
import { BookActions } from './book.actions';

export const bookFeatureKey = 'book';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(BookActions.loadBooks, state => state),
  on(BookActions.loadBooksSuccess, (state, action) => state),
  on(BookActions.loadBooksFailure, (state, action) => state),
);

export const bookFeature = createFeature({
  name: bookFeatureKey,
  reducer,
});

