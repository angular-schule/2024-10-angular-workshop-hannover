import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {

  getData(): Observable<string> {
    const errMsg = 'Oh no! ERROR ❌';
    const successMsg = 'DATA ✅';

    return new Observable(subscriber => {
      if (Math.random() > 0.3) {
        console.error(errMsg);
        subscriber.error(errMsg);
      } else {
        console.log(successMsg);
        subscriber.next(successMsg);
      }
    });
  }
}
