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
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  msError: string = '';
  isLoading: boolean = false;
  success: string = '';
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]\w{7,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125]\d{8}$/),
      ]),
    },
    { validators: this.confirmpassword }
  );

  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            setTimeout(() => {
              this.router.navigate(['/login']);
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
    } else {
      this.registerForm.markAsTouched();
    }
  }

  confirmpassword(group: any) {
    const Password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return Password === rePassword ? null : { mismatch: true };
  }
}
