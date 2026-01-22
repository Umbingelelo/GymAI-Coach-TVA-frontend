import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Protected Pages
import Dashboard from './pages/Dashboard';
import ActiveWorkout from './pages/ActiveWorkout';
import RoutineView from './pages/RoutineView';
import ExerciseLibrary from './pages/ExerciseLibrary';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected App Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/workout" element={<ActiveWorkout />} />
              <Route path="/routines" element={<RoutineView />} />
              <Route path="/exercises" element={<ExerciseLibrary />} />
            </Route>
          </Route>

          {/* Catch all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
