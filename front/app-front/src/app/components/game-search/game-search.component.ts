import { Component } from '@angular/core';
import { NAVIGATION_ROUTES } from '../../utils/constants';
import { Game, SearchService } from '../../services/SearchService.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class GameSearchComponent {
  searchParams = { game_name: '', game_genre: '', game_platform: '' };
  results: Game[] = []; 
  isLoading = false;
  errorMessage: string | null = null;

  // Declare and initialize searchType
  searchType: 'title' | 'genre' = 'title'; // Default to 'title'

  constructor(private searchService: SearchService, private router: Router) {}

  onSearch(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const { game_name, game_genre, game_platform } = this.searchParams;

    this.searchService.searchGames(game_name, game_genre, game_platform).subscribe({
      next: (response: Game[]) => { // Ensure TypeScript knows this is Game[]
        console.log('Response from backend:', response);
        this.results = response; // response is directly of type Game[]
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
