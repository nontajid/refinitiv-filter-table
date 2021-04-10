import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from './services/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'refinitiv-filter-table';
  catagories$: Observable<string[]>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.catagories$ = this.categoriesService.getCategories();
  }
}
