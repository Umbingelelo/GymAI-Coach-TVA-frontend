# GymAI Coach - Frontend

Aplicación web para registro y seguimiento de entrenamientos de gimnasio con autenticación Supabase y backend Node.js/Express.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v18 o superior ([Descargar](https://nodejs.org/))
- **npm** v9 o superior (viene con Node.js)
- **Backend de GymAI** corriendo en `http://localhost:3000`
- **Cuenta de Supabase** con un proyecto configurado

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd fronten-gymai
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_publica_de_supabase
```

**¿Dónde obtener estas credenciales?**
1. Ve a [supabase.com](https://supabase.com)
2. Abre tu proyecto
3. Ve a **Settings** → **API**
4. Copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

## 🏃 Ejecución

### Modo Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### Modo Producción
```bash
npm run build
npm run preview
```

## 🔧 Configuración del Backend

**IMPORTANTE**: El frontend requiere que el backend esté corriendo en `http://localhost:3000/api`

### Endpoints que el frontend consume:

#### Públicos (sin autenticación):
- `GET /exercises` - Obtener catálogo de ejercicios

#### Protegidos (requieren token JWT):
- `GET /profiles/:id` - Obtener perfil de usuario
- `POST /profiles` - Crear perfil (onboarding)
- `PUT /profiles/:id` - Actualizar perfil
- `GET /routines/:userId` - Obtener rutinas del usuario
- `POST /routines` - Crear nueva rutina
- `POST /workouts/session` - Iniciar sesión de entrenamiento
- `POST /workouts/log` - Registrar set completado

## 🏗️ Estructura del Proyecto

```
fronten-gymai/
├── src/
│   ├── components/
│   │   ├── auth/          # ProtectedRoute
│   │   ├── features/      # ExerciseCard, Timer, etc.
│   │   ├── layout/        # Navbar, Sidebar, MobileMenu
│   │   └── ui/            # Button, Card, Input, Badge
│   ├── context/
│   │   └── AuthContext.jsx    # Gestión de autenticación Supabase
│   ├── lib/
│   │   ├── supabaseClient.js  # Cliente Supabase
│   │   └── utils.js           # Utilidades (cn)
│   ├── pages/
│   │   ├── auth/              # Login, Register
│   │   ├── Dashboard.jsx
│   │   ├── ActiveWorkout.jsx
│   │   ├── RoutineView.jsx
│   │   └── ExerciseLibrary.jsx
│   ├── services/
│   │   └── api.js             # Cliente Axios con interceptor JWT
│   ├── App.jsx
│   └── main.jsx
├── .env                       # Variables de entorno (NO SUBIR A GIT)
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Flujo de Autenticación

1. **Registro**: 
   - Usuario se registra en `/register`
   - Supabase crea cuenta de autenticación
   - Frontend llama a `POST /profiles` para crear perfil en backend
   
2. **Login**:
   - Usuario ingresa credenciales en `/login`
   - Supabase valida y retorna JWT
   - JWT se guarda automáticamente en sesión
   
3. **Peticiones Protegidas**:
   - Axios interceptor obtiene el token de Supabase
   - Adjunta header: `Authorization: Bearer <token>`
   - Backend valida el token en cada petición

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework UI
- **Vite 7** - Build tool
- **Tailwind CSS v4** - Estilos
- **React Router v7** - Navegación
- **Supabase Auth** - Autenticación
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos

## 📱 Características

- ✅ Autenticación completa con Supabase
- ✅ Rutas protegidas
- ✅ Interfaz responsive (Mobile First)
- ✅ Modo oscuro
- ✅ Integración total con backend
- ✅ Registro de entrenamientos en tiempo real
- ✅ Biblioteca de ejercicios
- ✅ Gestión de rutinas
- ✅ Interfaz en español

## 🐛 Solución de Problemas

### Error: "Unauthorized: Invalid token"
- Verifica que el backend esté corriendo
- Confirma que las credenciales de Supabase en `.env` sean correctas
- Reinicia el servidor de desarrollo después de cambiar `.env`

### Error: "exercises.filter is not a function"
- Verifica que el backend retorne un array en `GET /exercises`
- Revisa la consola del navegador para ver el formato de respuesta

### La aplicación no carga
- Verifica que Node.js esté instalado: `node -v`
- Reinstala dependencias: `rm -rf node_modules && npm install`
- Limpia caché de Vite: `rm -rf .vite`

## 📝 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Preview de build de producción
npm run lint     # Ejecuta ESLint
```

## 👥 Contribución

1. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
2. Realiza tus cambios
3. Commit: `git commit -m "Descripción del cambio"`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crea un Pull Request

## 📄 Licencia

Este proyecto es privado y confidencial.
