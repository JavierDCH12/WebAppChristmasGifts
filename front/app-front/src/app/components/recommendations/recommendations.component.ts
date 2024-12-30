import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookRecommendationsComponent } from "../book-recommendations/book-recommendations.component";
import { GameRecommendationsComponent } from "../game-recommendations/game-recommendations.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recommendations',
  imports: [BookRecommendationsComponent, GameRecommendationsComponent, CommonModule],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss'
})
export class RecommendationsComponent implements OnInit {
  selectedCategory: string |null = null;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.selectedCategory = localStorage.getItem('selected_category');
    if (!this.selectedCategory) {
      this.router.navigate(['/select-category']); //Redirect if no category has been chosen
    }
  }

}
