import { useState } from 'react';
import { Calendar, Clock, Users, Shield, ArrowRight, CheckCircle, User, Phone, Mail, MapPin, Stethoscope, Building2, UserCheck } from 'lucide-react';
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

type UserType = 'patient' | 'doctor' | 'staff' | null;

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'splash' | 'login' | 'register' | 'patient-menu' | 'booking' | 'patient-info' | 'confirmation' | 'my-appointments'>('splash');
  const [userType, setUserType] = useState<UserType>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedHealthCenter, setSelectedHealthCenter] = useState('');
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    reason: ''
  });

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

  const filteredDoctors = doctors.filter(doctor => 
    selectedSpecialty === '' || doctor.specialty === selectedSpecialty
  );

  const handleUserTypeSelection = (type: UserType) => {
    setUserType(type);
    setCurrentStep('login');
  };

  const handleLogin = () => {
    if (userType === 'patient') {
      setCurrentStep('patient-menu');
    }
    // TODO: Implementar flujos para doctor y staff
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

  // Pantalla Splash/Bienvenida (1.1)
  if (currentStep === 'splash') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Stethoscope className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            MiCitaMINSA
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Sistema Nacional de Citas Médicas
          </p>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Selecciona tu tipo de usuario
            </h2>
            
            <Button 
              onClick={() => handleUserTypeSelection('patient')}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl shadow-lg flex items-center justify-center gap-3"
              size="lg"
            >
              <User className="w-5 h-5" />
              Soy Paciente
            </Button>
            
            <Button 
              onClick={() => handleUserTypeSelection('doctor')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl shadow-lg flex items-center justify-center gap-3"
              size="lg"
            >
              <Stethoscope className="w-5 h-5" />
              Soy Doctor
            </Button>
            
            <Button 
              onClick={() => handleUserTypeSelection('staff')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl shadow-lg flex items-center justify-center gap-3"
              size="lg"
            >
              <Building2 className="w-5 h-5" />
              Personal del Centro de Salud
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla Login/Registro (1.2)
  if (currentStep === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-6">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('splash')}
              className="absolute top-4 left-4"
            >
              ← Volver
            </Button>
            
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              {userType === 'patient' && <User className="w-8 h-8 text-white" />}
              {userType === 'doctor' && <Stethoscope className="w-8 h-8 text-white" />}
              {userType === 'staff' && <Building2 className="w-8 h-8 text-white" />}
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-gray-600">
              {userType === 'patient' && 'Accede como paciente'}
              {userType === 'doctor' && 'Accede como doctor'}
              {userType === 'staff' && 'Accede como personal de salud'}
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full"
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-xl"
                  size="lg"
                >
                  Iniciar Sesión
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  ¿No tienes cuenta?{' '}
                  <button 
                    onClick={() => setCurrentStep('register')}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Regístrate aquí
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Pantalla de Registro (1.3)
  if (currentStep === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
        <div className="w-full max-w-md mx-auto px-6">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('login')}
              className="absolute top-4 left-4"
            >
              ← Volver
            </Button>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Registro
            </h1>
            <p className="text-gray-600">
              Crea tu cuenta según tu rol
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Nombre completo</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Tu nombre completo"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+505 xxxx-xxxx"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="w-full"
                    required
                  />
                </div>

                {userType === 'doctor' && (
                  <>
                    <div>
                      <Label htmlFor="medicalLicense">Número de colegiación</Label>
                      <Input
                        id="medicalLicense"
                        type="text"
                        placeholder="Número de colegiación médica"
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialty">Especialidad</Label>
                      <Select>
                        <SelectTrigger>
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
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-xl"
                  size="lg"
                  onClick={() => setCurrentStep('login')}
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

  // Menú Principal del Paciente (2.1)
  if (currentStep === 'patient-menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">MiCitaMINSA</h1>
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('splash')}
              className="text-gray-600"
            >
              Cerrar Sesión
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Bienvenido, Paciente
            </h2>
            <p className="text-gray-600">
              ¿Qué deseas hacer hoy?
            </p>
          </div>

          <div className="grid gap-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0"
              onClick={() => setCurrentStep('booking')}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Programar Nueva Cita</h3>
                    <p className="text-gray-600">Agenda una cita médica rápidamente</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0"
              onClick={() => setCurrentStep('my-appointments')}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Mis Citas Programadas</h3>
                    <p className="text-gray-600">Ver, cancelar o reprogramar citas</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Mi Perfil</h3>
                    <p className="text-gray-600">Actualizar información personal</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
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
