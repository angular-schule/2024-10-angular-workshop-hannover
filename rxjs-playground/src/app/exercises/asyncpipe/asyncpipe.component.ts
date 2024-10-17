import { Component } from '@angular/core';
import { timer, Observable, tap, scan } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  templateUrl: './asyncpipe.component.html',
  styles: ['.big-num {font-size: 120pt}'],
  standalone: true,
  imports: [AsyncPipe]
})
export class AsyncpipeComponent {

  result?: number;

  constructor() {

    /**
     * Verwende die AsyncPipe und verzichte auf den Einsatz von subscribe()!
     */

    /**************!!**************/

     timer(0, 700).pipe(                        
      scan((acc, item) => acc + item, 0),
      tap({
        next: e => console.log(e),
        complete: () => console.log('✅ COMPLETE')
      }),
     ).subscribe(e => this.result = e);         

    /**************!!**************/
  }

}
