import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private httpClient: HttpClient) {}
  getALLBrands(): Observable<any> {
    return this.httpClient.get(environment.beaseUrl + `/api/v1/brands`);
  }
  getSpecificBrands(id: string): Observable<any> {
    return this.httpClient.get(environment.beaseUrl + `./api/v1/brands/${id}`);
  }
}
