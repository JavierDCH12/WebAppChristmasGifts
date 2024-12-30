import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category-selection',
  imports: [],
  templateUrl: './category-selection.component.html',
  styleUrl: './category-selection.component.scss'
})
export class CategorySelectionComponent {
  constructor(private router:Router) { }

  selectCategory(category: string) {
    localStorage.setItem('selectedCategory', category);

    this.router.navigate([`/recommendations/${category}`]);
  }


}
