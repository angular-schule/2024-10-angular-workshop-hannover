import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { merge, Observable, of, timer, catchError, concatMap, filter, map, scan, shareReplay, startWith, timeout } from 'rxjs';

import { generateRandomInt } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private http = inject(HttpClient);

  readonly goldRate$ = this.getRealCurrentRate().pipe(
    concatMap(rate => this.variation$.pipe(startWith(rate))),
    scan((acc, item) => acc + item),
    shareReplay(1)
  );

  private variation$ = merge(
    timer(generateRandomInt(1000, 5000), generateRandomInt(3800, 5000)).pipe(map(() => generateRandomInt(-500, 500) / 100)),
    timer(generateRandomInt(800, 2000), generateRandomInt(3800, 4500)).pipe(map(() => generateRandomInt(1, 100) / 100))
  );

  private getRealCurrentRate(): Observable<number> {
    return this.http.get<{ 'pax-gold'?: any }>('https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=eur').pipe(
      map(res => res['pax-gold']?.eur),
      filter(e => !!e),
      timeout(1000),
      catchError(() => of(1400.50))
    );
  }

}
