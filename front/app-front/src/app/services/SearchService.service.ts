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

  searchBooks(title: string = '', author: string = '', category: string = ''): Observable<any> {
    const params = [];
    if (title) params.push(`title=${encodeURIComponent(title)}`);
    if (author) params.push(`author=${encodeURIComponent(author)}`);
    if (category) params.push(`subject=${encodeURIComponent(category)}`);

    const queryString = params.join('&');
    const url = `${this.baseUrl}/books?${queryString}`;
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
