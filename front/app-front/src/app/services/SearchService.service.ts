import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retryWhen, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Book {
  title: string;
  author: string;
  category: string[];
  publish_year: string | number;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseUrl = `${environment.apiUrl}/search`;

  constructor(private http: HttpClient) {}

  searchBooks(q: string = '', title: string = '', author: string = '', page: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('page', page);
  
    if (q) params = params.set('q', q);
    if (title) params = params.set('title', title);
    if (author) params = params.set('author', author);
  
    const url = `${this.baseUrl}/book`; 
  
    return this.http.get<any>(url, { params }).pipe(
      retryWhen(errors => 
        errors.pipe(
          mergeMap((error, attempt) => {
            if (attempt >= 3 || error.status >= 500) {
              return throwError(() => error);
            }
            return timer(1000); 
          })
        )
      ),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
  console.error('Error occurred during search:', error);

  if (error.error instanceof ErrorEvent) {
    return throwError(() => new Error('Network error. Please check your connection.'));
  }

  switch (error.status) {
    case 400:
      return throwError(() => new Error('Invalid request. Please check your input.'));
    case 404:
      return throwError(() => new Error('No results found. Try modifying your search query.'));
    case 500:
      return throwError(() => new Error('Server error. Please try again later.'));
    default:
      return throwError(() => new Error('An unexpected error occurred. Please try again.'));
  }
}

}
