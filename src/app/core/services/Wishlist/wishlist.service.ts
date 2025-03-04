import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../shared/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishListData = new BehaviorSubject<any[]>([]);
  wishListData$ = this.wishListData.asObservable();

  constructor(private httpClient: HttpClient) {}

  getLoggedWishlist(): Observable<any> {
    return this.httpClient.get(environment.beaseUrl + '/api/v1/wishlist').pipe(
      tap((res: any) => {
        this.wishListData.next(res.data);
      })
    );
  }

  addProd(id: string): Observable<any> {
    return this.httpClient
      .post(environment.beaseUrl + '/api/v1/wishlist', {
        productId: id,
      })
      .pipe(
        tap((res: any) => {
          this.wishListData.next(res.data);
        })
      );
  }

  removeProd(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.beaseUrl + `/api/v1/wishlist/${id}`)
      .pipe(
        tap((res: any) => {
          this.wishListData.next(res.data);
        })
      );
  }
}
