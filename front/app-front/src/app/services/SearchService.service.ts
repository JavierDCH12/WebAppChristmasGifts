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
  private baseUrl = `${environment.apiUrl}/api/search`;

  constructor(private http: HttpClient) {}

  searchBooks(title: string = '', author: string = '', category: string = ''): Observable<any> {
    let params = new HttpParams();
    
    if (title) params = params.set('title', title);
    if (author) params = params.set('author', author);
    if (category) params = params.set('category', category);
  
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
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
