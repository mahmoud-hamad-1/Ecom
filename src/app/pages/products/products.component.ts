import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ProdcutsService } from '../../core/services/prodcuts/prodcuts.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { icategories } from '../../shared/interfaces/icategories';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: IProduct[] = [];
  categories: icategories[] = [];
  productsIds: string[] = [];

  private readonly prodcutsService = inject(ProdcutsService);

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly wishlistService = inject(WishlistService);

  name: string = '';
  customMainSlidaer: OwlOptions = {
    loop: true,
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

  ngOnInit(): void {
    this.getProductsData();
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

  addToCart(id: string): void {
    this.cartService.addProdutToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
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
