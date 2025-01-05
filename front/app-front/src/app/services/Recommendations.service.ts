import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { NAVIGATION_ROUTES } from '../utils/constants';


@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getBookRecommendations(): Observable<any> {
    const apiUrl = `${this.baseUrl}/api/recommendations/books`;
    console.log(`Requesting URL: ${apiUrl}`); 
    return this.http.get(apiUrl).pipe(
      retry(3),
      catchError((error) => {
        console.error('Error fetching books:', error);
        return throwError(() => new Error('Failed to fetch books'));
      })
    );
  }
  
  

  getGameRecommendations(): Observable<any> {
    const apiUrl = `${this.baseUrl}/api/recommendations/games`;
    console.log(`Requesting URL: ${apiUrl}`); 
    return this.http.get(apiUrl).pipe(
      retry(3),
      catchError((error) => {
        console.error('Error fetching videogames:', error);
        return throwError(() => new Error('Failed to fetch videogames'));
      })
    );
  }
  


}

