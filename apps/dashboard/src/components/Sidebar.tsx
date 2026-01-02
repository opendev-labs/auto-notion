import React, { useState } from 'react';
import {
    LayoutDashboard,
    Share2,
    Database,
    UserPlus,
    Moon,
    Settings,
    Sparkles,
    Home,
    LogOut,
    Zap
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    integrationMode: boolean;
    setIntegrationMode: (mode: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, integrationMode, setIntegrationMode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'ig-connections', label: 'IG Connections', icon: Share2 },
        { id: 'content', label: 'Content Bank', icon: Database },
        { id: 'agents', label: 'AI Agents', icon: UserPlus },
        { id: 'cosmic', label: 'Cosmic Scheduler', icon: Moon },
        { id: 'automation', label: 'Automation', icon: Zap },
    ];

    return (
        <>
            {/* Sidebar Toggle removed for mobile-first bottom nav approach */}

            <aside className={cn(
                "hidden lg:flex fixed inset-y-0 left-0 z-40 w-80 glass-dark transform transition-transform duration-500 ease-in-out lg:relative lg:translate-x-0 h-full flex-col p-8 text-white border-r-0.5 border-white/5",
                isOpen ? "!flex translate-x-0 shadow-[0_0_100px_rgba(0,0,0,0.9)]" : "lg:flex -translate-x-full"
            )}>
                <div className="flex items-center gap-4 mb-16 px-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden">
                        <img src="/logo.svg" alt="Auto-Notion" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h2 className="font-bold text-xl leading-tight tracking-tight">Auto-Notion</h2>
                        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold font-sans">Institutional Zen</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "nav-item w-full group py-4 transition-all duration-500",
                                    isActive ? "nav-item-active" : "nav-item-inactive"
                                )}
                            >
                                <Icon size={18} className={cn(
                                    "transition-all duration-500",
                                    isActive ? "scale-110" : "group-hover:scale-110 group-hover:text-white"
                                )} />
                                <span className="font-bold text-sm tracking-wide">{item.label}</span>
                            </button>
                        )
                    })}
                </nav>

                {/* Integration Portal Toggle */}
                <div className="border-t border-b border-white/5 py-6">
                    <button
                        onClick={() => setIntegrationMode(!integrationMode)}
                        className={`w-full px-6 py-4 rounded-2xl transition-all duration-500 group ${integrationMode
                            ? 'glass-integration cosmic-glow border border-integration-gold/30'
                            : 'bg-white/5 hover:bg-white/10 border border-white/10'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${integrationMode ? 'bg-integration-gold text-black' : 'bg-white/10 text-white group-hover:bg-white/20'
                                }`}>
                                <Sparkles size={16} className="transition-transform duration-500 group-hover:rotate-12" />
                            </div>
                            <div className="text-left flex-1">
                                <div className={`text-sm font-bold transition-colors ${integrationMode ? 'text-integration-gold' : 'text-white'
                                    }`}>
                                    {integrationMode ? 'Integration Active' : 'Integration Portal'}
                                </div>
                                <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold">
                                    {integrationMode ? 'Consciousness Mode' : 'Enter Portal'}
                                </div>
                            </div>
                        </div>
                    </button>
                </div>

                <div className="mt-auto space-y-4">
                    <div className="flex flex-col gap-2 px-2 mb-4">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="nav-item w-full nav-item-inactive group py-4 bg-white/5 border-white/10"
                        >
                            <Home size={18} className="group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-sm tracking-wide">Back to Site</span>
                        </button>
                        <button
                            onClick={() => signOut(auth).then(() => window.location.href = '/auth')}
                            className="nav-item w-full text-red-400/60 hover:text-red-400 hover:bg-red-400/10 group py-4 transition-all"
                        >
                            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                            <span className="font-bold text-sm tracking-wide">Sign Out</span>
                        </button>
                    </div>

                    <div className="flex gap-4 mb-6 text-[9px] text-white/30 uppercase tracking-[0.15em] font-extrabold px-4">
                        <button onClick={() => { setActiveTab('privacy'); setIsOpen(false); }} className="hover:text-white transition-colors">Privacy</button>
                        <span>•</span>
                        <button onClick={() => { setActiveTab('terms'); setIsOpen(false); }} className="hover:text-white transition-colors">Terms</button>
                    </div>

                    <button className="nav-item w-full nav-item-inactive group py-4 border-t-0.5 border-white/5 rounded-none mt-4">
                        <Settings size={18} className="group-hover:rotate-90 transition-transform duration-700" />
                        <span className="font-bold text-sm tracking-wide">Settings</span>
                    </button>

                    <div className="mt-8 p-6 rounded-3xl bg-white/[0.02] border-0.5 border-white/5">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Efficiency</span>
                            <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-white w-[88%] shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                            </div>
                        </div>
                        <p className="text-[10px] text-white/40 leading-relaxed font-bold italic">
                            "Autonomy is the final step of insight."
                        </p>
                    </div>
                </div>
            </aside>

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
