import { Activity, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        { label: 'Active Pages', value: '7', icon: ShieldCheck, color: 'text-green-600' },
        { label: 'Z-Score Stability', value: '1.42', icon: Activity, color: 'text-institutional-blue' },
        { label: '365-Day Pipeline', value: '100%', icon: Zap, color: 'text-amber-500' },
        { label: 'Total Engagement', value: '42.8k', icon: BarChart3, color: 'text-institutional-indigo' },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-[2rem] flex items-center gap-4 hover:shadow-2xl transition-all group border-none">
                        <div className={`p-4 rounded-2xl bg-white/80 shadow-inner ${stat.color} group-hover:scale-110 transition-transform`}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <p className="text-zen-sage text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                            <h4 className="text-2xl font-bold text-zen-slate">{stat.value}</h4>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] border-none">
                    <h3 className="text-lg font-bold mb-6 text-zen-slate flex items-center gap-2">
                        Institutional Growth Velocity
                    </h3>
                    <div className="h-64 flex items-end gap-3 px-4">
                        {[40, 70, 45, 90, 65, 80, 55, 95].map((h, i) => (
                            <div
                                key={i}
                                style={{ height: `${h}%` }}
                                className="flex-1 bg-institutional-indigo/20 rounded-t-xl hover:bg-institutional-indigo transition-colors relative group"
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zen-slate text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Node {i + 1}: AI Stability {h}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass p-8 rounded-[2.5rem] border-none overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 text-black/5 pointer-events-none">
                        {/* Metatron Placeholder SVG would go here */}
                    </div>
                    <h3 className="text-lg font-bold mb-4 text-zen-slate">Cosmic Window</h3>
                    <div className="text-center py-6">
                        <div className="text-6xl mb-4">🌕</div>
                        <p className="text-xl font-bold text-zen-slate">Full Moon Phase</p>
                        <p className="text-zen-sage mt-2">Maximum Energetic Alignment</p>
                    </div>
                    <button className="w-full btn-primary mt-4">
                        View Transit Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
