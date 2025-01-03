import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
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
  isLoading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/recommendations/games`).subscribe({
      next: (response: any) => {
        this.games = response.recommendations;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching games:', error);
        this.errorMessage = 'Error fetching game recommendations';
        this.isLoading = false;
      }
    });
  }
}
