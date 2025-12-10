import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-doctor-pending',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-pending.component.html',
  styleUrls: ['./doctor-pending.component.css']
})
export class DoctorPendingComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.currentUser();

  ngOnInit(): void {
    // Verificar que el usuario está autenticado y es doctor
    if (!this.currentUser || this.authService.getUserType() !== 'doctor') {
      this.router.navigate(['/']);
    }
  }

  /**
   * Cierra sesión y vuelve al inicio
   */
  logout(): void {
    this.authService.logout();
  }
}
