import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-book-recommendations',
  templateUrl: './book-recommendations.component.html',
  styleUrls: ['./book-recommendations.component.scss']
})
export class BookRecommendationsComponent implements OnInit {
  books: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/recommendations/books`).subscribe({
      next: (response: any) => {
        this.books = response.recommendations;
      },
      error: (error) => console.error('Error fetching books:', error)
    });
  }
}
