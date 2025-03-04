import { Brand } from './../../shared/interfaces/Icart/icart';
import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/Brands/brands.service';
import { Ibrands } from '../../shared/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
 brands:Ibrands[]=[]
  private readonly brandsService = inject(BrandsService);
  ngOnInit(): void {
    this.getBrandsData();
  }
  getBrandsData(): void {
    this.brandsService.getALLBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brands = res.data;
      },
      error: (err) => {
        console.log('Error fetching categories:', err);
      },
    });
  }
   trackById(index: number, brands: Ibrands): string {
      return brands._id ;
    }
}
