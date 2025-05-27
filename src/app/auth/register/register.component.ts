import { CommonModule, NgIf } from '@angular/common';
 import { Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,AbstractControl,ValidationErrors  } from '@angular/forms';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf,LogoComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, { validators: this.passwordMatchValidator });

  constructor(private fb: FormBuilder,private router: Router) {}

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onRegister() {
    if (this.registerForm.valid) {
      // submit registration data
      console.log('Form Data:', this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

   goToLogin() {
    // you can do extra checks, logging, etc. here
    this.router.navigate(['/auth/login']);
  }
}
