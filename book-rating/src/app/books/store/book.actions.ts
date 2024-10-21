import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const BookActions = createActionGroup({
  source: 'Book',
  events: {
    'Load Books': emptyProps(),
    'Load Books Success': props<{ data: unknown }>(),
    'Load Books Failure': props<{ error: unknown }>(),
  }
});
