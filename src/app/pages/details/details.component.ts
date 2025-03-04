import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdcutsService } from '../../core/services/prodcuts/prodcuts.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly prodcutsService = inject(ProdcutsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  productId: any;
  productDetails: IProduct = {} as IProduct;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get('id');
        console.log(this.productId);
        this.prodcutsService.getSpecificProducts(this.productId).subscribe({
          next: (res) => {
            console.log(res.data);
            this.productDetails = res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: () => {},
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
}
