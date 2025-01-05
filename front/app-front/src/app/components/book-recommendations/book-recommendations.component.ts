import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NAVIGATION_ROUTES } from '../../utils/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-recommendations',
  templateUrl: './book-recommendations.component.html',
  styleUrls: ['./book-recommendations.component.scss'],
  imports: [CommonModule]
})
export class BookRecommendationsComponent implements OnInit {
  books: any[] = [];
  errorMessage: string | null = null;
  isLoading: boolean = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const apiUrl = `${environment.apiUrl}/api/recommendations/books`; 
    console.log(`Requesting URL: ${apiUrl}`);  
  
    this.http.get(apiUrl).subscribe({
      next: (response: any) => {
        this.books = response.recommendations;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.errorMessage = 'Error fetching book recommendations';
        this.isLoading = false;
      }
    });
  }

  navigateToHome() {
    this.router.navigate([NAVIGATION_ROUTES.HOME]);
  }
}