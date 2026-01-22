import React, { useState, useEffect } from 'react';
import { ExerciseCard } from '../components/features/ExerciseCard';
import { Input } from '../components/ui/Input';
import { Search, Loader2 } from 'lucide-react';
import { endpoints } from '../services/api';

export default function ExerciseLibrary() {
    const [exercises, setExercises] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const { data } = await endpoints.getExercises();
                // Handle various response structures (Array direct, or wrapped in object)
                if (Array.isArray(data)) {
                    setExercises(data);
                } else if (data && Array.isArray(data.data)) {
                    setExercises(data.data);
                } else if (data && Array.isArray(data.exercises)) {
                    setExercises(data.exercises);
                } else {
                    console.error('Unexpected exercises data format:', data);
                    setExercises([]);
                }
            } catch (err) {
                console.error('Failed to fetch exercises:', err);
                setError('No se pudieron cargar los ejercicios.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchExercises();
    }, []);

    const filtered = exercises.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-100">Biblioteca de Ejercicios</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Buscar ejercicios..."
                        className="pl-9"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
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
                <div className="space-y-3">
                    {filtered.length > 0 ? (
                        filtered.map(ex => (
                            <ExerciseCard key={ex.id} exercise={ex} onClick={() => console.log('View', ex)} />
                        ))
                    ) : (
                        <div className="text-slate-500 text-center py-8">
                            No se encontraron ejercicios.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
