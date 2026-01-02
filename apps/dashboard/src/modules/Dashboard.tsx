import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Activity, ShieldCheck, TrendingUp, Zap, Globe, Clock } from 'lucide-react';

const Dashboard = ({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
    const stats = [
        { label: 'Running Automations', value: '7', icon: Zap, color: 'text-white' },
        { label: 'Automation Success Rate', value: '99.8%', icon: ShieldCheck, color: 'text-white' },
        { label: 'System Uptime', value: '100%', icon: Globe, color: 'text-white' },
        { label: 'Total Actions Executed', value: '42.8k', icon: Activity, color: 'text-white' },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } as any }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        className="glass p-5 md:p-8 rounded-[2.5rem] flex items-center gap-4 md:gap-6 group"
                    >
                        <div className={`p-4 md:p-5 rounded-3xl bg-white/5 border-0.5 border-white/10 ${stat.color} group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-700 shadow-2xl`}>
                            <stat.icon size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                            <h4 className="text-xl md:text-2xl font-bold text-white tracking-tighter">{stat.value}</h4>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-2 glass p-5 md:p-10 rounded-[2rem] md:rounded-[3rem] border-white/5 relative overflow-hidden group"
                >
                    <div className="flex justify-between items-center mb-10">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                                Automation Executions Over Time
                                <TrendingUp size={20} className="text-white/40" />
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="status-pulse"><div className="status-pulse-inner" /></div>
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Instagram & Notion Automations Active</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {['7D', '1M', '1Y'].map(t => (
                                <button key={t} className="px-3 py-1 rounded-lg bg-white/5 border-0.5 border-white/10 text-[9px] font-bold text-white/40 hover:text-white hover:bg-white/10 transition-all">{t}</button>
                            ))}
                        </div>
                    </div>
                    <div className="h-72 flex items-end gap-4 px-2">
                        {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: 0.5 + (i * 0.05), duration: 1, ease: "easeOut" as any }}
                                className="flex-1 bg-white/5 border-t-0.5 border-x-0.5 border-white/10 rounded-t-2xl hover:bg-white group/bar transition-all duration-700 relative"
                            >
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1.5 rounded-xl text-[10px] font-bold opacity-0 group-hover/bar:opacity-100 transition-all duration-500 whitespace-nowrap shadow-2xl">
                                    {h}% Success
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="glass p-5 md:p-10 rounded-[2rem] md:rounded-[3rem] border-white/5 flex flex-col justify-between group"
                >
                    <div>
                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-xl font-bold text-white tracking-tight">Scheduler Status</h3>
                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                                <Clock size={10} className="text-white/40" />
                                <span className="text-[9px] font-bold text-white/40 tracking-widest uppercase">System Active</span>
                            </div>
                        </div>
                        <div className="text-center py-8 md:py-10 rounded-3xl bg-white/[0.02] border-0.5 border-white/5 group-hover:bg-white/[0.04] transition-all duration-700">
                            <div className="flex flex-col items-center mb-6">
                                <div className="text-4xl mb-2">Optimal posting window</div>
                                <div className="text-green-400 font-bold text-sm tracking-widest">ACTIVE NOW</div>
                            </div>
                            <p className="text-2xl font-bold text-white tracking-tight">High Engagement Period</p>
                            <p className="text-white/30 text-xs mt-3 font-bold tracking-widest uppercase">Based on Meta Analytics Performance</p>
                        </div>
                    </div>
                    <button onClick={() => onNavigate?.('cosmic')} className="w-full btn-secondary mt-10">
                        Create Scheduled Automation
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
