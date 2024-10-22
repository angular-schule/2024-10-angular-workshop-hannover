import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DashboardComponent } from './books/dashboard/dashboard.component';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from './books/store/book.reducer';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: '<h1>Dashboard</h1>',
})
export class DummyDashboardComponent { }

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule, // provideLocationMocks
        AppComponent
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    // .overrideComponent(AppComponent, {
    //   set: { imports: [], schemas: [NO_ERRORS_SCHEMA] }
    // })
    // Shallow Component Test
    .overrideComponent(AppComponent, {
      remove: { imports: [DashboardComponent] },
      add: { imports: [DummyDashboardComponent] }
    })
    .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Book Rating'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Book Rating');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    debugger;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Book Rating');
  });
});
