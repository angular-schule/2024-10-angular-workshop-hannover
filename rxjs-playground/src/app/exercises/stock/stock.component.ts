import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EMPTY, Observable, Subject, filter, map, scan, tap, withLatestFrom } from 'rxjs';

import { StockService } from './stock.service';
import { AsyncPipe, DecimalPipe, CurrencyPipe, DatePipe } from '@angular/common';

interface StockPurchase {
  date: number;   // Zeitstempel
  amount: number; // gekaufte Menge
  rate: number;   // Kurs zum Zeitpunkt des Kaufs
  total: number;  // Gesamtpreis
}

@Component({
  templateUrl: './stock.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, DecimalPipe, CurrencyPipe, DatePipe]
})
export class StockComponent {

  form = new FormGroup({ amount: new FormControl(0, { nonNullable: true }) });
  purchasesList$: Observable<StockPurchase[]>;

  goldRate$ = this.stock.goldRate$;      // Wechselkurs
  buyAction$ = new Subject<number>();    // Kaufaktionen mit Kaufmenge
  purchases$: Observable<StockPurchase> = EMPTY; // Ergebnisse: Datenstrom von Käufen mit allen Metadaten


  constructor(private stock: StockService) {
    /**
     * Wir bauen eine Anwendung zum Kauf von Gold!
     * Das heiße Observable `this.goldRate$` liefert immer den aktuellen Wechselkurs.
     * Mit dem Formular kannst Du Kaufaktionen auslösen.
     * `this.buyActions$` emittiert bei jedem Kauf die gewünschte Kaufmenge als Zahl.
     *
     * Baue einen Datenstrom, der vollständige Käufe mit allen Metadaten ausgibt.
     * Die Metadaten werden durch das Interface `StockPurchase` definiert.
     * Die Ergebnisse sollen in `this.purchases$` ausgegeben werden.
     *
     * Käufe mit einer Menge von 0 sollen ignoriert werden.
     */

    /******************************/

    this.purchases$ = this.buyAction$.pipe(

      filter(amount => amount !== 0),
      withLatestFrom(this.goldRate$),
      map(([feinUnzen, rate]) => ({
        feinUnzen,
        rate
      })),
      map(({ feinUnzen, rate }) => ({
        date: Date.now(),
        amount: feinUnzen,
        rate,
        total: feinUnzen * rate
      })),
      tap(console.log)
    )


    /******************************/


    this.purchasesList$ = this.purchases$.pipe(
      // scan((acc, item) => [item, ...acc.slice(0, 9)], [] as StockPurchase[]));
      scan((acc, item) => [item, ...acc], [] as StockPurchase[]));

  }

  buy() {
    this.buyAction$.next(this.getAmount());
  }

  getAmount() {
    return this.form.get('amount')?.value ?? 0;
  }

}
