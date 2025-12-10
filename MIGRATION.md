# MiCitaMINSA - Migración Angular 18+

## 📋 Descripción

Migración estricta de React a Angular 18+ siguiendo la arquitectura del proyecto DWEB, utilizando Standalone Components y Signals.

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── pages/
│   │   ├── home/              # Página de selección de usuario (Splash)
│   │   │   ├── home.component.ts
│   │   │   ├── home.component.html
│   │   │   └── home.component.css
│   │   └── login/             # Página de autenticación
│   │       ├── login.component.ts
│   │       ├── login.component.html
│   │       └── login.component.css
│   ├── services/
│   │   └── auth.service.ts    # Servicio de autenticación con Signals
│   ├── app.component.ts       # Componente raíz
│   ├── app.config.ts          # Configuración de la aplicación
│   └── app.routes.ts          # Rutas con lazy loading
├── main.ts                    # Bootstrap de Angular
└── index.css                  # Estilos globales con Tailwind
```

## 🔄 Mapeo de Migración

### React → Angular

| React (Index.tsx) | Angular | Descripción |
|-------------------|---------|-------------|
| `currentStep === 'splash'` | `pages/home/` | Selección de tipo de usuario |
| `currentStep === 'login'` | `pages/login/` | Autenticación |
| Estado local con `useState` | `AuthService` con Signals | Gestión de estado centralizada |
| Props y callbacks | `@Input()` / `@Output()` | Comunicación entre componentes |
| React Router | Angular Router | Navegación |

## ⚙️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
# o
npm start

# Compilar para producción
npm run build
```

## 🚀 Características Implementadas

### ✅ Fase 1 - Core (Completada)

- [x] **HomeComponent**: Página de selección de usuario (Paciente, Doctor, Staff)
- [x] **LoginComponent**: Autenticación con validaciones
- [x] **AuthService**: Servicio con Signals para gestión de autenticación
- [x] **Routing**: Configuración de rutas con lazy loading
- [x] **Tailwind CSS**: Mantiene los estilos del proyecto original

### 🎯 Arquitectura

#### Standalone Components
Todos los componentes son standalone (no requieren módulos):

```typescript
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html'
})
```

#### Signals API
Uso de Signals para reactividad:

```typescript
private userTypeSignal = signal<UserType>(null);
readonly userType = this.userTypeSignal.asReadonly();
```

#### Lazy Loading
Todas las rutas utilizan lazy loading:

```typescript
{
  path: '',
  loadComponent: () => import('./pages/home/home.component')
    .then(m => m.HomeComponent)
}
```

## 📱 Rutas Disponibles

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | HomeComponent | Página de inicio (selección de usuario) |
| `/login` | LoginComponent | Autenticación |

## 🔐 AuthService

El servicio de autenticación proporciona:

- **Gestión de tipo de usuario**: `setUserType()`, `getUserType()`
- **Login/Registro**: `login()`, `register()`
- **Persistencia**: LocalStorage para mantener sesión
- **Estado reactivo**: Signals para cambios en tiempo real
- **Logout**: Limpieza de estado y navegación

```typescript
// Uso en componentes
private authService = inject(AuthService);

// Establecer tipo de usuario
this.authService.setUserType('patient');

// Login
this.authService.login(email, password);

// Verificar autenticación
const isAuth = this.authService.isAuthenticated();
```

## 🎨 Estilos

El proyecto mantiene **todas las clases de Tailwind CSS** del proyecto React original:

- Gradientes: `bg-gradient-to-br from-green-50 via-white to-blue-50`
- Botones: `bg-green-600 hover:bg-green-700`
- Sombras: `shadow-xl`, `shadow-lg`
- Responsive: `sm:`, `md:`, `lg:`

## 📝 Convenciones de Nombres

### Archivos
- Componentes: `nombre.component.ts`
- Servicios: `nombre.service.ts`
- Guardias: `nombre.guard.ts`

### Carpetas
- `pages/` - Componentes de página (rutas principales)
- `services/` - Servicios inyectables
- `guards/` - Guardias de ruta (futuro)
- `models/` - Interfaces y tipos (futuro)

## 🛠️ Próximos Pasos

### Fase 2 - Páginas Adicionales
- [ ] Patient Menu Component
- [ ] Doctor Dashboard Component
- [ ] Staff Dashboard Component
- [ ] Doctor Pending Component
- [ ] Booking Component

### Fase 3 - Features
- [ ] Guards de autenticación
- [ ] Interceptores HTTP
- [ ] Servicio de notificaciones (Toast)
- [ ] Integración con API Backend

### Fase 4 - Optimización
- [ ] Pre-carga de rutas
- [ ] Service Workers (PWA)
- [ ] Optimización de bundle

## 🔧 Tecnologías

- **Angular**: 18.2.0 (Standalone Components)
- **Angular CLI**: 18.2.0 (Build tool oficial)
- **TypeScript**: 5.5.3
- **Tailwind CSS**: 3.4.11
- **RxJS**: 7.8.0 (Reactive programming)

## 📄 Licencia

Proyecto educativo - UPC DWEB

---

**Nota Importante**: Esta es una migración estricta siguiendo la estructura del proyecto DWEB. La página de entrada es `Home` (no "Welcome" o "Landing").
