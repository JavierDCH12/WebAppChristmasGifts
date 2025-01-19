import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService, Book } from '../../services/SearchService.service';
import { NAVIGATION_ROUTES } from '../../utils/constants';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class BookSearchComponent {
  searchParams = { book_title: '', book_author: '', book_category: '' };
  results: Book[] = []; 
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private searchService: SearchService, private router: Router) {}

  onSearch(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const { book_title, book_author, book_category } = this.searchParams;

    this.searchService.searchBooks(book_title, book_author, book_category).subscribe({
      next: (response) => {
        console.log('Response from backend:', response);
        this.results = Array.isArray(response) ? response : response.results || [];
        this.isLoading = false;
        console.log('Processed Results:', this.results);

      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.errorMessage = 'Failed to fetch book results.';
        this.isLoading = false;
      },
    });
  }

  navigateToHome(): void {
    this.router.navigate([NAVIGATION_ROUTES.HOME]);
  }
}
