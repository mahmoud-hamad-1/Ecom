import { Component, inject, input, OnInit, TransferState } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLogin = input<boolean>(true);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly myTranslateService = inject(MyTranslateService);

  private readonly translateService = inject(TranslateService);

  countCart!: number;
  ngOnInit(): void {
    if (localStorage.getItem('userToken')) {
      this.cartService.cartNumber.subscribe({
        next: (value) => {
          this.countCart = value;
        },
      });
      this.cartService.getLoggedserCart().subscribe({
        next: (res) => {
          console.log(res);
          this.cartService.cartNumber.next(res.numOfCartItems);
        },
      });
    }
  }
  logOut(): void {
    this.authService.logOut();
  }
  change(lang: string): void {
    this.myTranslateService.changeLangTranslate(lang);
  }
  currentLang(lang: string): boolean {
    return this.translateService.currentLang === lang;
  }
}
