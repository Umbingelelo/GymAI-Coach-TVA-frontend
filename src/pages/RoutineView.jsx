import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CalendarRange, MoreHorizontal, Plus } from 'lucide-react';

export default function RoutineView() {
    const [routines] = useState([
        { id: 1, name: 'PPL - Push', description: 'Chest, Shoulders, Triceps', days: 1 },
        { id: 2, name: 'PPL - Pull', description: 'Back, Biceps', days: 1 },
        { id: 3, name: 'PPL - Legs', description: 'Quads, Hams, Calves', days: 1 },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-100">My Routines</h1>
                <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" /> New Routine
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {routines.map(routine => (
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
                            <p className="text-sm text-slate-400 mb-4">{routine.description}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                    <CalendarRange className="h-4 w-4" /> {routine.days} Days / Week
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
