import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export type UserType = 'patient' | 'doctor' | null;

export interface UserData {
  name: string;
  email: string;
  phone: string;
  specialty?: string;
  medicalLicense?: string;
  isApproved?: boolean;
  userType?: 'patient' | 'doctor';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userTypeSignal = signal<UserType>(null);
  private currentUserSignal = signal<UserData | null>(null);
  private isAuthenticatedSignal = signal<boolean>(false);

  // Getters públicos para los signals
  readonly userType = this.userTypeSignal.asReadonly();
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();

  constructor(private router: Router) {
    // Recuperar datos del localStorage si existen
    this.loadFromStorage();
  }

  /**
   * Establece el tipo de usuario seleccionado en el Home
   */
  setUserType(type: UserType): void {
    this.userTypeSignal.set(type);
    if (type) {
      localStorage.setItem('userType', type);
    }
  }

  /**
   * Obtiene el tipo de usuario actual
   */
  getUserType(): UserType {
    return this.userTypeSignal();
  }

  /**
   * Simula el proceso de login
   */
  login(email: string, password: string): boolean {
    // Simulación de autenticación (en producción, hacer petición HTTP)
    if (email && password) {
      const mockUser: UserData = {
        name: email.split('@')[0],
        email: email,
        phone: '+51 999 999 999',
        userType: this.userTypeSignal() === 'patient' ? 'patient' : 'doctor'
      };

      // Si es doctor, marcar como aprobado automáticamente
      if (this.userTypeSignal() === 'doctor') {
        mockUser.isApproved = true;
        mockUser.specialty = 'Medicina General';
        mockUser.medicalLicense = 'ML-12345';
      }

      this.currentUserSignal.set(mockUser);
      this.isAuthenticatedSignal.set(true);

      // Guardar en localStorage
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      localStorage.setItem('isAuthenticated', 'true');

      return true;
    }
    return false;
  }

  /**
   * Simula el proceso de registro
   */
  register(userData: UserData): boolean {
    // Simulación de registro (en producción, hacer petición HTTP)
    if (userData.email && userData.name) {
      const newUser: UserData = {
        ...userData,
        userType: this.userTypeSignal() === 'patient' ? 'patient' : 'doctor'
      };

      // Si es doctor, establecer como aprobado automáticamente
      if (this.userTypeSignal() === 'doctor') {
        newUser.isApproved = true;
      }

      this.currentUserSignal.set(newUser);
      this.isAuthenticatedSignal.set(true);

      // Guardar en localStorage
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('isAuthenticated', 'true');

      return true;
    }
    return false;
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    this.userTypeSignal.set(null);
    this.currentUserSignal.set(null);
    this.isAuthenticatedSignal.set(false);

    // Limpiar localStorage
    localStorage.removeItem('userType');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');

    // Navegar al portal de pacientes
    this.router.navigate(['/portal-paciente']);
  }

  /**
   * Actualiza los datos del usuario actual
   */
  updateCurrentUser(userData: Partial<UserData>): void {
    const current = this.currentUserSignal();
    if (current) {
      const updated = { ...current, ...userData };
      this.currentUserSignal.set(updated);
      localStorage.setItem('currentUser', JSON.stringify(updated));
    }
  }

  /**
   * Carga los datos desde localStorage
   */
  private loadFromStorage(): void {
    const userType = localStorage.getItem('userType') as UserType;
    const currentUser = localStorage.getItem('currentUser');
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (userType) {
      this.userTypeSignal.set(userType);
    }

    if (currentUser) {
      try {
        this.currentUserSignal.set(JSON.parse(currentUser));
      } catch (e) {
        console.error('Error parsing user data from localStorage', e);
      }
    }

    if (isAuthenticated === 'true') {
      this.isAuthenticatedSignal.set(true);
    }
  }

  /**
   * Verifica si el usuario tiene el tipo especificado
   */
  hasUserType(type: UserType): boolean {
    return this.userTypeSignal() === type;
  }

  /**
   * Verifica si el doctor está aprobado
   */
  isDoctorApproved(): boolean {
    const user = this.currentUserSignal();
    return user?.isApproved === true;
  }
}
