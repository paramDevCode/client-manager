import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LogoComponent } from '../../shared/components/logo/logo.component';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service'; // Adjust path if needed
import { LoginRequest } from '../models/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Force validation messages
      return;
    }

    const loginData: LoginRequest = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.toast.show(res.message || 'Login successful', 'success');
        this.loginForm.reset();
        // Store token if needed
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']); // or wherever you want to redirect
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Login failed';
        this.toast.show(errorMessage, 'error');
        this.loginForm.reset(); // optional: clear form on error
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  goToForgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }
}
