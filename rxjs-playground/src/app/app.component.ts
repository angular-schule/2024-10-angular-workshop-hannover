import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'rxw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NavbarComponent, RouterLink, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private router = inject(Router);

  isLandingPage = toSignal(this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    map(() => this.router.isActive('/exercises', {
      paths: 'exact',
      matrixParams: 'ignored',
      queryParams: 'ignored',
      fragment: 'ignored',
    }))
  ));
}
