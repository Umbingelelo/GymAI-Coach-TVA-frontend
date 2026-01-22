import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Timer } from '../components/features/Timer';
import { Save, Plus, CheckCircle2 } from 'lucide-react';

export default function ActiveWorkout() {
    // Mock data for current routine
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [exercises, setExercises] = useState([
        { id: 1, name: 'Bench Press', sets: [{ weight: '60', reps: '8', rpe: '7' }] },
        { id: 2, name: 'Squat', sets: [] },
        { id: 3, name: 'Deadlift', sets: [] },
    ]);

    const currentExercise = exercises[currentExerciseIndex];

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

    return (
        <div className="space-y-6 max-w-2xl mx-auto pb-20">
            <div className="flex justify-between items-center sticky top-0 bg-slate-950/95 backdrop-blur py-2 z-10 border-b border-slate-800/50">
                <div>
                    <h1 className="text-xl font-bold text-slate-100">Active Session</h1>
                    <p className="text-xs text-slate-400">Push Day • 45 min</p>
                </div>
                <Timer />
            </div>

            <div className="space-y-4">
                {/* Exercise Header */}
                <div className="flex justify-between items-end px-1">
                    <h2 className="text-2xl font-bold text-emerald-400">{currentExercise.name}</h2>
                    <span className="text-sm text-slate-400">Exercise {currentExerciseIndex + 1} of {exercises.length}</span>
                </div>

                <Card className="border-emerald-500/20">
                    <CardContent className="pt-6 space-y-4">
                        {/* Headers */}
                        <div className="grid grid-cols-10 gap-2 text-xs uppercase tracking-wider text-slate-500 font-semibold text-center mb-2">
                            <div className="col-span-2">Set</div>
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
                                        inputMode="numeric"
                                    />
                                </div>
                            </div>
                        ))}

                        <Button variant="outline" className="w-full mt-4 border-dashed border-slate-700 hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400 text-slate-400" onClick={addSet}>
                            <Plus className="mr-2 h-4 w-4" /> Add Set
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
                    Previous
                </Button>
                <Button
                    className={currentExerciseIndex === exercises.length - 1 ? "bg-emerald-600 hover:bg-emerald-500" : ""}
                    onClick={() => {
                        if (currentExerciseIndex < exercises.length - 1) {
                            setCurrentExerciseIndex(currentExerciseIndex + 1);
                        } else {
                            console.log('Finish Workout', exercises);
                        }
                    }}
                >
                    {currentExerciseIndex < exercises.length - 1 ? 'Next Exercise' : 'Finish Workout'}
                </Button>
            </div>
        </div>
    );
}
