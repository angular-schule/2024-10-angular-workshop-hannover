import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReplaySubject, timer } from 'rxjs';

import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './unsubscribe.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class UnsubscribeComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    const interval$ = timer(0, 1000);

    interval$.pipe(

      takeUntilDestroyed()

    ).subscribe({
      next: e => this.log(e),
      error: err => this.log('❌ ERROR: ' + err),
      complete: () => this.log('✅ COMPLETE')
    });
  }

  log(msg: string | number) {
    console.log(msg);
    this.logStream$.next(msg);
  }
}
