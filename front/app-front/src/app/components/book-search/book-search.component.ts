import { Component, NgModule } from '@angular/core';
import { SearchService } from '../../services/SearchService.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
  imports: [CommonModule, BrowserModule, FormsModule]
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
