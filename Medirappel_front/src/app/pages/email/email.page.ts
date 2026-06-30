// src/app/pages/email/email.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent, IonInput, IonItem, IonLabel, IonText,
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    CommonModule, FormsModule, IonItem, IonInput, IonLabel, IonButton, IonText,
  ],
})
export class EmailPage {
  email = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onContinue() {
    this.errorMessage = '';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !emailPattern.test(this.email)) {
      this.errorMessage = "Veuillez entrer une adresse email valide.";
      return;
    }

    // Stocke l'email pour la suite du parcours d'inscription
    this.authService.registrationEmail = this.email;
    this.router.navigateByUrl('/password');
  }
}