
import { useState } from 'react';
import { Calendar, Clock, Users, Shield, ArrowRight, CheckCircle, User, Phone, Mail, MapPin } from 'lucide-react';
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

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'home' | 'booking' | 'patient-info' | 'confirmation'>('home');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
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
    { time: '09:00', available: true },
    { time: '09:30', available: true },
    { time: '10:00', available: false },
    { time: '10:30', available: true },
    { time: '11:00', available: true },
    { time: '11:30', available: false },
    { time: '14:00', available: true },
    { time: '14:30', available: true },
    { time: '15:00', available: true },
    { time: '15:30', available: false },
    { time: '16:00', available: true },
    { time: '16:30', available: true }
  ];

  const filteredDoctors = doctors.filter(doctor => 
    selectedSpecialty === '' || doctor.specialty === selectedSpecialty
  );

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
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast({
        title: "Error",
        description: "Por favor selecciona doctor, fecha y hora",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep('patient-info');
  };

  const confirmAppointment = () => {
    toast({
      title: "¡Cita confirmada!",
      description: "Recibirás un email de confirmación en breve",
    });
    // Reset form
    setCurrentStep('home');
    setSelectedSpecialty('');
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
    setPatientData({ name: '', email: '', phone: '', age: '', reason: '' });
  };

  if (currentStep === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  MediCitas
                </span>
              </div>
              <Button 
                onClick={() => setCurrentStep('booking')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Agendar Cita
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 bg-clip-text text-transparent">
              Tu salud, nuestra prioridad
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Agenda citas médicas de forma rápida y segura con los mejores especialistas. 
              Tu bienestar está a un click de distancia.
            </p>
            <Button 
              onClick={() => setCurrentStep('booking')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Agendar mi cita ahora
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              ¿Por qué elegir MediCitas?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Clock className="w-8 h-8 text-blue-600" />,
                  title: "Ahorra tiempo",
                  description: "Agenda en minutos desde cualquier lugar"
                },
                {
                  icon: <Users className="w-8 h-8 text-green-600" />,
                  title: "Mejores doctores",
                  description: "Profesionales certificados y especializados"
                },
                {
                  icon: <Shield className="w-8 h-8 text-blue-600" />,
                  title: "100% seguro",
                  description: "Tus datos están protegidos y encriptados"
                },
                {
                  icon: <CheckCircle className="w-8 h-8 text-green-600" />,
                  title: "Confirmación inmediata",
                  description: "Recibe confirmación al instante por email"
                }
              ].map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-full flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              ¿Listo para cuidar tu salud?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Miles de pacientes ya confían en nosotros para sus citas médicas
            </p>
            <Button 
              onClick={() => setCurrentStep('booking')}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Comenzar ahora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>
      </div>
    );
  }

  if (currentStep === 'booking') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep('home')}
              className="mb-4"
            >
              ← Volver al inicio
            </Button>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Agendar nueva cita</h1>
            <p className="text-gray-600">Selecciona especialidad, doctor, fecha y hora</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Especialidades y Doctores */}
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
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
                    <User className="w-5 h-5 text-blue-600" />
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

            {/* Fecha y Hora */}
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
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
                    <Clock className="w-5 h-5 text-blue-600" />
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
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
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
                          placeholder="+1 234 567 8900"
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
                  <User className="w-8 h-8 text-blue-600" />
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

                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                  <User className="w-8 h-8 text-purple-600" />
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
              Recibirás un email de confirmación en breve con todos los detalles
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={confirmAppointment}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Agendar otra cita
              </Button>
              <Button 
                variant="outline"
                onClick={() => setCurrentStep('home')}
                className="px-8 py-3 rounded-xl"
              >
                Volver al inicio
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
