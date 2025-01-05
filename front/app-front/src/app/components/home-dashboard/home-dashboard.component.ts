// home-dashboard.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NAVIGATION_ROUTES, LOCAL_STORAGE_KEYS } from '../../utils/constants';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent {

  NAVIGATION_ROUTES = NAVIGATION_ROUTES;
  username: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME);

  constructor(private router: Router) {}

  navigateTo(destination: string) {
    const validDestinations = [
      NAVIGATION_ROUTES.RECOMMENDATIONS.BOOKS,
      NAVIGATION_ROUTES.RECOMMENDATIONS.GAMES
    ];
    
    if (validDestinations.includes(destination)) {
      this.router.navigateByUrl(destination); 
    } else {
      console.error('Invalid navigation destination');
    }
  }
  

  logout() {
    console.log('Logout clicked');
    localStorage.clear();
    this.router.navigate([NAVIGATION_ROUTES.LOGIN]);
  }
}
