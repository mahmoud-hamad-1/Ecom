import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TranslatePipe, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  msError: string = '';
  isLoading: boolean = false;
  success: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            setTimeout(() => {
              localStorage.setItem('userToken', res.token);
              this.authService.saveUserData();
              this.router.navigate(['/home']);
            }, 500);
            this.success = res.message;
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.msError = err.error.message;

          this.isLoading = false;
        },
      });
    }
  }
}
