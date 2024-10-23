import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { DashboardComponent } from './books/dashboard/dashboard.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [DashboardComponent, RouterOutlet, RouterLink]
})
export class AppComponent {
  title = 'Book Rating';
}
