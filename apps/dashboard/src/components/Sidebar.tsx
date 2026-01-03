import React, { useState } from 'react';
import {
    LayoutDashboard,
    Share2,
    UserPlus,
    Moon,
    Settings,
    Zap,
    History,
    Link2,
    BookOpen,
    Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NavLink } from 'react-router-dom';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    collapsed,
    setCollapsed
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { id: 'automation', label: 'Automations', icon: Zap, path: '/automation' },
        { id: 'ig-connections', label: 'Instagram', icon: Share2, path: '/ig-connections' },
        { id: 'content', label: 'Content Library', icon: BookOpen, path: '/content' },
        { id: 'agents', label: 'AI SuperAgents', icon: UserPlus, path: '/super-agents' },
        { id: 'cosmic', label: 'Scheduler', icon: Moon, path: '/cosmic' },
        { id: 'integrations', label: 'Integrations', icon: Link2, path: '/integrations' },
        { id: 'logs', label: 'Logs & History', icon: History, path: '/logs' },
    ];

    return (
        <>
            <motion.aside
                initial={false}
                animate={{
                    width: collapsed ? 100 : 320,
                    x: 0
                }}
                className={cn(
                    "hidden lg:flex fixed inset-y-0 left-0 z-40 glass-dark h-full flex-col p-8 text-white border-r-0.5 border-white/5 relative shrink-0 overflow-hidden",
                    isOpen ? "!flex translate-x-0 shadow-[0_0_100px_rgba(0,0,0,0.9)]" : "lg:flex"
                )}
            >
                {/* Collapse Toggle */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute right-4 top-8 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/40 hover:text-white transition-all z-50"
                >
                    <Activity size={16} className={cn("transition-transform duration-500", collapsed ? "rotate-180" : "rotate-0")} />
                </button>

                <div className={cn("flex items-center gap-4 mb-16 px-2 overflow-hidden whitespace-nowrap", collapsed && "justify-center px-0")}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                        <img src="/logo.svg" alt="Auto-Notion" className="w-full h-full object-contain" />
                    </div>
                    {!collapsed && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="font-bold text-xl leading-tight tracking-tight">Auto-Notion</h2>
                            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold font-sans">Institutional Zen</p>
                        </motion.div>
                    )}
                </div>

                <nav className="flex-1 space-y-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                end={item.path === '/dashboard'}
                                onClick={() => setIsOpen(false)}
                                title={collapsed ? item.label : ""}
                                className={({ isActive }) => cn(
                                    "nav-item w-full group py-4 transition-all duration-500 flex items-center gap-3 px-4 rounded-lg",
                                    collapsed ? "justify-center" : "justify-start",
                                    isActive ? "nav-item-active bg-white/10 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" : "nav-item-inactive text-white/40 hover:bg-white/5"
                                )}
                            >
                                <Icon size={18} className="transition-all duration-500 group-hover:scale-110 shrink-0" />
                                {!collapsed && <span className="font-bold text-sm tracking-wide">{item.label}</span>}
                            </NavLink>
                        )
                    })}
                </nav>

                <div className={cn("mt-auto pb-6", collapsed && "flex flex-col items-center")}>
                    {!collapsed && (
                        <div className="flex gap-4 mb-6 text-[9px] text-white/30 uppercase tracking-[0.15em] font-extrabold px-4">
                            <NavLink to="/privacy" className="hover:text-white transition-colors">Privacy</NavLink>
                            <span>•</span>
                            <NavLink to="/terms" className="hover:text-white transition-colors">Terms</NavLink>
                        </div>
                    )}

                    <NavLink
                        to="/settings"
                        title={collapsed ? "Settings" : ""}
                        className={({ isActive }) => cn(
                            "nav-item w-full group py-4 border-t-0.5 border-white/5 rounded-none mt-4 flex items-center gap-3 px-4",
                            collapsed ? "justify-center" : "justify-start",
                            isActive ? "text-white" : "text-white/40"
                        )}
                    >
                        <Settings size={18} className="group-hover:rotate-90 transition-transform duration-700 shrink-0" />
                        {!collapsed && <span className="font-bold text-sm tracking-wide">Settings</span>}
                    </NavLink>
                </div>
            </motion.aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-30 lg:hidden transition-opacity duration-500"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
