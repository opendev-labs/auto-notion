// Mobile Bottom Navigation Component
// App-like navigation bar for mobile devices

import { Home, Instagram, Bot, Moon, Sparkles } from 'lucide-react';
import { cn } from '../utils/cn';

interface MobileBottomNavProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    integrationMode: boolean;
    setIntegrationMode: (mode: boolean) => void;
}

export default function MobileBottomNav({
    activeTab,
    setActiveTab,
    integrationMode,
    setIntegrationMode
}: MobileBottomNavProps) {
    const navItems = [
        { id: 'dashboard', label: 'Home', icon: Home },
        { id: 'ig-connections', label: 'Instagram', icon: Instagram },
        { id: 'agents', label: 'Agents', icon: Bot },
        { id: 'cosmic', label: 'Cosmic', icon: Moon },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-white/10">
            <div className="flex items-center justify-around px-2 pb-safe">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "flex flex-col items-center justify-center py-3 px-4 min-w-[64px] transition-all duration-300",
                                isActive ? "text-white" : "text-white/40"
                            )}
                        >
                            <Icon
                                size={22}
                                className={cn(
                                    "mb-1 transition-all duration-300",
                                    isActive && "scale-110"
                                )}
                            />
                            <span className="text-[10px] font-bold uppercase tracking-wider">
                                {item.label}
                            </span>
                        </button>
                    );
                })}

                {/* Integration Portal Toggle */}
                <button
                    onClick={() => setIntegrationMode(!integrationMode)}
                    className={cn(
                        "flex flex-col items-center justify-center py-3 px-4 min-w-[64px] transition-all duration-300",
                        integrationMode ? "text-integration-gold" : "text-white/40"
                    )}
                >
                    <Sparkles
                        size={22}
                        className={cn(
                            "mb-1 transition-all duration-300",
                            integrationMode && "scale-110 fill-integration-gold"
                        )}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                        Portal
                    </span>
                </button>
            </div>
        </div>
    );
}
