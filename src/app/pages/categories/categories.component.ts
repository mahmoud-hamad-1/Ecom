import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { icategories } from '../../shared/interfaces/icategories';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: icategories[] = [];
  private readonly categoriesService = inject(CategoriesService);

  ngOnInit(): void {
    this.getCategoriesData();
  }

  getCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories = res.data;
      },
      error: (err) => {
        console.log('Error fetching categories:', err);
      },
    });
  }

  trackById(index: number, category: icategories): string {
    return category._id;
  }
}
