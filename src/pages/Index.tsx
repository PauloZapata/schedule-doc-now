import { useState } from 'react';
import { Calendar, Clock, Users, Shield, ArrowRight, CheckCircle, User, Phone, Mail, MapPin, Stethoscope, Building2, UserCheck, Edit, Save, BarChart3, FileText, Download, ClipboardCheck, ClipboardX, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  image: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  reason: string;
  status: 'pending' | 'attended' | 'missed';
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  specialty?: string;
  medicalLicense?: string;
}

type UserType = 'patient' | 'doctor' | 'staff' | null;
type CurrentStep = 'splash' | 'login' | 'register' | 'forgot-password' | 'patient-menu' | 'booking' | 'patient-info' | 'confirmation' | 'my-appointments' | 'profile' | 'doctor-dashboard' | 'staff-dashboard' | 'patient-history';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<CurrentStep>('splash');
  const [userType, setUserType] = useState<UserType>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedHealthCenter, setSelectedHealthCenter] = useState('');
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [registrationData, setRegistrationData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    medicalLicense: ''
  });
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    reason: ''
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedPatientHistory, setSelectedPatientHistory] = useState<string | null>(null);

  const specialties = [
    'Medicina General',
    'Cardiología',
    'Dermatología',
    'Pediatría',
    'Ginecología',
    'Neurología',
    'Traumatología',
    'Psiquiatría'
  ];

  const healthCenters = [
    'Centro de Salud Central',
    'Hospital Nacional',
    'Clínica San José',
    'Centro de Salud Norte',
    'Hospital Materno Infantil'
  ];

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. María González',
      specialty: 'Medicina General',
      experience: '15 años de experiencia',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Dr. Carlos Rodríguez',
      specialty: 'Cardiología',
      experience: '20 años de experiencia',
      image: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Dra. Ana Martínez',
      specialty: 'Dermatología',
      experience: '12 años de experiencia',
      image: '/placeholder.svg'
    },
    {
      id: '4',
      name: 'Dr. Luis Fernández',
      specialty: 'Pediatría',
      experience: '18 años de experiencia',
      image: '/placeholder.svg'
    }
  ];

  const timeSlots: TimeSlot[] = [
    { time: '08:00', available: true },
    { time: '08:30', available: true },
    { time: '09:00', available: false },
    { time: '09:30', available: true },
    { time: '10:00', available: true },
    { time: '10:30', available: false },
    { time: '11:00', available: true },
    { time: '14:00', available: true },
    { time: '14:30', available: true },
    { time: '15:00', available: true },
    { time: '15:30', available: false },
    { time: '16:00', available: true }
  ];

  // Datos de ejemplo para el panel de doctor
  const todayAppointments: Appointment[] = [
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

  const filteredDoctors = doctors.filter(doctor => 
    selectedSpecialty === '' || doctor.specialty === selectedSpecialty
  );

  const handleUserTypeSelection = (type: UserType) => {
    setUserType(type);
    setCurrentStep('login');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    if (!loginData.email.includes('@')) {
      toast({
        title: "Error",
        description: "Por favor ingresa un correo válido",
        variant: "destructive"
      });
      return;
    }

    // Simular login exitoso y establecer usuario actual
    const userData = {
      name: registrationData.name || 'Usuario Demo',
      email: loginData.email,
      phone: registrationData.phone || '+505 0000-0000',
      specialty: registrationData.specialty,
      medicalLicense: registrationData.medicalLicense
    };
    setCurrentUser(userData);

    toast({
      title: "¡Bienvenido!",
      description: "Has iniciado sesión correctamente",
    });

    if (userType === 'patient') {
      setCurrentStep('patient-menu');
    } else if (userType === 'doctor') {
      setCurrentStep('doctor-dashboard');
    } else if (userType === 'staff') {
      setCurrentStep('staff-dashboard');
    }
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registrationData.name || !registrationData.email || !registrationData.phone) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    if (userType === 'doctor' && (!registrationData.specialty || !registrationData.medicalLicense)) {
      toast({
        title: "Error",
        description: "Por favor completa la especialidad y número de colegiación",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Cuenta creada!",
      description: "Tu cuenta ha sido creada exitosamente",
    });

    setCurrentStep('login');
  };

  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientData.name || !patientData.email || !patientData.phone) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep('confirmation');
  };

  const handleBookingSubmit = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !selectedHealthCenter) {
      toast({
        title: "Error",
        description: "Por favor selecciona centro de salud, especialidad, doctor, fecha y hora",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep('patient-info');
  };

  const confirmAppointment = () => {
    toast({
      title: "¡Cita confirmada!",
      description: "Recibirás un mensaje de confirmación en breve",
    });
    setCurrentStep('patient-menu');
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    toast({
      title: "Perfil actualizado",
      description: "Tu información personal ha sido guardada exitosamente",
    });
  };

  const markAttendance = (appointmentId: string, attended: boolean) => {
    toast({
      title: attended ? "Paciente marcado como asistido" : "Paciente marcado como ausente",
      description: "El estado de la cita ha sido actualizado",
    });
  };

  const viewPatientHistory = (patientName: string) => {
    setSelectedPatientHistory(patientName);
    setCurrentStep('patient-history');
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotPasswordEmail) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu correo electrónico",
        variant: "destructive"
      });
      return;
    }

    if (!forgotPasswordEmail.includes('@')) {
      toast({
        title: "Error",
        description: "Por favor ingresa un correo válido",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Correo enviado!",
      description: "Hemos enviado las instrucciones de recuperación a tu correo electrónico",
    });

    setForgotPasswordEmail('');
    setCurrentStep('login');
  };

  // Pantalla Splash/Bienvenida
  if (currentStep === 'splash') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto w-full">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl">
            <Stethoscope className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            MiCitaMINSA
          </h1>
          
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
            Sistema Nacional de Citas Médicas
          </p>

          <div className="space-y-3 sm:space-y-4 px-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
              Selecciona tu tipo de usuario
            </h2>
            
            <Button 
              onClick={() => handleUserTypeSelection('patient')}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 text-sm sm:text-base"
              size="lg"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              Soy Paciente
            </Button>
            
            <Button 
              onClick={() => handleUserTypeSelection('doctor')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 text-sm sm:text-base"
              size="lg"
            >
              <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5" />
              Soy Doctor
            </Button>
            
            <Button 
              onClick={() => handleUserTypeSelection('staff')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 sm:py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 text-sm sm:text-base"
              size="lg"
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
              Personal del Centro de Salud
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla Login
  if (currentStep === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('splash')}
              className="absolute top-4 left-4 text-sm sm:text-base"
            >
              ← Volver
            </Button>
            
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              {userType === 'patient' && <User className="w-7 h-7 sm:w-8 sm:h-8 text-white" />}
              {userType === 'doctor' && <Stethoscope className="w-7 h-7 sm:w-8 sm:h-8 text-white" />}
              {userType === 'staff' && <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-white" />}
            </div>
            
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              {userType === 'patient' && 'Accede como paciente'}
              {userType === 'doctor' && 'Accede como doctor'}
              {userType === 'staff' && 'Accede como personal de salud'}
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mx-4 sm:mx-0">
            <CardContent className="p-4 sm:p-6">
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <Label htmlFor="email" className="text-sm sm:text-base">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full mt-1"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-sm sm:text-base">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full mt-1"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-xl text-sm sm:text-base"
                  size="lg"
                >
                  Iniciar Sesión
                </Button>
              </form>
              
              <div className="mt-4 sm:mt-6 text-center space-y-3">
                <div className="text-center">
                  <button 
                    onClick={() => setCurrentStep('forgot-password')}
                    className="text-blue-600 hover:underline font-medium text-sm sm:text-base"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                
                <div className="border-t pt-3">
                  <p className="text-sm sm:text-base text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <button 
                      onClick={() => setCurrentStep('register')}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Regístrate aquí
                    </button>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Pantalla de Registro
  if (currentStep === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-4 sm:py-8">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('login')}
              className="absolute top-4 left-4 text-sm sm:text-base"
            >
              ← Volver
            </Button>
            
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Registro
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Crea tu cuenta según tu rol
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-4 sm:p-6">
              <form className="space-y-4" onSubmit={handleRegistration}>
                <div>
                  <Label htmlFor="fullName" className="text-sm sm:text-base">Nombre completo</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Tu nombre completo"
                    className="w-full mt-1"
                    value={registrationData.name}
                    onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm sm:text-base">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full mt-1"
                    value={registrationData.email}
                    onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm sm:text-base">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+505 xxxx-xxxx"
                    className="w-full mt-1"
                    value={registrationData.phone}
                    onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm sm:text-base">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-sm sm:text-base">Confirmar contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="w-full mt-1"
                    required
                  />
                </div>

                {userType === 'doctor' && (
                  <>
                    <div>
                      <Label htmlFor="medicalLicense" className="text-sm sm:text-base">Número de colegiación</Label>
                      <Input
                        id="medicalLicense"
                        type="text"
                        placeholder="Número de colegiación médica"
                        className="w-full mt-1"
                        value={registrationData.medicalLicense}
                        onChange={(e) => setRegistrationData({...registrationData, medicalLicense: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialty" className="text-sm sm:text-base">Especialidad</Label>
                      <Select value={registrationData.specialty} onValueChange={(value) => setRegistrationData({...registrationData, specialty: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecciona tu especialidad" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-xl text-sm sm:text-base"
                  size="lg"
                >
                  Crear Cuenta
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Pantalla de Recuperación de Contraseña
  if (currentStep === 'forgot-password') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('login')}
              className="absolute top-4 left-4 text-sm sm:text-base"
            >
              ← Volver
            </Button>
            
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Recuperar Contraseña
            </h1>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mx-4 sm:mx-0">
            <CardContent className="p-4 sm:p-6">
              <form className="space-y-4" onSubmit={handleForgotPassword}>
                <div>
                  <Label htmlFor="recovery-email" className="text-sm sm:text-base">Correo electrónico</Label>
                  <Input
                    id="recovery-email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full mt-1"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-xl text-sm sm:text-base"
                  size="lg"
                >
                  Enviar Instrucciones
                </Button>
              </form>
              
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-sm sm:text-base text-gray-600">
                  ¿Recordaste tu contraseña?{' '}
                  <button 
                    onClick={() => setCurrentStep('login')}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Inicia sesión
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Panel de Doctor
  if (currentStep === 'doctor-dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">Panel del Doctor</h1>
              <p className="text-sm text-gray-600">Dr. {currentUser?.name || 'Doctor'}</p>
              <p className="text-xs text-gray-500">{currentUser?.specialty || 'Especialidad'}</p>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('splash')}
              className="text-gray-600 text-sm"
            >
              Cerrar Sesión
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Citas de Hoy
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6">
            {todayAppointments.map((appointment) => (
              <Card key={appointment.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-sm sm:text-base">{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-sm sm:text-base">{appointment.patientName}</span>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 mb-2">{appointment.reason}</p>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          appointment.status === 'pending' ? 'bg-yellow-500' :
                          appointment.status === 'attended' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-xs sm:text-sm text-gray-500 capitalize">
                          {appointment.status === 'pending' ? 'Pendiente' :
                           appointment.status === 'attended' ? 'Asistió' : 'No asistió'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm"
                        onClick={() => markAttendance(appointment.id, true)}
                        disabled={appointment.status !== 'pending'}
                      >
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Asistió
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="text-xs sm:text-sm"
                        onClick={() => markAttendance(appointment.id, false)}
                        disabled={appointment.status !== 'pending'}
                      >
                        <ClipboardX className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        No asistió
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs sm:text-sm"
                        onClick={() => viewPatientHistory(appointment.patientName)}
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Ver historial
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 sm:mt-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Notas del día</CardTitle>
              <CardDescription className="text-sm sm:text-base">Registra observaciones importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Escribe tus observaciones del día aquí..."
                className="min-h-[100px] text-sm sm:text-base"
                rows={4}
              />
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base">
                <Save className="w-4 h-4 mr-2" />
                Guardar notas
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Panel de Personal del Centro de Salud
  if (currentStep === 'staff-dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">Panel de Personal</h1>
              <p className="text-sm text-gray-600">{currentUser?.name || 'Personal'}</p>
              <p className="text-xs text-gray-500">Centro de Salud</p>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('splash')}
              className="text-gray-600 text-sm"
            >
              Cerrar Sesión
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Dashboard Estadístico
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Estadísticas del {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Citas Hoy</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">24</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Asistencias</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">18</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <ClipboardX className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Inasistencias</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">6</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">% Asistencia</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">75%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Filtrar por Fechas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date" className="text-sm">Fecha inicio</Label>
                    <Input
                      id="start-date"
                      type="date"
                      className="mt-1"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date" className="text-sm">Fecha fin</Label>
                    <Input
                      id="end-date"
                      type="date"
                      className="mt-1"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Actualizar Estadísticas
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Generar Reportes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Reporte de Citas Diarias
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Estadísticas Mensuales
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar Reporte PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Estadísticas Adicionales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">12</p>
                  <p className="text-sm text-gray-600">Citas Reprogramadas</p>
                  <p className="text-xs text-purple-500">50% del total</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl sm:text-3xl font-bold text-orange-600">3</p>
                  <p className="text-sm text-gray-600">Citas Canceladas</p>
                  <p className="text-xs text-orange-500">12.5% del total</p>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <p className="text-2xl sm:text-3xl font-bold text-indigo-600">9</p>
                  <p className="text-sm text-gray-600">Nuevos Pacientes</p>
                  <p className="text-xs text-indigo-500">37.5% del total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Pantalla de Historial del Paciente
  if (currentStep === 'patient-history') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 p-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('doctor-dashboard')}
              className="text-sm sm:text-base"
            >
              ← Volver al panel
            </Button>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">Historial Clínico</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              {selectedPatientHistory}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">Historial médico del paciente</p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Información Personal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Edad</p>
                    <p className="font-semibold">45 años</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tipo de sangre</p>
                    <p className="font-semibold">O+</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Alergias</p>
                    <p className="font-semibold">Penicilina</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contacto de emergencia</p>
                    <p className="font-semibold">+505 8888-9999</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Consultas Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="font-semibold text-sm sm:text-base">15 de Diciembre, 2024</p>
                    <p className="text-sm text-gray-600">Consulta general - Dolor de cabeza recurrente</p>
                    <p className="text-xs text-gray-500 mt-1">Diagnóstico: Migraña. Tratamiento: Paracetamol 500mg cada 8h</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <p className="font-semibold text-sm sm:text-base">28 de Noviembre, 2024</p>
                    <p className="text-sm text-gray-600">Control de presión arterial</p>
                    <p className="text-xs text-gray-500 mt-1">Presión: 140/90. Recomendación: Reducir consumo de sal</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4 py-2">
                    <p className="font-semibold text-sm sm:text-base">10 de Octubre, 2024</p>
                    <p className="text-sm text-gray-600">Exámenes de laboratorio</p>
                    <p className="text-xs text-gray-500 mt-1">Resultados normales. Glucosa: 95 mg/dl, Colesterol: 180 mg/dl</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Medicamentos Actuales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-2">
                    <div>
                      <p className="font-semibold text-sm sm:text-base">Losartán 50mg</p>
                      <p className="text-xs sm:text-sm text-gray-600">Una tableta cada 24h - Para hipertensión</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded self-start sm:self-center">Activo</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-2">
                    <div>
                      <p className="font-semibold text-sm sm:text-base">Metformina 850mg</p>
                      <p className="text-xs sm:text-sm text-gray-600">Una tableta cada 12h - Para diabetes</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded self-start sm:self-center">Activo</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Menú Principal del Paciente
  if (currentStep === 'patient-menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">MiCitaMINSA</h1>
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('splash')}
              className="text-gray-600 text-sm sm:text-base"
            >
              Cerrar Sesión
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Bienvenido, {currentUser?.name || 'Paciente'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              ¿Qué deseas hacer hoy?
            </p>
          </div>

          <div className="grid gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0"
              onClick={() => setCurrentStep('booking')}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">Programar Nueva Cita</h3>
                    <p className="text-sm sm:text-base text-gray-600">Agenda una cita médica rápidamente</p>
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0"
              onClick={() => setCurrentStep('my-appointments')}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">Mis Citas Programadas</h3>
                    <p className="text-sm sm:text-base text-gray-600">Ver, cancelar o reprogramar citas</p>
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0"
              onClick={() => setCurrentStep('profile')}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">Mi Perfil</h3>
                    <p className="text-sm sm:text-base text-gray-600">Actualizar información personal</p>
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla Mi Perfil con datos dinámicos
  if (currentStep === 'profile') {
    const profileData = {
      name: currentUser?.name || 'Usuario',
      email: currentUser?.email || 'usuario@email.com',
      phone: currentUser?.phone || '+505 0000-0000',
      age: '35',
      address: 'Barrio Central, Managua',
      emergencyContact: 'Contacto de emergencia - +505 7777-8888',
      bloodType: 'O+',
      allergies: 'Ninguna conocida'
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 p-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('patient-menu')}
              className="text-sm sm:text-base"
            >
              ← Volver
            </Button>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">Mi Perfil</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl">
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{profileData.name}</h2>
              <p className="text-sm sm:text-base text-gray-600">{profileData.email}</p>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="text-lg sm:text-xl">Información Personal</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => isEditingProfile ? handleSaveProfile() : setIsEditingProfile(true)}
                  className="text-sm"
                >
                  {isEditingProfile ? (
                    <>
                      <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Guardar
                    </>
                  ) : (
                    <>
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Editar
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="profileName" className="text-sm">Nombre completo</Label>
                    <Input
                      id="profileName"
                      value={profileData.name}
                      disabled={!isEditingProfile}
                      className={`mt-1 ${!isEditingProfile ? "bg-gray-50" : ""}`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profileAge" className="text-sm">Edad</Label>
                    <Input
                      id="profileAge"
                      type="number"
                      value={profileData.age}
                      disabled={!isEditingProfile}
                      className={`mt-1 ${!isEditingProfile ? "bg-gray-50" : ""}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="profileEmail" className="text-sm">Correo electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="profileEmail"
                        type="email"
                        value={profileData.email}
                        disabled={!isEditingProfile}
                        className={`pl-10 mt-1 ${!isEditingProfile ? "bg-gray-50" : ""}`}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="profilePhone" className="text-sm">Teléfono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="profilePhone"
                        type="tel"
                        value={profileData.phone}
                        disabled={!isEditingProfile}
                        className={`pl-10 mt-1 ${!isEditingProfile ? "bg-gray-50" : ""}`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="profileAddress" className="text-sm">Dirección</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="profileAddress"
                      value={profileData.address}
                      disabled={!isEditingProfile}
                      className={`pl-10 mt-1 ${!isEditingProfile ? "bg-gray-50" : ""}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="profileBloodType" className="text-sm">Tipo de sangre</Label>
                    <Input
                      id="profileBloodType"
                      value={profileData.bloodType}
                      disabled={!isEditingProfile}
                      className={`mt-1 ${!isEditingProfile ? "bg-gray-50" : ""}`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profileEmergencyContact" className="text-sm">Contacto de emergencia</Label>
                    <Input
                      id="profileEmergencyContact"
                      value={profileData.emergencyContact}
                      disabled={!isEditingProfile}
                      className={`mt-1 ${!isEditingProfile ? "bg-gray-50" : ""}`}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="profileAllergies" className="text-sm">Alergias conocidas</Label>
                  <Textarea
                    id="profileAllergies"
                    value={profileData.allergies}
                    disabled={!isEditingProfile}
                    className={`mt-1 ${!isEditingProfile ? "bg-gray-50" : ""}`}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla Mis Citas Programadas (2.4)
  if (currentStep === 'my-appointments') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 p-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('patient-menu')}
            >
              ← Volver
            </Button>
            <h1 className="text-xl font-bold text-gray-800">Mis Citas Programadas</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-4">
            {/* Ejemplo de citas programadas */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold">15 de Enero, 2024 - 10:00 AM</span>
                    </div>
                    <h3 className="font-semibold text-lg">Dr. María González</h3>
                    <p className="text-gray-600">Medicina General</p>
                    <p className="text-sm text-gray-500 mt-1">Centro de Salud Central</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Reprogramar
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="font-semibold">20 de Enero, 2024 - 2:30 PM</span>
                    </div>
                    <h3 className="font-semibold text-lg">Dr. Carlos Rodríguez</h3>
                    <p className="text-gray-600">Cardiología</p>
                    <p className="text-sm text-gray-500 mt-1">Hospital Nacional</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Reprogramar
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Programar Cita (2.2)
  if (currentStep === 'booking') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 p-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('patient-menu')}
            >
              ← Volver
            </Button>
            <h1 className="text-xl font-bold text-gray-800">Programar Nueva Cita</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-green-600" />
                    Centro de Salud
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedHealthCenter} onValueChange={setSelectedHealthCenter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un centro de salud" />
                    </SelectTrigger>
                    <SelectContent>
                      {healthCenters.map((center) => (
                        <SelectItem key={center} value={center}>
                          {center}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    Especialidad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una especialidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" />
                    Doctores disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredDoctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          selectedDoctor === doctor.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedDoctor(doctor.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                            <p className="text-xs text-gray-500">{doctor.experience}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    Fecha
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full"
                  />
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    Horarios disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`${
                          selectedTime === slot.time
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : slot.available
                            ? 'hover:bg-blue-50'
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={handleBookingSubmit}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                Continuar con datos del paciente
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'patient-info') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep('booking')}
              className="mb-4"
            >
              ← Volver
            </Button>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Datos del paciente</h1>
            <p className="text-gray-600">Completa tu información para finalizar la cita</p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handlePatientSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Nombre completo *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={patientData.name}
                      onChange={(e) => setPatientData({...patientData, name: e.target.value})}
                      className="mt-2"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        Correo electrónico *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={patientData.email}
                          onChange={(e) => setPatientData({...patientData, email: e.target.value})}
                          className="mt-2 pl-10"
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-medium">
                        Teléfono *
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          value={patientData.phone}
                          onChange={(e) => setPatientData({...patientData, phone: e.target.value})}
                          className="mt-2 pl-10"
                          placeholder="+505 xxxx-xxxx"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="age" className="text-gray-700 font-medium">
                      Edad
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={patientData.age}
                      onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                      className="mt-2"
                      placeholder="Tu edad"
                      min="1"
                      max="120"
                    />
                  </div>

                  <div>
                    <Label htmlFor="reason" className="text-gray-700 font-medium">
                      Motivo de la consulta
                    </Label>
                    <Textarea
                      id="reason"
                      value={patientData.reason}
                      onChange={(e) => setPatientData({...patientData, reason: e.target.value})}
                      className="mt-2"
                      placeholder="Describe brevemente el motivo de tu consulta..."
                      rows={4}
                    />
                  </div>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <CheckCircle className="mr-2 w-5 h-5" />
                  Confirmar cita
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 'confirmation') {
    const selectedDoctorData = doctors.find(d => d.id === selectedDoctor);
    const selectedHealthCenterName = selectedHealthCenter;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Cita confirmada!</h1>
            <p className="text-gray-600">Tu cita ha sido agendada exitosamente</p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-6">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="text-center">Detalles de tu cita</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <Building2 className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Centro de Salud</h3>
                    <p className="text-gray-600">{selectedHealthCenterName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                  <User className="w-8 h-8 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Doctor</h3>
                    <p className="text-gray-600">{selectedDoctorData?.name}</p>
                    <p className="text-sm text-gray-500">{selectedDoctorData?.specialty}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <Calendar className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Fecha y hora</h3>
                    <p className="text-gray-600">{selectedDate} a las {selectedTime}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
                  <User className="w-8 h-8 text-orange-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Paciente</h3>
                    <p className="text-gray-600">{patientData.name}</p>
                    <p className="text-sm text-gray-500">{patientData.email}</p>
                  </div>
                </div>

                {patientData.reason && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Motivo de consulta</h3>
                    <p className="text-gray-600">{patientData.reason}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Recibirás un mensaje de confirmación en breve con todos los detalles
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={confirmAppointment}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Volver al menú principal
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
