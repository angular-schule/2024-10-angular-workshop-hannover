import { Component } from '@angular/core';
import { Subject, Observable, debounceTime, throttleTime, auditTime, sampleTime } from 'rxjs';

import { HistoryComponent } from '../../shared/history/history.component';
import { generateRandomString } from '../../shared/utils';

@Component({
  templateUrl: './ratelimiting.component.html',
  styleUrls: ['./ratelimiting.component.scss'],
  standalone: true,
  imports: [HistoryComponent]
})
export class RatelimitingComponent {

  readonly scrollContent = new Array(100);
  events$ = new Subject<string>();

  result$: Observable<string>;

  constructor() {
    /**
     * Durch Scrollen und Buttonklicks werden Events erzeugt.
     *
     * Begrenze die Zahl der ausgegebenen Events mit einem Rate Limiting Operator.
     * - debounceTime: nach Ablauf einer PAUSE den letzten Wert entnehmen
     * - throttleTime: Wert sofort entnehmen, Quelle dann für eine bestimmte Zeit ignorieren
     * - auditTime: bei Event die Quelle überwachen, nach bestimmter Zeit Wert entnehmen
     * - sampleTime: periodisch Werte entnehmen (sofern vorhanden)
     */

    /**************!!**************/

    this.result$ = this.events$.pipe(
    );

    /**************!!**************/
  }

  emitRandomString() {
    const newRandom = generateRandomString();
    this.events$.next(newRandom);
  }

  emitScrollEvent(e: Event) {
    const timestamp = Math.floor(e.timeStamp);
    this.events$.next('SCROLL ' + timestamp);
  }


}
