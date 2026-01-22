import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Play, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-slate-100">Welcome Back, Athlete</h1>
                <p className="text-slate-400">Ready to crush your goals today?</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-emerald-500/20 bg-emerald-900/10">
                    <CardHeader>
                        <CardTitle className="text-emerald-400 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Current Streaks
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">12 Days</div>
                        <p className="text-sm text-slate-400 mt-1">Consistency is key!</p>
                    </CardContent>
                </Card>

                {/* Current Routine Summary */}
                <Card className="md:col-span-2 lg:col-span-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Calendar className="h-32 w-32" />
                    </div>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Today's Focus: Upper Body Power</CardTitle>
                            <Badge variant="default">Active Split</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm border-b border-slate-700/50 pb-2">
                                <span className="text-slate-300">Bench Press</span>
                                <span className="text-slate-500">4 sets x 5 reps</span>
                            </div>
                            <div className="flex justify-between text-sm border-b border-slate-700/50 pb-2">
                                <span className="text-slate-300">Pull Ups</span>
                                <span className="text-slate-500">3 sets x failure</span>
                            </div>
                            <div className="flex justify-between text-sm border-b border-slate-700/50 pb-2">
                                <span className="text-slate-300">Overhead Press</span>
                                <span className="text-slate-500">3 sets x 8 reps</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                className="w-full md:w-auto gap-2"
                                size="lg"
                                onClick={() => navigate('/workout')}
                            >
                                <Play className="h-5 w-5" fill="currentColor" />
                                Quick Start Workout
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
