import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Loader2, AlertCircle } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Error al iniciar sesión. Verifique sus credenciales.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <Card className="w-full max-w-md border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto h-12 w-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-2">
                        <LogIn className="h-6 w-6 text-emerald-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Bienvenido de nuevo</CardTitle>
                    <p className="text-slate-400 text-sm">Ingresa tus credenciales para continuar</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
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

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-sm text-red-400">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full text-base" size="lg" isLoading={isLoading}>
                            Iniciar Sesión
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-400">
                        ¿No tienes cuenta?{' '}
                        <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-medium">
                            Regístrate aquí
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
