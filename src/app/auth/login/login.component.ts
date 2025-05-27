import { CommonModule } from '@angular/common';
 import { Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
loginForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Force show validation
      return;
    }

    console.log('Login Data:', this.loginForm.value);
    // Handle login logic here
  }

   goToRegister() {
    // you can do extra checks, logging, etc. here
    this.router.navigate(['/auth/register']);
  }
    goToForgotPassword() {
    // you can do extra checks, logging, etc. here
    this.router.navigate(['/auth/forgot-password']);
  }
}
