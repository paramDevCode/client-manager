import { CommonModule } from '@angular/common';
 import { Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,LogoComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
 forgotForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    console.log('Forgot Password Email:', this.forgotForm.value.email);
    // Send to forgot password API
  }

   goToLogin() {
    // you can do extra checks, logging, etc. here
    this.router.navigate(['/auth/login']);
  }
}
