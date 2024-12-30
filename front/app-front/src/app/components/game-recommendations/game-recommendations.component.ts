import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-game-recommendations',
  templateUrl: './game-recommendations.component.html',
  styleUrls: ['./game-recommendations.component.scss']
})
export class GameRecommendationsComponent implements OnInit {
  games: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/recommendations/games`).subscribe({
      next: (response: any) => {
        this.games = response.recommendations;
      },
      error: (error) => console.error('Error fetching games:', error)
    });
  }
}
