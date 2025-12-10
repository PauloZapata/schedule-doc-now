import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Datos del formulario
  registrationData = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  userType = this.authService.getUserType();

  ngOnInit(): void {
    // Verificar que hay un tipo de usuario seleccionado
    if (!this.userType) {
      this.router.navigate(['/portal-paciente']);
    }
  }

  /**
   * Maneja el envío del formulario de registro
   */
  handleRegistration(event: Event): void {
    event.preventDefault();

    // Validaciones
    if (!this.registrationData.name || !this.registrationData.email || 
        !this.registrationData.phone || !this.registrationData.password) {
      this.showToast('Error', 'Por favor completa todos los campos obligatorios', 'error');
      return;
    }

    if (!this.registrationData.email.includes('@')) {
      this.showToast('Error', 'Por favor ingresa un correo válido', 'error');
      return;
    }

    if (this.registrationData.password !== this.registrationData.confirmPassword) {
      this.showToast('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    if (this.registrationData.password.length < 6) {
      this.showToast('Error', 'La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }

    // Registrar usuario como paciente
    const success = this.authService.register({
      name: this.registrationData.name,
      email: this.registrationData.email,
      phone: this.registrationData.phone,
      userType: 'patient'
    });

    if (success) {
      // Redireccionar al menú de pacientes
      this.router.navigate(['/patient-menu']);
    } else {
      this.showToast('Error', 'No se pudo crear la cuenta', 'error');
    }
  }

  /**
   * Vuelve a la pantalla de login
   */
  goBack(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Muestra un mensaje toast (simulado)
   */
  private showToast(title: string, description: string, variant: 'success' | 'error'): void {
    console.log(`[${variant.toUpperCase()}] ${title}: ${description}`);
    alert(`${title}\n${description}`);
  }
}
