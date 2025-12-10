import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-doctor-welcome',
  standalone: true,
  imports: [],
  templateUrl: './doctor-welcome.component.html',
  styleUrls: ['./doctor-welcome.component.css']
})
export class DoctorWelcomeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * Maneja la selección del tipo de usuario doctor
   */
  handleDoctorSelection(): void {
    // Guardar el tipo de usuario como doctor
    this.authService.setUserType('doctor');
    
    // Navegar a la página de login
    this.router.navigate(['/login']);
  }
}
