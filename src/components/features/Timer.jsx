import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Timer({ className }) {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => setTime(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={cn("flex flex-col items-center gap-2 p-3 bg-slate-800 rounded-xl border border-slate-700", className)}>
            <div className="text-2xl font-mono font-bold text-emerald-400 tracking-wider">
                {formatTime(time)}
            </div>
            <div className="flex gap-2">
                <Button size="icon" className="h-8 w-8" variant={isRunning ? "secondary" : "primary"} onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="icon" className="h-8 w-8" variant="outline" onClick={() => { setIsRunning(false); setTime(0); }}>
                    <RotateCcw className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
