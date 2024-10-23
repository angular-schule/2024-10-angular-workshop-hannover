import { Component, inject, signal } from '@angular/core';
import { TypeaheadService } from './typeahead.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, mergeAll, of, startWith, switchMap, tap } from 'rxjs';
import { Book } from './book';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';

interface State {
  books: Book[],
  loading: boolean,
  lastError: string | undefined
}

const initalState: State = {
  books: [],
  loading: false,
  lastError: undefined
}

@Component({
  templateUrl: './typeahead.component.html',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class TypeaheadComponent {

  private ts = inject(TypeaheadService);
  searchControl = new FormControl('', { nonNullable: true });

  // OPTION A
  state$ = toSignal(this.searchControl.valueChanges.pipe(

    debounceTime(500),
    distinctUntilChanged(),

    switchMap(term => this.ts.search(term).pipe(
      map(books => ({
        books,
        loading: false,
        lastError: undefined
      })),
      catchError((error: HttpErrorResponse) => of({
        books: [],
        loading: false,
        lastError: error.message
      })),
      startWith(initalState)
    )),
  ), {
    initialValue: initalState
  });

  // OPTION B
  /*

  results = signal<Book[]>([]);
  loading = signal(false);

  searchInput$.pipe(
    debounceTime(1000),
    distinctUntilChanged(),
    tap(() => this.loading.set(true)),
    switchMap(term => this.ts.search(term)),
    tap(() => this.loading.set(false)),
  ).subscribe(results => this.results.set(results));
  */


  // OPTION C: Resource API ab Angular 19

  formatAuthors(authors: string[]) {
    return Array.isArray(authors) ? authors.join(', ') : '';
  }
}
