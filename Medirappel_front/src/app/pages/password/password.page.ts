import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from './password-match.validator';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonText,
  IonInput,
  IonItem,
  IonLabel,
  
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    FormsModule,
    IonItem,
    IonText,
    IonInput,
    IonLabel,
    IonButton,
    ReactiveFormsModule,
    
  ],
  
})
export class PasswordPageComponent {
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword'),
      }
    );
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { password } = this.passwordForm.value; 
    console.log('Payload pour le back:', { password });
    
  }
}
