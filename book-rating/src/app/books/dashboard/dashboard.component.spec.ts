import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { DashboardComponent } from './dashboard.component';
import { BookStoreService } from '../shared/book-store.service';
import { of } from 'rxjs';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    // 1. Strategie -- alle Abhängigkeiten durch etwas ersetzen, das ich erzeugt habe
    const bookRatingMock = {
      rateUp: (book: Book) => book
    };

    const bookStoreMock = {
      getAllBooks: () => of([])
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{
        provide: BookRatingService,
        useValue: bookRatingMock
      },
      {
        provide: BookStoreService,
        useValue: bookStoreMock
      }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('TODO', () => {
    expect(true).toBeTruthy();
  });
});
