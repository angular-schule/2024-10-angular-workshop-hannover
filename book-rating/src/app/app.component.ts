import { Component } from '@angular/core';
import { DashboardComponent } from './books/dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookActions } from './books/store/book.actions';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [DashboardComponent, RouterOutlet]
})
export class AppComponent {
  title = 'Book Rating';


  constructor(store: Store) {
    store.dispatch(BookActions.loadBooks());
    // store.dispatch(BookActions.loadBooks());
  }
}
