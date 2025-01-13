import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
      this.router.navigate(['/book-search']);
    } else {
      this.router.navigate([`/recommendations/${category}`]);
    }
  }
}
