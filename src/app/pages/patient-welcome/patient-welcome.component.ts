import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-patient-welcome',
  standalone: true,
  imports: [],
  templateUrl: './patient-welcome.component.html',
  styleUrls: ['./patient-welcome.component.css']
})
export class PatientWelcomeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * Maneja la selección del tipo de usuario paciente
   */
  handlePatientSelection(): void {
    // Guardar el tipo de usuario como paciente
    this.authService.setUserType('patient');
    
    // Navegar a la página de login
    this.router.navigate(['/login']);
  }
}
