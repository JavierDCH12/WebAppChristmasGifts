import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent {

  username: string | null = localStorage.getItem('username');

  constructor(private router: Router) {}

  navigateTo(destination: string) {
    const validDestinations = ['recommendations/books', 'recommendations/games'];
    if (validDestinations.includes(destination)) {
      this.router.navigate([`/${destination}`]);
    } else {
      console.error('Invalid navigation destination');
    }
  }

  logout() {
    console.log('Logout clicked');
    localStorage.clear(); 
    this.router.navigate(['/login']); 
  }
}
