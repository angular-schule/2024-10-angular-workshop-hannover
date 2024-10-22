import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BookEffects } from './book.effects';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BookEffects', () => {
  let actions$: Observable<any>;
  let effects: BookEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookEffects,
        provideMockActions(() => actions$),

        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    effects = TestBed.inject(BookEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
