import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerUser(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, { username, password, email }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Registration error:', error);
        return throwError(() => new Error(error.error.detail || 'Registration failed.'));
      })
    );
  }


  loginUser(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, { username, password }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error);
        // Devuelve el mensaje del backend o uno genérico
        return throwError(() => new Error(error.error.detail || 'Invalid username or password.'));
      })
    );
  }
  
  








}
