import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BarChart3, ShieldAlert, LogOut, FlaskConical, User, Menu, X, Map, Palmtree, Hotel, ChevronLeft, ChevronRight } from 'lucide-react';
import { ThemeToggle, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '@project-v-redone/ui';

const sidebarItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Manage Tours', path: '/dashboard/tours', icon: Palmtree },
    { name: 'Manage Accommodations', path: '/dashboard/accommodations', icon: Hotel },
    { name: 'Manage Destinations', path: '/dashboard/destinations', icon: Map },
    { name: 'System Tests', path: '/dashboard/tests', icon: FlaskConical },
    { name: 'Restricted', path: '/dashboard/restricted', icon: ShieldAlert },
];

export const DashboardLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Auto-retract on huge screens if user prefers, but default to expanded
    // Mobile logic: Drawer always full w-64

    return (
        <div className="min-h-screen bg-background text-foreground flex transition-colors duration-300">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed h-full z-40 transition-all duration-300 
                    bg-card/80 backdrop-blur-xl border-r border-border flex flex-col 
                    lg:static lg:translate-x-0
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                    ${isCollapsed ? 'lg:w-[80px]' : 'lg:w-64'}
                    w-64
                `}
            >
                {/* Mobile Close Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="lg:hidden absolute top-6 right-4 p-2 hover:bg-muted/50 rounded-lg transition-colors"
                >
                    <X size={20} className="text-foreground" />
                </button>

                {/* Sidebar Header */}
                <div className={`h-20 flex items-center ${isCollapsed ? 'justify-center' : 'px-6 gap-3'} border-b border-border transition-all duration-300`}>
                    <div className="w-8 h-8 rounded-lg bg-ochre flex items-center justify-center font-serif font-bold text-white shadow-lg shrink-0">
                        LV
                    </div>
                    {!isCollapsed && <span className="font-serif font-bold tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300">Admin</span>}
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                title={isCollapsed ? item.name : ''}
                                className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3'} py-3 rounded-xl transition-all duration-200 group relative
                        ${isActive
                                        ? 'bg-ochre/20 text-ochre border border-ochre/20'
                                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                    }`}
                            >
                                <Icon size={20} className={`${isActive ? 'text-ochre' : 'text-muted-foreground group-hover:text-foreground'} shrink-0`} />
                                {!isCollapsed && <span className="ml-3 text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300">{item.name}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* Sidebar Footer / Toggle */}
                <div className="p-3 border-t border-border hidden lg:flex justify-end">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 hover:bg-muted/50 rounded-lg text-muted-foreground hover:text-foreground transition-colors w-full flex items-center justify-center"
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <div className="flex items-center gap-2 text-xs"><ChevronLeft size={16} /> Collapse</div>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-h-screen bg-background relative overflow-hidden">
                {/* Header */}
                <header className="h-16 lg:h-20 sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 lg:px-8 flex items-center justify-between">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden p-2 hover:bg-muted/50 rounded-lg transition-colors"
                    >
                        <Menu size={24} className="text-foreground" />
                    </button>

                    <h1 className="text-lg lg:text-xl font-medium text-foreground">
                        {sidebarItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
                    </h1>

                    <div className="flex items-center gap-2 lg:gap-4">
                        <div className="bg-muted/30 rounded-full p-2 border border-border">
                            <ThemeToggle />
                        </div>

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none">
                                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-tr from-ochre to-orange-400 border-2 border-border shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                                    <User size={18} className="text-white" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate('/profile')}>
                                    <User size={16} />
                                    <span>Edit Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => navigate('/')}
                                    className="text-destructive focus:text-destructive"
                                >
                                    <LogOut size={16} />
                                    <span>Sign Out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-4 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
