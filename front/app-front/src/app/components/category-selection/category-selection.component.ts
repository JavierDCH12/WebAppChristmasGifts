import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NAVIGATION_ROUTES } from '../../utils/constants';

@Component({
  selector: 'app-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.scss']
})
export class CategorySelectionComponent {
  constructor(private router: Router) { }

  selectCategory(category: string) {
    localStorage.setItem('selectedCategory', category);

    if (category === 'book_search') {
      this.router.navigate([NAVIGATION_ROUTES.SEARCH.BOOKS]);
    } else {
      this.router.navigate([`/recommendations/${category}`]);
    }
  }
}
