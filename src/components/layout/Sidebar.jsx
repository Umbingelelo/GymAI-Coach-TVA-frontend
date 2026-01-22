import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { LayoutDashboard, Dumbbell, CalendarRange, LogOut, Library } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Sidebar({ className }) {
    const { logout } = useAuth();

    const links = [
        { href: '/', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/workout', label: 'Active Workout', icon: Dumbbell },
        { href: '/routines', label: 'Routines', icon: CalendarRange },
        { href: '/exercises', label: 'Library', icon: Library },
    ];

    return (
        <aside className={cn("hidden lg:flex flex-col w-64 h-screen bg-slate-900 border-r border-slate-800 fixed left-0 top-0 p-4", className)}>
            <div className="flex items-center gap-2 px-2 mb-8">
                <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Dumbbell className="h-5 w-5 text-slate-900" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-100">GymAI Coach</span>
            </div>

            <nav className="flex-1 space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.href}
                        to={link.href}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                            isActive
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                        )}
                    >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto pt-4 border-t border-slate-800">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
