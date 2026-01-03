import { Home, Instagram, Bot, Moon, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../utils/cn';

interface MobileBottomNavProps {
    integrationMode: boolean;
    setIntegrationMode: (mode: boolean) => void;
}

export default function MobileBottomNav({
    integrationMode,
    setIntegrationMode
}: MobileBottomNavProps) {
    const navItems = [
        { id: 'dashboard', label: 'Home', icon: Home, path: '/' },
        { id: 'ig-connections', label: 'Instagram', icon: Instagram, path: '/ig-connections' },
        { id: 'agents', label: 'Super Agents', icon: Bot, path: '/super-agents' },
        { id: 'cosmic', label: 'Cosmic', icon: Moon, path: '/cosmic' },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-white/10">
            <div className="flex items-center justify-around px-2 pb-safe">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            end={item.path === '/'}
                            className={({ isActive }) => cn(
                                "flex flex-col items-center justify-center py-3 px-4 min-w-[64px] transition-all duration-300",
                                isActive ? "text-white" : "text-white/40"
                            )}
                        >
                            <Icon
                                size={22}
                                className="mb-1 transition-all duration-300"
                            />
                            <span className="text-[10px] font-bold uppercase tracking-wider">
                                {item.label}
                            </span>
                        </NavLink>
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
