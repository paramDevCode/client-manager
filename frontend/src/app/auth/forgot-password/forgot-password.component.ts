import { CommonModule } from '@angular/common';
 import { Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service'; // Adjust path if needed
import { LoginRequest } from '../models/auth.models';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,LogoComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
 forgotForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService,
    private toast: ToastService
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }
    this.authService.forgotPassword(this.forgotForm.value.email).subscribe({
  next: (res) => this.toast.show('Check your email for reset instructions', 'success'),
  error: (err) => {
    const message = err?.error?.message || 'Unexpected error occurred. Please try again.';
    this.toast.show(message, 'error');
  }
});

 
  }

   goToLogin() {
    // you can do extra checks, logging, etc. here
    this.router.navigate(['/auth/login']);
  }
}
