import { icategories } from './../../shared/interfaces/icategories';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Category } from './../../shared/interfaces/iproduct';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  viewChild,
} from '@angular/core';
import { ProdcutsService } from '../../core/services/prodcuts/prodcuts.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { log } from 'node:console';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  categories: icategories[] = [];
  productsIds: string[] = [];
  color: boolean = false;

  private readonly prodcutsService = inject(ProdcutsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  name: string = '';

  customMainSlidaer: OwlOptions = {
    loop: true,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-angles-left"></i>',
      '<i class="fa-solid fa-angles-right"></i>',
    ],
    items: 1,
    nav: false,
  };

  customOptions: OwlOptions = {
    loop: true,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-angles-left"></i>',
      '<i class="fa-solid fa-angles-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };
  ngOnInit(): void {
    this.getProductsData();
    this.getcategoriesData();
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const Ids = localStorage.getItem('productsIds');
      if (Ids) {
        this.productsIds = JSON.parse(Ids);
      }
    }
  }
  getProductsData(): void {
    this.prodcutsService.getALLProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getcategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(id: string): void {
    this.cartService.addProdutToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
          this.cartService.cartNumber.next(res.numOfCartItems);
          console.log(this.cartService.cartNumber.getValue());
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addWishList(id: string): void {
    this.wishlistService.addProd(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Fresh Cart');
        localStorage.getItem('red');
        this.productsIds = res.data;
        localStorage.setItem('productsIds', JSON.stringify(this.productsIds));
        console.log(this.productsIds);
      },
    });
  }
  removeFormWishList(id: string) {
    this.wishlistService.removeProd(id).subscribe({
      next: (res) => {
        this.productsIds = res.data;
        localStorage.setItem('productsIds', JSON.stringify(this.productsIds));

        console.log(this.productsIds);
        this.toastrService.warning(res.message, 'FreshCart');
      },
    });
  }
}
