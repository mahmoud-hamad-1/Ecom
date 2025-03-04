import { log } from 'node:util';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService);
  checkOutFOrm!: FormGroup;
  cartId: string = '';
  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }
  initForm(): void {
    this.checkOutFOrm = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125]\d{8}$/)],
      ],
      city: [null, [Validators.required]],
    });
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get('id')!;
        console.log(this.cartId);
      },
    });
  }

  submitForm(): void {
    this.ordersService
      .checkoutPayMet(this.cartId, this.checkOutFOrm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'success') {
            open(res.session.url, '_self');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
