import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { LayoutDashboard, Dumbbell, CalendarRange, Library } from 'lucide-react';

export function MobileMenu() {
    const links = [
        { href: '/', label: 'Home', icon: LayoutDashboard },
        { href: '/workout', label: 'Workout', icon: Dumbbell },
        { href: '/routines', label: 'Routines', icon: CalendarRange },
        { href: '/exercises', label: 'Library', icon: Library },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-4 py-2 lg:hidden z-50 safe-area-bottom pb-safe">
            <div className="flex justify-around items-center">
                {links.map((link) => (
                    <NavLink
                        key={link.href}
                        to={link.href}
                        className={({ isActive }) => cn(
                            "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
                            isActive
                                ? "text-emerald-400"
                                : "text-slate-400 hover:text-slate-200"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <link.icon className={cn("h-6 w-6 mb-1", isActive && "fill-current/20")} />
                                <span className="text-[10px] font-medium">{link.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
