import { Moon, Sun, Sparkles, Map } from 'lucide-react';

const CosmicPlanner = () => {
    const windows = [
        { time: '18:00', event: 'Lunar Peak', auspicious: true, phase: 'Full Moon' },
        { time: '21:30', event: 'Mercury Direct', auspicious: true, phase: 'Growth window' },
        { time: '04:00', event: 'Brahma Muhurta', auspicious: true, phase: 'Dawn sync' },
    ];

    return (
        <div className="space-y-8">
            <div className="glass p-10 rounded-[3rem] border-none flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zen-sand/20 border border-zen-sand/30 text-zen-clay font-bold text-xs uppercase tracking-widest">
                        <Sparkles size={14} />
                        Energetic Forecast
                    </div>
                    <h2 className="text-4xl font-bold text-zen-slate">Celestial Alignment</h2>
                    <p className="text-zen-sage text-lg leading-relaxed">
                        Missions Control is currently hard-synced to the lunar cycle. All automated posts are gated by these auspicious windows to maximize collective integration.
                    </p>
                </div>
                <div className="w-full md:w-64 aspect-square glass-dark rounded-[2.5rem] flex flex-col items-center justify-center text-white p-8">
                    <Moon size={80} className="mb-4 text-zen-sand drop-shadow-[0_0_20px_rgba(194,178,128,0.4)]" />
                    <p className="text-xl font-bold">Waxing Gibbous</p>
                    <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">92% Illumination</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {windows.map((win, i) => (
                    <div key={i} className="glass p-8 rounded-[2rem] border-none group hover:translate-y-[-8px] transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-white/50 rounded-2xl flex items-center justify-center text-zen-clay">
                                {i === 1 ? <Sun size={24} /> : <Map size={24} />}
                            </div>
                            <span className="text-2xl font-bold text-zen-slate">{win.time}</span>
                        </div>
                        <h4 className="font-bold text-lg text-zen-slate mb-1">{win.event}</h4>
                        <p className="text-sm text-zen-sage mb-4">{win.phase}</p>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-green-600 bg-green-50 w-fit px-3 py-1 rounded-full">
                            <CheckCircle size={10} />
                            Auspicious Window
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CheckCircle = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
)

export default CosmicPlanner;
