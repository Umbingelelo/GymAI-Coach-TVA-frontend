import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Timer } from '../components/features/Timer';
import { Save, Plus, CheckCircle2, Loader2, Play } from 'lucide-react';
import { endpoints } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ActiveWorkout() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Session State
    const [sessionId, setSessionId] = useState(null);
    const [isStarting, setIsStarting] = useState(false);

    // For Demo Purposes - In a real app we'd fetch the selected routine via ID from URL
    // Here we'll just show an interface to "Start" a general session if no routine is active.

    const [exercises, setExercises] = useState([
        { id: 1, name: 'Press de Banca', sets: [] },
        { id: 2, name: 'Sentadilla', sets: [] },
    ]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

    const currentExercise = exercises[currentExerciseIndex];

    const startSession = async () => {
        setIsStarting(true);
        try {
            const { data } = await endpoints.startWorkoutSession({
                userId: user.id,
                startedAt: new Date().toISOString()
            });
            // Assuming backend returns { id: 'sessionId' }
            setSessionId(data.id || 'demo-session-id');
        } catch (error) {
            console.error("Error starting session", error);
            // Fallback for demo if backend fails or is not ready
            setSessionId('local-session-' + Date.now());
        } finally {
            setIsStarting(false);
        }
    };

    const addSet = () => {
        const newExercises = [...exercises];
        newExercises[currentExerciseIndex].sets.push({ weight: '', reps: '', rpe: '' });
        setExercises(newExercises);
    };

    const updateSet = (setIndex, field, value) => {
        const newExercises = [...exercises];
        newExercises[currentExerciseIndex].sets[setIndex][field] = value;
        setExercises(newExercises);
    };

    const logSet = async (setIndex) => {
        const set = currentExercise.sets[setIndex];
        if (!set.weight || !set.reps) return;

        const payload = {
            sessionId: sessionId,
            exerciseId: currentExercise.id,
            weight: parseFloat(set.weight),
            reps: parseInt(set.reps),
            rpe: parseInt(set.rpe || 0)
        };

        try {
            await endpoints.logWorkoutSet(payload);
            // Visual feedback could be added here
            console.log("Set logged:", payload);
        } catch (err) {
            console.error("Failed to log set", err);
        }
    };

    if (!sessionId) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="bg-emerald-500/10 p-6 rounded-full">
                    <Play className="h-12 w-12 text-emerald-500 ml-1" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Iniciar Nuevo Entrenamiento</h1>
                    <p className="text-slate-400 max-w-xs mx-auto mt-2">
                        Comienza una nueva sesión de entrenamiento para registrar tu progreso.
                    </p>
                </div>
                <Button size="lg" onClick={startSession} isLoading={isStarting} className="w-full max-w-sm">
                    Comenzar Sesión
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto pb-20">
            <div className="flex justify-between items-center sticky top-0 bg-slate-950/95 backdrop-blur py-2 z-10 border-b border-slate-800/50">
                <div>
                    <h1 className="text-xl font-bold text-slate-100">Sesión Activa</h1>
                    <p className="text-xs text-slate-400">En Progreso • General</p>
                </div>
                <Timer />
            </div>

            <div className="space-y-4">
                {/* Exercise Header */}
                <div className="flex justify-between items-end px-1">
                    <h2 className="text-2xl font-bold text-emerald-400">{currentExercise.name}</h2>
                    <span className="text-sm text-slate-400">Ejercicio {currentExerciseIndex + 1} de {exercises.length}</span>
                </div>

                <Card className="border-emerald-500/20">
                    <CardContent className="pt-6 space-y-4">
                        {/* Headers */}
                        <div className="grid grid-cols-10 gap-2 text-xs uppercase tracking-wider text-slate-500 font-semibold text-center mb-2">
                            <div className="col-span-2">Serie</div>
                            <div className="col-span-3">kg</div>
                            <div className="col-span-3">Reps</div>
                            <div className="col-span-2">RPE</div>
                        </div>

                        {currentExercise.sets.map((set, idx) => (
                            <div key={idx} className="grid grid-cols-10 gap-2 items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="col-span-2 flex justify-center">
                                    <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300">
                                        {idx + 1}
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        className="text-center h-10 font-mono text-lg"
                                        value={set.weight}
                                        onChange={(e) => updateSet(idx, 'weight', e.target.value)}
                                        onBlur={() => logSet(idx)} // Log on blur
                                        inputMode="decimal"
                                    />
                                </div>
                                <div className="col-span-3">
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        className="text-center h-10 font-mono text-lg"
                                        value={set.reps}
                                        onChange={(e) => updateSet(idx, 'reps', e.target.value)}
                                        onBlur={() => logSet(idx)} // Log on blur
                                        inputMode="numeric"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Input
                                        type="number"
                                        placeholder="-"
                                        max={10}
                                        className="text-center h-10 font-mono text-lg"
                                        value={set.rpe}
                                        onChange={(e) => updateSet(idx, 'rpe', e.target.value)}
                                        onBlur={() => logSet(idx)} // Log on blur
                                        inputMode="numeric"
                                    />
                                </div>
                            </div>
                        ))}

                        <Button variant="outline" className="w-full mt-4 border-dashed border-slate-700 hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400 text-slate-400" onClick={addSet}>
                            <Plus className="mr-2 h-4 w-4" /> Agregar Serie
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-4">
                <Button
                    className="flex-1"
                    variant="secondary"
                    onClick={() => setCurrentExerciseIndex(Math.max(0, currentExerciseIndex - 1))}
                    disabled={currentExerciseIndex === 0}
                >
                    Anterior
                </Button>
                <Button
                    className={currentExerciseIndex === exercises.length - 1 ? "bg-emerald-600 hover:bg-emerald-500" : ""}
                    onClick={() => {
                        if (currentExerciseIndex < exercises.length - 1) {
                            setCurrentExerciseIndex(currentExerciseIndex + 1);
                        } else {
                            navigate('/dashboard');
                        }
                    }}
                >
                    {currentExerciseIndex < exercises.length - 1 ? 'Siguiente Ejercicio' : 'Finalizar'}
                </Button>
            </div>
        </div>
    );
}
