import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { endpoints } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
    };

    const register = async (email, password, firstName, lastName) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    // Combine for display name if needed immediately, 
                    // but saving separate fields is better for triggers
                    full_name: `${firstName} ${lastName}`.trim()
                }
            }
        });
        if (error) throw error;

        // Sync with Backend Profile (Onboarding)
        // Note: We perform this best-effort. Supabase creates the Auth user.
        // Ideally we should wait for session to be established or use a database trigger.
        // But per instructions: "POST /profiles - Crear perfil" - we try it here.
        // If auto-confirm is enabled or we get a session immediately:
        if (data.session) {
            try {
                await endpoints.createProfile({
                    id: data.user.id,
                    email: email,
                    first_name: firstName,
                    last_name: lastName
                });
            } catch (profileError) {
                console.error("Failed to create backend profile", profileError);
                // Not throwing here to allow the auth flow to complete
            }
        }
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
