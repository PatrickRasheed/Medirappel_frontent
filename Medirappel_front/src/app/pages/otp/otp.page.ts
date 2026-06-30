// src/app/pages/otp/otp.page.ts
import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent, IonInput, IonText, IonSpinner,
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    CommonModule, FormsModule, IonInput, IonButton, IonText, IonSpinner,
  ],
})
export class OtpPage implements OnInit {
  // 6 cases pour correspondre au format de l'OTP backend
  digits: string[] = ['', '', '', '', '', ''];
  isLoading = false;
  errorMessage = '';

  @ViewChildren(IonInput) inputs!: QueryList<IonInput>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Garde-fou : on doit connaître l'email pour vérifier l'OTP
    if (!this.authService.registrationEmail) {
      this.router.navigateByUrl('/email');
    }
  }

  onDigitInput(event: any, index: number) {
    const value = event.target.value;

    // Ne garde que le dernier caractère saisi (au cas où l'utilisateur colle un texte)
    this.digits[index] = value.slice(-1);

    // Passe automatiquement à la case suivante
    if (value && index < this.digits.length - 1) {
      const nextInput = this.inputs.toArray()[index + 1];
      nextInput?.setFocus();
    }
  }

  onSubmit() {
    this.errorMessage = '';
    const otp = this.digits.join('');

    if (otp.length !== 6) {
      this.errorMessage = "Veuillez saisir les 6 chiffres du code.";
      return;
    }

    const email = this.authService.registrationEmail!;
    this.isLoading = true;

    this.authService.verifyOtp(email, otp).subscribe({
      next: () => {
        this.isLoading = false;
        // Le nettoyage de l'email temporaire se fait après usage
        this.authService.registrationEmail = null;
        // Pas de connexion automatique : le backend ne renvoie pas de token ici
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message;
      },
    });
  }
}