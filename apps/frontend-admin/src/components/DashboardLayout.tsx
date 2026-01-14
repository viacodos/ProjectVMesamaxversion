import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Plus, Packagesearch, ShieldAlert, LogOut, Settings, FlaskConical } from 'lucide-react';
import { ThemeToggle } from '@project-v-redone/ui';

const sidebarItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Add Package', path: '/dashboard/add-package', icon: Plus },
    { name: 'Review Packages', path: '/dashboard/manage-packages', icon: Packagesearch },
    { name: 'System Tests', path: '/dashboard/tests', icon: FlaskConical },
    { name: 'Restricted', path: '/dashboard/restricted', icon: ShieldAlert },
];

export const DashboardLayout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-glass-dark backdrop-blur-xl border-r border-white/10 flex flex-col fixed h-full z-20">
                <div className="h-20 flex items-center gap-3 px-6 border-b border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-ochre flex items-center justify-center font-serif font-bold text-white shadow-lg">
                        LV
                    </div>
                    <span className="font-serif font-bold tracking-wide">Admin</span>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                        ${isActive
                                        ? 'bg-ochre/20 text-ochre border border-ochre/20'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} className={isActive ? 'text-ochre' : 'text-gray-500 group-hover:text-white'} />
                                <span className="text-sm font-medium">{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <Link to="/" className="flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut size={20} />
                        <span className="text-sm font-medium">Sign Out</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
                {/* Header */}
                <header className="h-20 sticky top-0 z-10 bg-gray-900/80 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between">
                    <h1 className="text-xl font-medium text-white/90">
                        {sidebarItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/5 rounded-full p-2 border border-white/10">
                            <ThemeToggle />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-ochre to-orange-400 border-2 border-white/20 shadow-lg" />
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
