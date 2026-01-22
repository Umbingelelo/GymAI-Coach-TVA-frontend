import axios from 'axios';
import { supabase } from '../lib/supabaseClient';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    async (config) => {
        // Get the current session from Supabase
        const { data: { session } } = await supabase.auth.getSession();

        // Check if the route is protected (or just attach to all if session exists)
        // The backend handles 401 if missing, but we must send it if we have it.
        if (session?.access_token) {
            config.headers.Authorization = `Bearer ${session.access_token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export const endpoints = {
    // 1. Ejercicios (Public)
    getExercises: () => api.get('/exercises'),

    // 2. Rutinas (Protected)
    createRoutine: (routineData) => api.post('/routines', routineData),
    getUserRoutines: (userId) => api.get(`/routines/${userId}`),

    // 3. Entrenamientos (Protected)
    startWorkoutSession: (sessionData) => api.post('/workouts/session', sessionData),
    logWorkoutSet: (logData) => api.post('/workouts/log', logData),

    // 4. Perfiles (Protected)
    getProfile: (id) => api.get(`/profiles/${id}`),
    createProfile: (profileData) => api.post('/profiles', profileData),
    updateProfile: (id, profileData) => api.put(`/profiles/${id}`, profileData),
};

export default api;
