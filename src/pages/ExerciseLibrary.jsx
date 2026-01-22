import React, { useState, useEffect } from 'react';
import { ExerciseCard } from '../components/features/ExerciseCard';
import { Input } from '../components/ui/Input';
import { Search } from 'lucide-react';

export default function ExerciseLibrary() {
    const [exercises, setExercises] = useState([]);
    const [search, setSearch] = useState('');

    // Mock data
    useEffect(() => {
        const mockExercises = [
            { id: 1, name: 'Bench Press', target_muscle: 'chest', type: 'Compound' },
            { id: 2, name: 'Squat', target_muscle: 'legs', type: 'Compound' },
            { id: 3, name: 'Deadlift', target_muscle: 'back', type: 'Compound' },
            { id: 4, name: 'Overhead Press', target_muscle: 'shoulders', type: 'Compound' },
            { id: 5, name: 'Barbell Row', target_muscle: 'back', type: 'Compound' },
            { id: 6, name: 'Face Pull', target_muscle: 'rear delts', type: 'Isolation' },
            { id: 7, name: 'Lateral Raise', target_muscle: 'side delts', type: 'Isolation' },
        ];
        setExercises(mockExercises);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filtered = exercises.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-slate-100">Exercise Library</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search exercises..."
                        className="pl-9"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-3">
                {filtered.map(ex => (
                    <ExerciseCard key={ex.id} exercise={ex} onClick={() => console.log('View', ex)} />
                ))}
            </div>
        </div>
    );
}
