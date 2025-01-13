import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseUrl = `${environment.apiUrl}/api/search`;

  constructor(private http: HttpClient) {}

  searchBooks(book_title: string = '', book_author: string = '', book_category: string = ''): Observable<any> {
    const params = [];
    if (book_title) params.push(`title=${encodeURIComponent(book_title)}`);
    if (book_author) params.push(`author=${encodeURIComponent(book_author)}`);
    if (book_category) params.push(`subject=${encodeURIComponent(book_category)}`);

    const queryString = params.length ? `?${params.join('&')}` : '';
    const url = `${this.baseUrl}/books${queryString}`;

    return this.http.get(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  searchGames(query: string = '', limit: number = 10): Observable<any> {
    const url = `${this.baseUrl}/games?query=${encodeURIComponent(query)}&limit=${limit}`;
    return this.http.get(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error occurred during search:', error);
    return throwError(() => new Error('Search failed. Please try again later.'));
  }
}
