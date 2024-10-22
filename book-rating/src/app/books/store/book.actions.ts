import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '../shared/book';
import { HttpErrorResponse } from '@angular/common/http';

export const BookActions = createActionGroup({
  source: 'Book',
  events: {
    'Load Books': emptyProps(),
    'Load Books Success': props<{ books: Book[] }>(),
    'Load Books Failure': props<{ error: HttpErrorResponse }>(),

    'Create': props<{ book: Book }>(),
    'Create Books Success': emptyProps(),
    'Create Books Failure': props<{ error: HttpErrorResponse }>(),

    'Rate Up': props<{ book: Book }>(),
    'Rate Down': props<{ book: Book }>(),

    'Update Success': props<{ book: Book }>(),
    'Update Failure': props<{ error: HttpErrorResponse }>(),
  }
});
