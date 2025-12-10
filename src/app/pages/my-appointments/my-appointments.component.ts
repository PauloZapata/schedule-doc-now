import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  specialty: string;
  healthCenter: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})
export class MyAppointmentsComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  
  currentUser = this.authService.currentUser;

  appointments: Appointment[] = [
    {
      id: '1',
      date: '2024-01-15',
      time: '10:00',
      doctorName: 'Dr. María González',
      specialty: 'Medicina General',
      healthCenter: 'Centro de Salud Central',
      status: 'scheduled'
    },
    {
      id: '2',
      date: '2024-01-22',
      time: '15:00',
      doctorName: 'Dr. Carlos Rodríguez',
      specialty: 'Cardiología',
      healthCenter: 'Hospital Nacional',
      status: 'scheduled'
    },
    {
      id: '3',
      date: '2023-12-10',
      time: '09:00',
      doctorName: 'Dra. Ana Martínez',
      specialty: 'Dermatología',
      healthCenter: 'Clínica San José',
      status: 'completed'
    }
  ];

  formatDate(dateStr: string): string {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  }

  formatTime(time: string): string {
    return time;
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'scheduled':
        return 'Programada';
      case 'completed':
        return 'Completada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  goBack(): void {
    this.router.navigate(['/patient-menu']);
  }

  rescheduleAppointment(appointmentId: string): void {
    alert(`Reprogramar cita ${appointmentId}\n\nEsta funcionalidad estará disponible próximamente.`);
  }

  cancelAppointment(appointmentId: string): void {
    const confirmed = confirm('¿Estás seguro de que deseas cancelar esta cita?');
    if (confirmed) {
      const appointment = this.appointments.find(a => a.id === appointmentId);
      if (appointment) {
        appointment.status = 'cancelled';
        alert('Cita cancelada exitosamente');
      }
    }
  }
}
