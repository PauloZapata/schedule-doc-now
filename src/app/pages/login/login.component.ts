import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Datos del formulario
  loginData = {
    email: '',
    password: ''
  };

  // Estado del componente
  userType = this.authService.getUserType();
  showForgotPassword = false;
  forgotPasswordEmail = '';
  
  /**
   * Navega a la página de registro
   */
  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {
    // Verificar que hay un tipo de usuario seleccionado
    if (!this.userType) {
      this.router.navigate(['/portal-paciente']);
    }
  }

  /**
   * Maneja el envío del formulario de login
   */
  handleLogin(event: Event): void {
    event.preventDefault();

    if (!this.loginData.email || !this.loginData.password) {
      this.showToast('Error', 'Por favor completa todos los campos', 'error');
      return;
    }

    if (!this.loginData.email.includes('@')) {
      this.showToast('Error', 'Por favor ingresa un correo válido', 'error');
      return;
    }

    // Intentar login
    const success = this.authService.login(this.loginData.email, this.loginData.password);

    if (success) {
      // Redireccionar según el tipo de usuario
      this.redirectAfterLogin();
    } else {
      this.showToast('Error', 'Credenciales incorrectas', 'error');
    }
  }

  /**
   * Redirige al usuario según su tipo
   */
  private redirectAfterLogin(): void {
    const userType = this.authService.getUserType();

    switch (userType) {
      case 'patient':
        this.router.navigate(['/patient-menu']);
        break;
      case 'doctor':
        // Los doctores van directamente al dashboard
        this.router.navigate(['/doctor-dashboard']);
        break;
      default:
        this.router.navigate(['/portal-paciente']);
    }
  }

  /**
   * Vuelve a la pantalla de selección de usuario
   */
  goBack(): void {
    const currentType = this.authService.getUserType();
    this.authService.setUserType(null);
    
    // Redirigir al portal correspondiente según el tipo actual
    if (currentType === 'doctor') {
      this.router.navigate(['/portal-doctor']);
    } else {
      this.router.navigate(['/portal-paciente']);
    }
  }

  /**
   * Maneja el proceso de recuperación de contraseña
   */
  handleForgotPassword(): void {
    if (!this.forgotPasswordEmail) {
      this.showToast('Error', 'Por favor ingresa tu correo electrónico', 'error');
      return;
    }

    if (!this.forgotPasswordEmail.includes('@')) {
      this.showToast('Error', 'Por favor ingresa un correo válido', 'error');
      return;
    }

    this.showToast(
      '¡Correo enviado!',
      'Hemos enviado las instrucciones de recuperación a tu correo electrónico',
      'success'
    );

    this.forgotPasswordEmail = '';
    this.showForgotPassword = false;
  }

  /**
   * Muestra un mensaje toast (simulado con console por ahora)
   * En producción, implementar con una librería de toast o crear un servicio
   */
  private showToast(title: string, description: string, variant: 'success' | 'error'): void {
    console.log(`[${variant.toUpperCase()}] ${title}: ${description}`);
    // TODO: Implementar con un servicio de notificaciones real
    alert(`${title}\n${description}`);
  }

  /**
   * Obtiene el icono apropiado según el tipo de usuario
   */
  getUserIcon(): string {
    switch (this.userType) {
      case 'patient':
        return 'user';
      case 'doctor':
        return 'stethoscope';
      default:
        return 'user';
    }
  }

  /**
   * Obtiene el texto descriptivo según el tipo de usuario
   */
  getUserTypeText(): string {
    switch (this.userType) {
      case 'patient':
        return 'Accede como paciente';
      case 'doctor':
        return 'Accede como doctor';
      default:
        return '';
    }
  }
}
