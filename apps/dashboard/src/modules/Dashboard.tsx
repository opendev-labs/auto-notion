import { motion } from 'framer-motion';
import {
    Zap,
    Share2,
    UserPlus,
    Moon,
    Link2,
    History,
    Settings,
    ArrowUpRight,
    Activity,
    ShieldCheck,
    Globe
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
    const modules = [
        {
            id: 'automation',
            label: 'Automations',
            icon: Zap,
            path: '/dashboard/automation',
            description: 'n8n Logic Core',
            settings: [
                { label: 'Auto-Sync', type: 'toggle', value: true },
                { label: 'Cloud Mode', type: 'toggle', value: false }
            ]
        },
        {
            id: 'ig-connections',
            label: 'Instagram',
            icon: Share2,
            path: '/dashboard/ig-connections',
            description: 'Meta Graph Nodes',
            settings: [
                { label: 'Live Fetching', type: 'toggle', value: true },
                { label: 'DM Automation', type: 'toggle', value: true }
            ]
        },
        {
            id: 'agents',
            label: 'AI Agents',
            icon: UserPlus,
            path: '/dashboard/agents',
            description: 'Cognitive Engine',
            settings: [
                { label: 'Sentiment AI', type: 'toggle', value: true },
                { label: 'Autonomous Replies', type: 'toggle', value: false }
            ]
        },
        {
            id: 'cosmic',
            label: 'Scheduler',
            icon: Moon,
            path: '/dashboard/cosmic',
            description: 'Chronos Planning',
            settings: [
                { label: 'Smart Scheduling', type: 'toggle', value: true },
                { label: 'Optimal Window', type: 'toggle', value: true }
            ]
        }
    ];

    const stats = [
        { label: 'Engine Load', value: '12%', icon: Activity, color: 'text-white' },
        { label: 'Logic Integrity', value: '99.9%', icon: ShieldCheck, color: 'text-white' },
        { label: 'Cloud Nodes', value: '8 Active', icon: Globe, color: 'text-white' },
    ];

    return (
        <div className="space-y-12">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-3xl flex items-center gap-4 group">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{stat.label}</p>
                            <h4 className="text-xl font-bold text-white">{stat.value}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {modules.map((module) => (
                    <motion.div
                        key={module.id}
                        whileHover={{ y: -5 }}
                        className="glass-dark rounded-[2.5rem] p-8 border-0.5 border-white/5 relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-4 rounded-2xl bg-white/5 text-white/60 group-hover:bg-white group-hover:text-black transition-all duration-500">
                                    <module.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{module.label}</h3>
                                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{module.description}</p>
                                </div>
                            </div>
                            <NavLink
                                to={module.path}
                                className="p-3 rounded-xl bg-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <ArrowUpRight size={20} />
                            </NavLink>
                        </div>

                        {/* Mini Settings for Module */}
                        <div className="space-y-4 pt-6 border-t border-white/5">
                            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-4">Module Controls</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {module.settings.map((setting, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{setting.label}</span>
                                        <div className={`w-8 h-4 rounded-full relative p-0.5 cursor-pointer transition-all ${setting.value ? 'bg-white' : 'bg-white/10'}`}>
                                            <div className={`w-3 h-3 rounded-full shadow-sm transition-all ${setting.value ? 'translate-x-4 bg-black' : 'translate-x-0 bg-white/40'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <NavLink to={module.path} className="mt-8 w-full block text-center py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all">
                            Enter Full Module
                        </NavLink>
                    </motion.div>
                ))}
            </div>

            {/* System Status / Settings Hub */}
            <div className="glass-dark rounded-[3rem] p-10 border border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 border border-white/10">
                            <Settings size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">System Config</h3>
                            <p className="text-zen-sage text-sm font-medium">Control global behavior across all automation nodes.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <NavLink to="/dashboard/settings" className="px-8 py-4 bg-white text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-zen-sage transition-all">
                            System Settings
                        </NavLink>
                        <NavLink to="/dashboard/logs" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                            <History size={14} /> View Audit Logs
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
