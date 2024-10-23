import { Component, inject } from '@angular/core';
import { Subject, ReplaySubject, Observable, map, mergeAll, mergeMap, concatMap, switchMap, exhaustMap } from 'rxjs';

import { HistoryComponent } from '../../shared/history/history.component';
import { EchoService } from './echo.service';

@Component({
  templateUrl: './higherorder.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class HigherorderComponent {

  logStream$ = new ReplaySubject<string>();
  private es = inject(EchoService);

  source$ = new Subject<string>();
  result$: Observable<string>;

  constructor() {

    /**
     * Löse für jedes Tier-Event im source$-Stream ein Echo aus.
     * Die Methode `this.es.echo()` gibt ein Observable zurück, das Echos produziert.
     * Probiere aus, wie sich concatMap, mergeMap, switchMap und exhaustMap unterschiedlich verhalten.
     *
     * Quelle: this.source$
     * Ziel:   this.result$
     * Echo:   this.es.echo(message)
     */

    /**************!!**************/

    this.result$ = this.source$.pipe(
      map(e => this.es.echo(e)),
      mergeAll()
    );

    /**************!!**************/

    this.source$.subscribe(value => this.logStream$.next(`📣 SOURCE: ${value}`));
    this.result$.subscribe(value => this.logStream$.next(`🚀 RESULT: ${value}`));
  }

  echoTest() {
    this.es.echo('TEST').subscribe(value => this.logStream$.next(value));
  }

  sendValue(value: string) {
    this.source$.next(value);
  }

}
