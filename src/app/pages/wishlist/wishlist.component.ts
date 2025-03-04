import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';
import { ProdcutsService } from '../../core/services/prodcuts/prodcuts.service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, CarouselModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly prodcutsService = inject(ProdcutsService);

  products: IProduct[] = [];
  wishListData: string[] = [];
  productsIds: string[] = [];

  ngOnInit(): void {
    this.getWishListData();
  }

  addToCart(id: string): void {
    this.cartService.addProdutToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
          this.cartService.cartNumber.next(res.numOfCartItems);
          console.log(this.cartService.cartNumber.getValue());
          this.removeFormWishList(id);
          this.getWishListData();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getWishListData(): void {
    this.wishlistService.getLoggedWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data;
      },
    });
  }

  removeFormWishList(id: string) {
    this.wishlistService.removeProd(id).subscribe({
      next: (res) => {
        this.toastrService.warning(res.message, 'FreshCart');
        this.productsIds = res.data;
        localStorage.setItem('productsIds', JSON.stringify(this.productsIds));
      },
    });
  }
}
