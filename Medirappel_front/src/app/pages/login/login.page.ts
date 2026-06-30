// src/app/pages/login/login.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonContent, IonInput, IonItem, IonLabel, IonText, IonSpinner,
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonCardContent, CommonModule, FormsModule, IonItem, IonInput, IonLabel,
    IonButton, IonText, IonSpinner, RouterModule,
  ],
})
export class LoginPage {
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = "Veuillez remplir tous les champs.";
      return;
    }

    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message;
      },
    });
  }
}