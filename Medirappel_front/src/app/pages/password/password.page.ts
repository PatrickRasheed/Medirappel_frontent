// src/app/pages/password/password.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from './password-match.validator';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent, IonText, IonInput, IonItem, IonLabel, IonSpinner,
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    CommonModule, FormsModule, IonItem, IonText, IonInput, IonLabel,
    IonButton, IonSpinner, ReactiveFormsModule,
  ],
})
export class PasswordPageComponent implements OnInit {
  passwordForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator('password', 'confirmPassword') }
    );
  }

  ngOnInit() {
    // Garde-fou : on ne peut pas s'inscrire sans être passé par la page email
    if (!this.authService.registrationEmail) {
      this.router.navigateByUrl('/email');
    }
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const email = this.authService.registrationEmail!;
    const { password } = this.passwordForm.value;

    this.isLoading = true;

    this.authService.register(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/otp');
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message;
      },
    });
  }
}