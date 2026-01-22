import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', isLoading, children, ...props }, ref) => {
    const variants = {
        primary: 'bg-emerald-500 text-slate-900 hover:bg-emerald-400 focus:ring-emerald-500',
        secondary: 'bg-slate-700 text-slate-100 hover:bg-slate-600 focus:ring-slate-500',
        outline: 'border border-slate-600 text-slate-300 hover:bg-slate-800 focus:ring-slate-500',
        ghost: 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800/50',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    };

    const sizes = {
        default: 'h-12 px-6 py-2', // Large touch targets
        sm: 'h-9 px-3',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-12 w-12 p-0 flex items-center justify-center',
    };

    return (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900',
                variants[variant],
                sizes[size],
                isLoading && 'opacity-70 pointer-events-none',
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = 'Button';
export { Button };
