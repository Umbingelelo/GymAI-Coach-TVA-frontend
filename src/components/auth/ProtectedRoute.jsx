import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute() {
    const { session, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-emerald-500">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
