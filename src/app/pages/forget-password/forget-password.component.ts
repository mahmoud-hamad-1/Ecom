import { ResetPassword } from './../../shared/interfaces/reset-password';
import { log } from 'node:console';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  step: number = 1;
  email: string = '';
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  constructor(private auth: AuthService) {}
  forgetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  confirmCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{6} $/),
    ]),
  });

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });
  forget() {
    this.email = this.forgetForm.get('email')?.value;
    this.resetPasswordForm.get('email')?.patchValue(this.email);
    this.auth.forgetPassword(this.forgetForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.step = 2;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  confirmCode() {
    this.auth.confiemCode(this.confirmCodeForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.step = 3;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  resetPassword() {
    this.auth.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        setTimeout(() => {
          localStorage.setItem('userToken', res.token);
          this.authService.saveUserData();
          this.router.navigate(['/home']);
        }, 500);

        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
