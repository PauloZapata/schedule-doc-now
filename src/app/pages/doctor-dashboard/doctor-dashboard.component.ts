import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  reason: string;
  status: 'pending' | 'attended' | 'missed';
}

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  currentUser = this.authService.currentUser();
  dailyNotes: string = '';
  
  // Datos de ejemplo para las citas del día
  todayAppointments: Appointment[] = [
    {
      id: '1',
      patientName: 'María García',
      time: '08:00',
      reason: 'Consulta general - dolor de cabeza',
      status: 'pending'
    },
    {
      id: '2',
      patientName: 'José López',
      time: '09:30',
      reason: 'Control de presión arterial',
      status: 'pending'
    },
    {
      id: '3',
      patientName: 'Ana Ruiz',
      time: '11:00',
      reason: 'Seguimiento post-operatorio',
      status: 'pending'
    },
    {
      id: '4',
      patientName: 'Carlos Mendoza',
      time: '14:30',
      reason: 'Dolor en el pecho',
      status: 'pending'
    }
  ];

  ngOnInit(): void {
    if (!this.currentUser || this.authService.getUserType() !== 'doctor') {
      this.router.navigate(['/portal-doctor']);
    }
  }

  /**
   * Obtiene la fecha actual formateada
   */
  getCurrentDate(): string {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('es-ES', options);
  }

  /**
   * Obtiene el texto del estado en español
   */
  getStatusText(status: 'pending' | 'attended' | 'missed'): string {
    const statusMap = {
      pending: 'Pendiente',
      attended: 'Asistió',
      missed: 'No asistió'
    };
    return statusMap[status];
  }

  /**
   * Marca la asistencia de un paciente
   */
  markAttendance(appointmentId: string, attended: boolean): void {
    const appointment = this.todayAppointments.find(app => app.id === appointmentId);
    if (appointment) {
      appointment.status = attended ? 'attended' : 'missed';
      this.showToast(
        attended ? 'Paciente marcado como asistido' : 'Paciente marcado como ausente',
        'El estado de la cita ha sido actualizado'
      );
    }
  }

  /**
   * Ver historial del paciente (funcionalidad por implementar)
   */
  viewPatientHistory(patientName: string): void {
    this.showToast(
      'Ver historial',
      `Abriendo historial de ${patientName}. Funcionalidad en desarrollo.`
    );
  }

  /**
   * Guardar notas del día
   */
  saveNotes(): void {
    if (this.dailyNotes.trim()) {
      console.log('Notas guardadas:', this.dailyNotes);
      this.showToast('Notas guardadas', 'Tus observaciones han sido registradas correctamente');
    } else {
      this.showToast('Error', 'Por favor escribe alguna nota antes de guardar');
    }
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    this.authService.logout();
  }

  /**
   * Mostrar notificación (simulado con alert por ahora)
   */
  private showToast(title: string, description: string): void {
    console.log(`[${title}] ${description}`);
    alert(`${title}\n${description}`);
  }
}
