import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getBookRecommendations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/recommendations/books`).pipe(
      retry(3), // Reintenta hasta 3 veces
      catchError((error) => {
        console.error('Error fetching books:', error);
        return throwError(() => new Error('Failed to fetch books'));
      })
    );
  }


}

