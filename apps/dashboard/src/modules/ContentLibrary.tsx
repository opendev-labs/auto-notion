import { motion } from 'framer-motion';
import { BookOpen, Search, Grid, List, Plus, Database, FileText } from 'lucide-react';

const ContentLibrary: React.FC = () => {
    const materials = [
        { id: '1', title: 'Institutional Brand Guidelines', type: 'PDF', status: 'SYNCHRONIZED', date: 'Dec 28, 2025' },
        { id: '3', title: 'Q1 Instagram Content Matrix', type: 'SHEET', status: 'SYNCHRONIZED', date: 'Dec 30, 2025' },
        { id: '4', title: 'Product Launch Visuals (2026)', type: 'FOLDER', status: 'ACTIVE', date: 'Jan 01, 2026' },
        { id: '5', title: 'AI Sentiment Benchmarks', type: 'DOC', status: 'DEployed', date: 'Jan 02, 2026' },
    ];

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Content Library</h2>
                    <p className="text-zen-sage text-sm font-medium">Institutional repository for all automation assets and knowledge bases.</p>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-zen-sage transition-all shadow-xl">
                    <Plus size={16} /> Import New Asset
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 space-y-6">
                    <div className="glass-dark p-6 rounded-3xl border border-white/5 space-y-6">
                        <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Navigation</h3>
                        <nav className="space-y-2">
                            {[
                                { label: 'All Assets', count: 124, active: true },
                                { label: 'Working Copies', count: 12 },
                                { label: 'Post Templates', count: 48 },
                                { label: 'Research Data', count: 64 },
                            ].map((item, i) => (
                                <button key={i} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-white/10 text-white' : 'text-white/40 hover:bg-white/5'}`}>
                                    <span className="text-xs font-bold">{item.label}</span>
                                    <span className="text-[9px] font-black px-2 py-0.5 bg-white/5 rounded-md">{item.count}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="glass-dark p-6 rounded-3xl border border-white/5">
                        <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Storage Metrics</h3>
                        <div className="space-y-4">
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-white w-3/4 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                            </div>
                            <div className="flex justify-between text-[9px] font-black text-white/40 uppercase tracking-widest">
                                <span>750 MB Used</span>
                                <span>1 GB Total</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-3 space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="relative flex-1 w-full max-w-sm">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                            <input
                                type="text"
                                placeholder="Search library..."
                                className="w-full bg-black/40 border-0.5 border-white/10 rounded-xl pl-12 pr-4 py-3 text-xs text-white outline-none focus:border-white/40 transition-all font-medium"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/40"><Grid size={16} /></button>
                            <button className="p-3 bg-white text-black rounded-xl"><List size={16} /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {materials.map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ y: -4 }}
                                className="glass-dark p-6 rounded-3xl border border-white/5 group hover:border-white/10 transition-all"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-3 bg-white/5 rounded-xl text-white/60 group-hover:bg-white group-hover:text-black transition-all">
                                        {item.type === 'PDF' && <FileText size={20} />}
                                        {item.type === 'SHEET' && <Database size={20} />}
                                        {item.type === 'FOLDER' && <BookOpen size={20} />}
                                        {item.type === 'DOC' && <FileText size={20} />}
                                    </div>
                                    <span className="text-[9px] font-black px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-white/30 uppercase tracking-widest group-hover:border-white/20 transition-all">
                                        {item.status}
                                    </span>
                                </div>
                                <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                                <div className="flex items-center gap-3 text-[9px] font-black text-white/20 uppercase tracking-widest">
                                    <span>{item.type}</span>
                                    <span>•</span>
                                    <span>MODIFIED {item.date}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentLibrary;
