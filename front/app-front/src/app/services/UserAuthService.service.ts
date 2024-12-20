import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registerUser(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, { username, password, email }).pipe(
      catchError((error: any) => {
        console.error('Registration error:', error);
        return throwError(error);
      })
    );
  }
}
function throwError(error: any): any {
  throw new Error('Function not implemented.');
}

