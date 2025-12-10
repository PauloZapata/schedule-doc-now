import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  
  currentUser = this.authService.currentUser;
  isEditingProfile: boolean = false;

  profileData = {
    name: this.currentUser()?.name || 'Usuario',
    email: this.currentUser()?.email || 'usuario@email.com',
    phone: this.currentUser()?.phone || '+505 0000-0000',
    age: '35',
    address: 'Barrio Central, Managua',
    emergencyContact: '+505 7777-8888',
    bloodType: 'O+',
    allergies: 'Ninguna conocida'
  };

  goBack(): void {
    this.router.navigate(['/patient-menu']);
  }

  toggleEditProfile(): void {
    if (this.isEditingProfile) {
      this.saveProfile();
    } else {
      this.isEditingProfile = true;
    }
  }

  saveProfile(): void {
    // Aquí se guardarían los cambios en el backend
    console.log('Guardando perfil:', this.profileData);
    
    this.isEditingProfile = false;
  }
}
