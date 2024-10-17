import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  http = inject(HttpClient);

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('https://api.angular.schule/books')
      .pipe(map(books => books.map(b => { b.title = b.title.toUpperCase(); return b; })));
  }

  getSingleBook(isbn: string): Observable<Book> {
    return this.http.get<Book>('https://api.angular.schule/books/' + isbn /* + '/slow' */);
  }
}
