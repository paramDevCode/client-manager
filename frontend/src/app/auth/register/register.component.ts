import { CommonModule, NgIf } from '@angular/common';
 import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service'; // adjust path

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,AbstractControl,ValidationErrors  } from '@angular/forms';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { AuthService } from '../../services/auth.service';
import { ToastComponent } from '../../shared/components/toast/toast.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf,LogoComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @ViewChild(ToastComponent) toastRef!: ToastComponent;

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, { validators: this.passwordMatchValidator });
  

  constructor(private fb: FormBuilder,private router: Router, private authService:AuthService,
      private toast: ToastService

  ) {}

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

   onRegister() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  const { name, email, password } = this.registerForm.value;

  // Ensure values are not null or undefined
  if (name && email && password) {
    const registerData = { name, email, password };

    this.authService.register(registerData).subscribe({
      next: () => {
        this.toast.show('Registered successfully!', 'success');
        this.registerForm.reset(); 

        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
          const errorMessage = err?.error?.message || 'Registration failed';
          this.toast.show(errorMessage, 'error');
          this.registerForm.reset(); 
      }
    });
  }
}



   goToLogin() {
    // you can do extra checks, logging, etc. here
    this.router.navigate(['/auth/login']);
  }
}
