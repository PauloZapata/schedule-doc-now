import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

type BookingStep = 'specialty' | 'datetime' | 'doctor' | 'confirm';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  availableSlots: { date: string; times: string[] }[];
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  
  currentUser = this.authService.currentUser;
  bookingStep: BookingStep = 'specialty';
  selectedSpecialty: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  selectedDoctorId: string = '';
  
  patientData = {
    name: this.currentUser()?.name || '',
    email: this.currentUser()?.email || '',
    phone: this.currentUser()?.phone || '',
    age: '',
    reason: ''
  };

  specialties: string[] = [
    'Medicina General',
    'Cardiología',
    'Dermatología',
    'Pediatría',
    'Ginecología',
    'Neurología',
    'Traumatología',
    'Psiquiatría'
  ];

  doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. María González',
      specialty: 'Medicina General',
      experience: '15 años de experiencia',
      availableSlots: [
        { date: '2024-01-15', times: ['08:00', '09:00', '10:00', '14:00'] },
        { date: '2024-01-16', times: ['08:30', '11:00', '15:00'] },
        { date: '2024-01-17', times: ['09:30', '14:30', '16:00'] }
      ]
    },
    {
      id: '2',
      name: 'Dr. Carlos Rodríguez',
      specialty: 'Cardiología',
      experience: '20 años de experiencia',
      availableSlots: [
        { date: '2024-01-15', times: ['09:00', '11:00', '15:00'] },
        { date: '2024-01-18', times: ['08:00', '10:00', '14:00'] }
      ]
    },
    {
      id: '3',
      name: 'Dra. Ana Martínez',
      specialty: 'Dermatología',
      experience: '12 años de experiencia',
      availableSlots: [
        { date: '2024-01-16', times: ['08:00', '09:30', '11:00'] },
        { date: '2024-01-19', times: ['14:00', '15:30', '16:00'] }
      ]
    },
    {
      id: '4',
      name: 'Dr. Luis Fernández',
      specialty: 'Pediatría',
      experience: '18 años de experiencia',
      availableSlots: [
        { date: '2024-01-15', times: ['08:00', '10:00', '14:00', '16:00'] },
        { date: '2024-01-17', times: ['09:00', '11:00', '15:00'] }
      ]
    },
    {
      id: '5',
      name: 'Dra. Carmen López',
      specialty: 'Medicina General',
      experience: '10 años de experiencia',
      availableSlots: [
        { date: '2024-01-16', times: ['10:00', '11:00', '14:30'] },
        { date: '2024-01-18', times: ['08:00', '09:00', '15:00'] }
      ]
    }
  ];

  getDoctorsBySpecialty(specialty: string): Doctor[] {
    return this.doctors.filter(doctor => doctor.specialty === specialty);
  }

  getAvailableDatesForSpecialty(specialty: string): string[] {
    const specialtyDoctors = this.getDoctorsBySpecialty(specialty);
    const allDates = new Set<string>();
    
    specialtyDoctors.forEach(doctor => {
      doctor.availableSlots.forEach(slot => {
        allDates.add(slot.date);
      });
    });
    
    return Array.from(allDates).sort();
  }

  getAvailableTimesForDate(specialty: string, date: string): string[] {
    const specialtyDoctors = this.getDoctorsBySpecialty(specialty);
    const allTimes = new Set<string>();
    
    specialtyDoctors.forEach(doctor => {
      const dateSlot = doctor.availableSlots.find(slot => slot.date === date);
      if (dateSlot) {
        dateSlot.times.forEach(time => allTimes.add(time));
      }
    });
    
    return Array.from(allTimes).sort();
  }

  getAvailableDoctorsForSlot(specialty: string, date: string, time: string): Doctor[] {
    return this.getDoctorsBySpecialty(specialty).filter(doctor => {
      const dateSlot = doctor.availableSlots.find(slot => slot.date === date);
      return dateSlot && dateSlot.times.includes(time);
    });
  }

  getSelectedDoctor(): Doctor | undefined {
    return this.doctors.find(d => d.id === this.selectedDoctorId);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  }

  formatDateShort(dateStr: string): string {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('es-ES', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  }

  selectSpecialty(specialty: string): void {
    this.selectedSpecialty = specialty;
  }

  selectDate(date: string): void {
    this.selectedDate = date;
    this.selectedTime = ''; // Reset time when date changes
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  selectDoctor(doctorId: string): void {
    this.selectedDoctorId = doctorId;
  }

  goBack(): void {
    if (this.bookingStep === 'specialty') {
      this.router.navigate(['/patient-menu']);
    } else if (this.bookingStep === 'datetime') {
      this.bookingStep = 'specialty';
    } else if (this.bookingStep === 'doctor') {
      this.bookingStep = 'datetime';
    } else if (this.bookingStep === 'confirm') {
      this.bookingStep = 'doctor';
    }
  }

  continueFromSpecialty(): void {
    if (this.selectedSpecialty) {
      this.bookingStep = 'datetime';
    } else {
      alert('Por favor selecciona una especialidad');
    }
  }

  continueFromDatetime(): void {
    if (this.selectedDate && this.selectedTime) {
      this.bookingStep = 'doctor';
    } else {
      alert('Por favor selecciona fecha y hora');
    }
  }

  continueFromDoctor(): void {
    if (this.selectedDoctorId) {
      this.bookingStep = 'confirm';
    } else {
      alert('Por favor selecciona un doctor');
    }
  }

  confirmBooking(): void {
    if (!this.patientData.name || !this.patientData.email || !this.patientData.phone) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Guardar cita (simulación)
    const appointmentData = {
      specialty: this.selectedSpecialty,
      date: this.selectedDate,
      time: this.selectedTime,
      doctor: this.getSelectedDoctor(),
      patient: this.patientData
    };

    console.log('Cita confirmada:', appointmentData);
    
    this.router.navigate(['/patient-menu']);
  }
}
