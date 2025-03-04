import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment';

@Injectable({
  providedIn: 'root',
})
export class ProdcutsService {
  constructor(private httpClient: HttpClient) {}

  getALLProducts(): Observable<any> {
    return this.httpClient.get(
        environment.beaseUrl + `/api/v1/products`
    );
  }

  getSpecificProducts(id: string): Observable<any> {
    return this.httpClient.get(
      environment.beaseUrl + `./api/v1/products/${id}`
    );
  }
}
