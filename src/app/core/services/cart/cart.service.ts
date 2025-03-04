import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../shared/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addProdutToCart(id: string): Observable<any> {
    return this.httpClient.post(environment.beaseUrl + '/api/v1/cart', {
      productId: id,
    });
  }
  getLoggedserCart(): Observable<any> {
    return this.httpClient.get(environment.beaseUrl + '/api/v1/cart', {});
  }
  removwSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(
      environment.beaseUrl + `/api/v1/cart/${id}`,
      {}
    );
  }
  updateCartQuantity(id: string, newCount: number): Observable<any> {
    return this.httpClient.put(environment.beaseUrl + `/api/v1/cart/${id}`, {
      count: newCount,
    });
  }
  claerCart(): Observable<any> {
    return this.httpClient.delete(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {}
    );
  }
}
