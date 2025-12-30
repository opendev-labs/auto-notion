import React, { useState } from 'react';
import {
    LayoutDashboard,
    Share2,
    Database,
    UserPlus,
    Moon,
    Settings,
    CircleCheckBig
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'ig-connections', label: 'IG Connections', icon: Share2 },
        { id: 'content', label: 'Content Bank', icon: Database },
        { id: 'agents', label: 'AI Agents', icon: UserPlus },
        { id: 'cosmic', label: 'Cosmic Scheduler', icon: Moon },
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-6 right-6 z-50 p-3 glass rounded-xl text-white shadow-2xl"
            >
                <LayoutDashboard size={24} />
            </button>

            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-72 glass-dark transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 h-full flex flex-col p-6 text-white border-r border-white/5",
                isOpen ? "translate-x-0 shadow-[0_0_50px_rgba(0,0,0,0.8)]" : "-translate-x-full"
            )}>
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-10 h-10 bg-institutional-indigo rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <CircleCheckBig size={24} />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg leading-tight">Auto-Notion</h2>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold font-sans">Institutional Zen</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
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
                                    "nav-item w-full group",
                                    isActive ? "nav-item-active" : "nav-item-inactive"
                                )}
                            >
                                <Icon size={20} className={cn(
                                    "transition-transform duration-300",
                                    isActive ? "scale-110" : "group-hover:scale-110"
                                )} />
                                <span className="font-medium text-sm">{item.label}</span>
                            </button>
                        )
                    })}
                </nav>

                <div className="mt-auto space-y-2">
                    <div className="flex gap-2 mb-4 text-[10px] text-white/30 uppercase tracking-widest font-bold px-4">
                        <button onClick={() => { setActiveTab('privacy'); setIsOpen(false); }} className="hover:text-white transition-colors">Privacy</button>
                        <span>•</span>
                        <button onClick={() => { setActiveTab('terms'); setIsOpen(false); }} className="hover:text-white transition-colors">Terms</button>
                        <span>•</span>
                        <button onClick={() => { setActiveTab('deletion'); setIsOpen(false); }} className="hover:text-white transition-colors">Delete</button>
                    </div>
                    <button className="nav-item w-full nav-item-inactive group">
                        <Settings size={20} className="group-hover:rotate-45 transition-transform duration-500" />
                        <span className="font-medium text-sm">Settings</span>
                    </button>

                    <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold text-zen-sand uppercase tracking-tighter">Mission Status</span>
                            <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-zen-sand w-[85%] animate-pulse" />
                            </div>
                        </div>
                        <p className="text-[10px] text-white/60 leading-relaxed font-sans">
                            "Integration makes you walk through the door."
                        </p>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
