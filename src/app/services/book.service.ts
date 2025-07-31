// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Book } from '../models/book.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class BookService {
//   private apiUrl = 'http://localhost:3000/books';

//   constructor(private http: HttpClient) {}

//   getBooks(): Observable<Book[]> {
//     return this.http.get<Book[]>(this.apiUrl);
//   }

//   addBook(book: Book): Observable<Book> {
//     return this.http.post<Book>(this.apiUrl, book);
//   }

//   updateBook(id: number, book: Book): Observable<Book> {
//     return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
//   }

//   deleteBook(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`);
//   }

//   getBookById(id: number): Observable<Book> {
//     return this.http.get<Book>(`${this.apiUrl}/${id}`);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private liveApiUrl = 'https://taskeensadiq49--3000.local.webcontainer.io/books';
  private mockUrl = 'assets/books.json'; 

  constructor(private http: HttpClient) {}


  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.liveApiUrl).pipe(
      catchError(error => {
        console.warn('Replit API unreachable. Loading mock data instead.', error);
        return this.http.get<Book[]>(this.mockUrl);
      })
    );
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.liveApiUrl, book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.liveApiUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.liveApiUrl}/${id}`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.liveApiUrl}/${id}`);
  }
}
