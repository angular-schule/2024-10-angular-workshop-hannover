import { Injectable } from '@angular/core';
import { Observable, timer, take, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EchoService {

  echo(message: string, count = 5): Observable<string> {
    return timer(500, 700).pipe(
      take(count),
      map(i => `ECHO ${i + 1}: ${message}`)
    );
  }
}
