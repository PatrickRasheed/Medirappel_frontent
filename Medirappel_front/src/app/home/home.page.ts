// src/app/home/home.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText],
})
export class HomePage implements OnInit {
  userEmail = '';
  isLoading = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getMe().subscribe({
      next: (res) => {
        this.userEmail = res.user.email;
        this.isLoading = false;
      },
      error: () => {
        // Token invalide ou expiré → on déconnecte proprement
        this.logout();
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}