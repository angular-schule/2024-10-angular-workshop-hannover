import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent HttpMock', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    // 2. Strategie fürs Arrange -- Low Level APIs ersetzen (Http und Routing)
    // "brutal" durch alle Schichten durch (YOLO)

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prüfung ob dieser Wert im Array zu finden ist
  it('should show the title of the books', () => {

    const httpMock = TestBed.inject(HttpTestingController);

    // Request aus der Warteschlange holen
    const req = httpMock.expectOne('https://api.angular.schule/books');
    req.flush([{ isbn: '111',  title: 'Hallo Hannover', description: 'Test', rating: 1, price: 1 }]);

    expect(component.books()[0].title).toBe('HALLO HANNOVER');
  });

});
