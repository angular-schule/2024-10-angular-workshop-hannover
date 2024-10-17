import { Injectable } from '@angular/core';
import { merge, timer, Observable, map, scan, tap, defer } from 'rxjs';

import { generateRandomInt } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class MeasureValuesService {

  private callCount = 0;

  private randomNumber() {
    return Math.random() * 4 - 2;
  }

  getValues(): Observable<number> {
    return defer(() => {
      this.callCount++;
      const currentCall = this.callCount;
      return merge(
        timer(0, generateRandomInt(3800, 5000)).pipe(map(() => this.randomNumber())),
        timer(generateRandomInt(800, 2000), generateRandomInt(3800, 4500)).pipe(map(() => this.randomNumber())),
        timer(generateRandomInt(1500, 3500), 7300).pipe(map(() => this.randomNumber()))
      ).pipe(
        scan((acc, item) => acc + item, 50 + Math.random()),
        tap(e => console.log(`MVS Subscription #${currentCall}: ${e}`))
      );
    });
  }
}
