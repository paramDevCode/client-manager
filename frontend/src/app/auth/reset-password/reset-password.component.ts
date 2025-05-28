import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { CommonModule, NgIf } from '@angular/common';
import { ToastService } from '../../services/toast.service'; // adjust path

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf, LogoComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  token: string = '';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
      private toast: ToastService
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
   
  onSubmit() {
  if (this.resetForm.invalid) {
    this.resetForm.markAllAsTouched();
    return;
  }

  this.authService.resetPassword(this.token, this.resetForm.value.password).subscribe({
    next: () => {
      this.toast.show('Password reset successful', 'success');
      this.router.navigate(['/auth/login']);
    },
    error: (err) => this.toast.show(err.error.message || 'Reset failed', 'error')
  });
}

}
