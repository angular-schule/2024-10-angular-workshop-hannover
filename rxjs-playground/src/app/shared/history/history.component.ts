import {
  Component,
  OnInit,
  ElementRef,
  OnDestroy,
  signal,
  ChangeDetectionStrategy,
  input,
  viewChild,
} from '@angular/core';
import { Observable, Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'rxw-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit, OnDestroy {
  
  scrollContainer = viewChild.required<ElementRef>('scrollContainer');
  logStream = input.required<Observable<unknown>>();

  messages = signal<(string | number)[]>([]);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.logStream()
      .pipe(takeUntil(this.destroy$))
      .subscribe(m => {
        const message =
          typeof m === 'string' || typeof m === 'number'
            ? m
            : JSON.stringify(m);
        this.messages.update(msgs => [...msgs, message]);
      });

    this.logStream()
      .pipe(debounceTime(20), takeUntil(this.destroy$))
      .subscribe(() => this.updateScroll());
  }

  updateScroll() {
    const el = this.scrollContainer().nativeElement;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }

  clearHistory() {
    this.messages.set([]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
