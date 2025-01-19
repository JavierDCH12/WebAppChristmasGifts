import { Component } from '@angular/core';
import { NAVIGATION_ROUTES } from '../../utils/constants';
import { SearchService } from '../../services/SearchService.service';

@Component({
  selector: 'app-game-search',
  imports: [],
  templateUrl: './game-search.component.html',
  styleUrl: './game-search.component.scss'
})
export class GameSearchComponent {
  searchParams = { book_title: '', book_author: '', book_category: '' };
  results: Game[] = []; 
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private searchService: SearchService, private router: Router) {}

  onSearch(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const { book_title, book_author, book_category } = this.searchParams;

    this.searchService.searchGames(book_title, book_author, book_category).subscribe({
      next: (response) => {
        console.log('Response from backend:', response);
        this.results = Array.isArray(response) ? response : response.results || [];
        this.isLoading = false;
        console.log('Processed Results:', this.results);

      },
      error: (error) => {
        console.error('Error fetching games:', error);
        this.errorMessage = 'Failed to fetch game results.';
        this.isLoading = false;
      },
    });
  }

  navigateToHome(): void {
    this.router.navigate([NAVIGATION_ROUTES.HOME]);
  }
}

