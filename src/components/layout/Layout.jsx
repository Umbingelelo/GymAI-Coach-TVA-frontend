import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileMenu } from './MobileMenu';
import { Navbar } from './Navbar';

export function Layout() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30">
            <Sidebar />
            <Navbar /> {/* Mobile Top Bar */}

            <main className="lg:pl-64 min-h-screen pb-20 lg:pb-0 pt-16 lg:pt-0">
                <div className="container mx-auto p-4 lg:p-8 max-w-7xl animate-in fade-in duration-500">
                    <Outlet />
                </div>
            </main>

            <MobileMenu /> {/* Mobile Bottom Nav */}
        </div>
    );
}
