import { Component } from '@angular/core';
import { SearchService } from '../../services/SearchService.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent {
  searchParams = { title: '', author: '', category: '' };
  results: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private searchService: SearchService) {}

  onSearch(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const { title, author, category } = this.searchParams;
    this.searchService.searchBooks(title, author, category).subscribe({
      next: (response) => {
        this.results = response.recommendations;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.errorMessage = 'Failed to fetch book recommendations.';
        this.isLoading = false;
      },
    });
  }
}
