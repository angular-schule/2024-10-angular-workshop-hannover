import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  http = inject(HttpClient);

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('https://api.angular.schule/books');
  }

  getSingleBook(isbn: string): Observable<Book> {
    return this.http.get<Book>('https://api.angular.schule/books/' + isbn /* + '/slow' */);
  }
}
