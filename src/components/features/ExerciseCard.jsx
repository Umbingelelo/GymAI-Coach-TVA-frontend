import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { ChevronRight, Dumbbell, Target } from 'lucide-react';

export function ExerciseCard({ exercise, onClick }) {
    return (
        <Card className="cursor-pointer hover:border-emerald-500/50 transition-colors group bg-slate-800/50" onClick={onClick}>
            <CardContent className="p-4 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 rounded-lg bg-slate-700/50 flex items-center justify-center text-emerald-500">
                        <Dumbbell className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors">{exercise.name}</h3>
                        <div className="flex gap-2 text-xs text-slate-400 mt-1">
                            <span className="flex items-center gap-1 capitalize"><Target className="h-3 w-3" /> {exercise.target_muscle}</span>
                            {exercise.type && <span>• {exercise.type}</span>}
                        </div>
                    </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </CardContent>
        </Card>
    );
}
