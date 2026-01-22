import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, AlertCircle } from 'lucide-react';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            setIsLoading(false);
            return;
        }

        try {
            await register(email, password, firstName, lastName);
            // Supabase default is auto-sign in unless email confirm is on. 
            // If confirmed required, we should show a message.
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Error al crear cuenta. ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <Card className="w-full max-w-md border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl my-8">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto h-12 w-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-2">
                        <UserPlus className="h-6 w-6 text-emerald-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Crear Cuenta</CardTitle>
                    <p className="text-slate-400 text-sm">Únete a GymAI Coach hoy mismo</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Nombre</label>
                                <Input
                                    placeholder="Juan"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Apellido</label>
                                <Input
                                    placeholder="Pérez"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Correo Electrónico</label>
                            <Input
                                type="email"
                                placeholder="ejemplo@gym.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Contraseña</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Confirmar Contraseña</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-sm text-red-400">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full text-base" size="lg" isLoading={isLoading}>
                            Registrarse
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-400">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
                            Inicia sesión
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
