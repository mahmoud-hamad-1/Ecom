import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/Icart/icart';
import { CurrencyPipe } from '@angular/common';
import { log } from 'node:util';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  cartDetails: Icart = {} as Icart;
  ngOnInit(): void {
    this.getCartData();
  }
  getCartData(): void {
    this.cartService.getLoggedserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeItem(id: string): void {
    this.cartService.removwSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log('Response:', res);
        if (res?.data) {
          this.cartDetails = res.data;
          this.cartService.cartNumber.next(res.numOfCartItems);
          this.toastrService.success('Item removed successfully');
        } else {
          this.toastrService.warning('No data received after removal');
        }
      },
      error: (err) => {
        console.error('Error removing item:', err);
        this.toastrService.error('Failed to remove item');
      },
    });
  }

  updateCount(id: string, count: number): void {
    this.cartService.updateCartQuantity(id, count).subscribe({
      next: (res) => {
        console.log('Response:', res);
        if (res?.data) {
          this.cartDetails = res.data;
          this.toastrService.success('Item quantity updated successfully');
        } else {
          this.toastrService.warning('No data received');
        }
      },
      error: (err) => {
        console.error('Error updating cart:', err);
        this.toastrService.error('Failed to update item quantity');
      },
    });
  }

  clearItems(): void {
    this.cartService.claerCart().subscribe({
      next: (res) => {
        console.log('Response:', res);
        if (res?.message === 'success') {
          this.cartDetails = {} as Icart;
          this.cartService.cartNumber.next(0);
          this.toastrService.success('All items removed successfully');
        } else {
          this.toastrService.warning('Unexpected response while clearing cart');
        }
      },
      error: (err) => {
        console.error('Error clearing cart:', err);
        this.toastrService.error('Failed to clear cart');
      },
    });
  }
}
