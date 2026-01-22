import React from 'react';
import { Dumbbell, User, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Navbar() {
    const { session } = useAuth();

    return (
        <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 flex items-center justify-between z-40">
            <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Dumbbell className="h-5 w-5 text-slate-900" />
                </div>
                <span className="text-xl font-bold text-slate-100">GymAI</span>
            </Link>

            {session ? (
                <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <User className="h-4 w-4 text-slate-400" />
                </div>
            ) : (
                <Link to="/login">
                    <Button size="sm" variant="ghost" className="h-8 px-2">
                        <LogIn className="h-4 w-4 mr-2" /> Entrar
                    </Button>
                </Link>
            )}
        </header>
    );
}
