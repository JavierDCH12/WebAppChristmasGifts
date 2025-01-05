import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode'; 

@Injectable({
  providedIn: 'root',
})
export class AccessAuthService {
  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return false;

    try {
      const decodedToken: any = jwtDecode(token); // Decode the token
      const isExpired = decodedToken.exp * 1000 < Date.now(); // Check expiration
      if (isExpired) {
        this.logout(); // Clear token if expired
        return false;
      }
      return true; // Token is valid and not expired
    } catch (error) {
      this.logout(); // Clear invalid token
      return false;
    }
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
