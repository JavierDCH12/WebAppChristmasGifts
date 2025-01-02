import { Component, OnInit } from '@angular/core';
import { RecommendationsService } from '../../services/Recommendations.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-recommendations',
  templateUrl: './game-recommendations.component.html',
  styleUrls: ['./game-recommendations.component.scss'],
  imports: [CommonModule]
  
})
export class GameRecommendationsComponent implements OnInit {
  games: any[] = [];
  errorMessage: string | null = null;

  constructor(private recommendationsService: RecommendationsService) {}

  ngOnInit() {
    this.recommendationsService.getGameRecommendations().subscribe({
      next: (response: any) => {
        this.games = response.recommendations || [];
        this.errorMessage = this.games.length === 0 ? 'No recommendations found.' : null;
      },
      error: (error) => {
        console.error('Error fetching games:', error);
        this.errorMessage = 'Failed to load game recommendations.';
      }
    });
  }
}
