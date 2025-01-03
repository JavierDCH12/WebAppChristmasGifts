import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

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
        tap((response: any) => {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('username', username);
        }),
        catchError((error: HttpErrorResponse) => {
            console.error('Login error:', error);
            return throwError(() => new Error(error.error.detail || 'Login failed.'));
        })
    );
}



  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return token ? !this.isTokenExpired(token) : false;
  }

  private isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const now = Math.floor(new Date().getTime() / 1000);
    return decoded.exp < now;
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
  
  

}  

  

