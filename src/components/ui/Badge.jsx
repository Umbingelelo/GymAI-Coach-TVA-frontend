import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ className, variant = "default", ...props }) {
    const variants = {
        default: "border-transparent bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30",
        secondary: "border-transparent bg-slate-800 text-slate-300 hover:bg-slate-700",
        destructive: "border-transparent bg-red-500/20 text-red-500 hover:bg-red-500/30",
        outline: "text-slate-300 border-slate-700 border",
    };

    return (
        <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2", variants[variant], className)} {...props} />
    );
}
