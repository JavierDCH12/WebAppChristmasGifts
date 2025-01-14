import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/SearchService.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NAVIGATION_ROUTES } from '../../utils/constants';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
  imports: [CommonModule, FormsModule]
})


export class BookSearchComponent {
  searchParams = { book_title: '', book_author: '', book_category: '' };
  results: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  constructor(private searchService: SearchService, private router: Router) {}

  onSearch(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const { book_title, book_author, book_category } = this.searchParams;
    this.searchService.searchBooks(book_title, book_author, book_category).subscribe({
      next: (response) => {
        //this.results = response.recommendations;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.errorMessage = 'Failed to fetch book recommendations.';
        this.isLoading = false;
      },
    });
  }


  navigateToHome() {
      this.router.navigate([NAVIGATION_ROUTES.HOME]);
    }
}
