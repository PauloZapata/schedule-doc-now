import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-patient-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-menu.component.html',
  styleUrls: ['./patient-menu.component.css']
})
export class PatientMenuComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.currentUser();

  ngOnInit(): void {
    if (!this.currentUser || this.authService.getUserType() !== 'patient') {
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    this.authService.logout();
  }

  startBooking(): void {
    this.router.navigate(['/booking']);
  }

  viewMyAppointments(): void {
    this.router.navigate(['/my-appointments']);
  }

  viewProfile(): void {
    this.router.navigate(['/profile']);
  }
}
