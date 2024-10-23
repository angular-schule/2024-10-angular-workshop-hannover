import { Component, inject, signal } from '@angular/core';
import { TypeaheadService } from './typeahead.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, mergeAll, switchMap, tap } from 'rxjs';
import { Book } from './book';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  templateUrl: './typeahead.component.html',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class TypeaheadComponent {

  private ts = inject(TypeaheadService);

  searchControl = new FormControl('', { nonNullable: true });
  loading = signal(false);

  searchInput$ = this.searchControl.valueChanges;
  results = toSignal(this.searchInput$.pipe(

    debounceTime(500),
    distinctUntilChanged(),

    tap(() => this.loading.set(true)),
    switchMap(term => this.ts.search(term)),
    tap(() => this.loading.set(false)),
  ), { initialValue: [] })

  formatAuthors(authors: string[]) {
    return Array.isArray(authors) ? authors.join(', ') : '';
  }

}
