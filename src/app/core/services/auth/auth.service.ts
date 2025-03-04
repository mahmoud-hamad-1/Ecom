import { ResetPassword } from './../../../shared/interfaces/reset-password';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  private readonly router = inject(Router);
  userData: any = null;

  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(
      environment.beaseUrl + '/api/v1/auth/signup',
      data
    );
  }
  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(
      environment.beaseUrl + '/api/v1/auth/signin',
      data
    );
  }
  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
      console.log('userData', this.userData);
    }
  }
  logOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;
    this.router.navigate(['/login']);
  }
  forgetPassword(data: string): Observable<any> {
    return this.httpClient.post(
      ' https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      data
    );
  }
  confiemCode(data: number): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      data
    );
  }
  resetPassword(data: any): Observable<any> {
    return this.httpClient.put(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      data
    );
  }
}
