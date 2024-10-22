import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent - SpyOn', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  });

  // Prüfung ob dieser Wert im Array zu finden ist
  it('should show the title of the books', () => {

    // 3. Strategie -- Mit Spionen Antworten manipulieren
    const books: Book[] = [{ isbn: '', title: 'Hallo Hannover', description: '', rating: 5, price: 1 }];
    const bs = TestBed.inject(BookStoreService);
    spyOn(bs, 'getAllBooks').and.returnValue(of(books));


    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component.books()[0].title).toBe('Hallo Hannover');
  });
});
