import React from 'react';
import { Button } from '../components/ui/Button';
import { Dumbbell, ArrowRight, Activity, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">

            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 radial-gradient blur-3xl rounded-full opacity-30 pointer-events-none"></div>

                <div className="bg-slate-900/50 p-3 rounded-2xl mb-6 border border-slate-800 shadow-xl backdrop-blur-sm">
                    <Dumbbell className="h-10 w-10 text-emerald-400" />
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent">
                    GymAI Coach
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
                    Tu entrenador personal inteligente. Registra entrenamientos, sigue tu progreso y alcanza tus metas con precisión.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                    <Link to="/register" className="w-full">
                        <Button size="lg" className="w-full text-lg gap-2 shadow-lg shadow-emerald-500/20">
                            Comenzar Ahora <ArrowRight className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Link to="/login" className="w-full">
                        <Button variant="outline" size="lg" className="w-full text-lg">
                            Iniciar Sesión
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-slate-900/50 py-20 px-4 border-t border-slate-800">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-emerald-500/30 transition-all">
                        <Activity className="h-8 w-8 text-emerald-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Registro Simple</h3>
                        <p className="text-slate-400">Interfaz optimizada para registrar tus series y repeticiones rápidamente.</p>
                    </div>

                    <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-emerald-500/30 transition-all">
                        <TrendingUp className="h-8 w-8 text-blue-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Progreso Real</h3>
                        <p className="text-slate-400">Visualiza tu mejora a lo largo del tiempo con estadísticas claras.</p>
                    </div>

                    <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-emerald-500/30 transition-all">
                        <Dumbbell className="h-8 w-8 text-purple-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Biblioteca Completa</h3>
                        <p className="text-slate-400">Accede a cientos de ejercicios con instrucciones detalladas.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
