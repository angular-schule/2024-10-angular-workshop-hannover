import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { DashboardComponent } from './dashboard.component';
import { BookStoreService } from '../shared/book-store.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    // 1. Strategie fürs Arrange -- alle Abhängigkeiten durch etwas ersetzen, das ich erzeugt habe
    const bookRatingMock = {
      rateUp: (book: Book) => book
    };

    const bookStoreMock = {
      getAllBooks: () => of([{ isbn: '', title: 'Hallo Hannover', description: '', rating: 5, price: 1 } as Book])
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

  // Prüfung ob dieser Wert im Array zu finden ist
  it('should show the title of the books', () => {
    expect(component.books()[0].title).toBe('Hallo Hannover');
  });

  // Wir prüfen auch noch einmal das HTML, ob der Wert wirklich gebunden
  // Frage: Wollen wir Bindings Prüfen??
  // Mögliche Antwort: Nein, wir Prüfen keine Bindings in unserem Projekt ---> DANN bitte e2e als Ergänzung
  // Mögliche Antwort: Ja, dann so:
  it('should show the title of the books', () => {
    expect(fixture.nativeElement.querySelector('h2')?.textContent).toContain('Hallo Hannover');
  });
});
