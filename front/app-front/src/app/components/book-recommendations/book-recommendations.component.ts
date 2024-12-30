import { Component, OnInit } from '@angular/core';
import { RecommendationsService } from '../../services/Recommendations.service';

@Component({
  selector: 'app-book-recommendations',
  templateUrl: './book-recommendations.component.html',
  styleUrls: ['./book-recommendations.component.scss']
})
export class BookRecommendationsComponent implements OnInit {
  books: any[] = [];
  errorMessage: string | null = null;

  constructor(private recommendationsService: RecommendationsService) {}

  ngOnInit() {
    this.recommendationsService.getBookRecommendations().subscribe({
      next: (response: any) => {
        this.books = response.recommendations || [];
        this.errorMessage = this.books.length === 0 ? 'No recommendations found.' : null;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.errorMessage = 'Failed to load book recommendations.';
      }
    });
  }
}
