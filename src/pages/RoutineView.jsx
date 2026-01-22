import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CalendarRange, MoreHorizontal, Plus, Loader2 } from 'lucide-react';
import { endpoints } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function RoutineView() {
    const [routines, setRoutines] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchRoutines = async () => {
            if (!user?.id) return;
            try {
                // Backend requires userId to get routines
                const { data } = await endpoints.getUserRoutines(user.id);
                setRoutines(data);
            } catch (err) {
                console.error('Failed to fetch routines:', err);
                setError('No se pudieron cargar tus rutinas.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoutines();
    }, [user?.id]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-100">Mis Rutinas</h1>
                <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" /> Nueva Rutina
                </Button>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                </div>
            ) : error ? (
                <div className="text-red-400 text-center p-8 border border-red-500/20 rounded-lg bg-red-900/10">
                    {error}
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {routines.length > 0 ? (
                        routines.map(routine => (
                            <Card key={routine.id} className="group hover:border-emerald-500/50 transition-colors cursor-pointer bg-slate-800">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-lg font-medium text-slate-100 border-b border-transparent group-hover:border-emerald-500/20 transition-all font-sans">
                                        {routine.name}
                                    </CardTitle>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-emerald-400">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-400 mb-4">{routine.description || 'Sin descripción'}</p>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <CalendarRange className="h-4 w-4" /> {routine.days || 0} Días / Sem
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-2 text-slate-500 text-center py-12 border border-dashed border-slate-800 rounded-xl">
                            No tienes rutinas creadas aún.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
