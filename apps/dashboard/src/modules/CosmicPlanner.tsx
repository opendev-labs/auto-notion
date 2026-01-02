
import { useState } from 'react';
import { Moon, Sun, Sparkles, Map, Database, Layout, Calendar, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentEngine } from './ContentEngine';
import type { ContentItem } from './ContentEngine';

const engine = new ContentEngine();

const CosmicPlanner = () => {
    const [activeTab, setActiveTab] = useState<'forecast' | 'generator' | 'scheduled'>('forecast');

    return (
        <div className="space-y-8">
            {/* Header / Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Scheduler</h2>
                    <p className="text-gray-400 font-medium">Manage and optimize your automated content delivery.</p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                    <TabButton active={activeTab === 'forecast'} onClick={() => setActiveTab('forecast')} icon={Sparkles} label="Market Forecast" />
                    <TabButton active={activeTab === 'generator'} onClick={() => setActiveTab('generator')} icon={Database} label="Content Generator" />
                    <TabButton active={activeTab === 'scheduled'} onClick={() => setActiveTab('scheduled')} icon={Calendar} label="Scheduled" />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'forecast' && (
                    <motion.div key="forecast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                        <ForecastView />
                    </motion.div>
                )}
                {activeTab === 'generator' && (
                    <motion.div key="generator" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                        <GeneratorView />
                    </motion.div>
                )}
                {activeTab === 'scheduled' && (
                    <motion.div key="scheduled" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                        <div className="glass p-20 rounded-lg text-center border-white/10">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                                <Calendar size={32} className="text-gray-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Mission Log Empty</h3>
                            <p className="text-gray-500">Generate a plan to populate your mission control.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Sub-Components ---

const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-bold text-xs uppercase tracking-wider transition-all ${active ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`}
    >
        <Icon size={14} />
        {label}
    </button>
);

const ForecastView = () => {
    const windows = [
        { time: '18:00', event: 'Lunar Peak', auspicious: true, phase: 'Full Moon' },
        { time: '21:30', event: 'Mercury Direct', auspicious: true, phase: 'Growth window' },
        { time: '04:00', event: 'Brahma Muhurta', auspicious: true, phase: 'Dawn sync' },
    ];

    return (
        <div className="space-y-8">
            <div className="glass p-10 rounded-lg border border-white/10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold text-xs uppercase tracking-widest">
                        <Sparkles size={14} />
                        Energetic Forecast
                    </div>
                    <h2 className="text-4xl font-bold text-white">Celestial Alignment</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Missions Control is currently hard-synced to the lunar cycle. All automated posts are gated by these auspicious windows to maximize collective integration.
                    </p>
                </div>
                <div className="w-full md:w-64 aspect-square glass-dark rounded-lg flex flex-col items-center justify-center text-white p-8 bg-black/80 border border-white/10">
                    <Moon size={80} className="mb-4 text-indigo-300 drop-shadow-[0_0_20px_rgba(165,180,252,0.4)]" />
                    <p className="text-xl font-bold">Waxing Gibbous</p>
                    <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">92% Illumination</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {windows.map((win, i) => (
                    <div key={i} className="glass p-8 rounded-lg border border-white/10 group hover:translate-y-[-4px] transition-all bg-white/[0.02]">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-white/5 rounded-md flex items-center justify-center text-indigo-300 border border-white/5">
                                {i === 1 ? <Sun size={24} /> : <Map size={24} />}
                            </div>
                            <span className="text-2xl font-bold text-white">{win.time}</span>
                        </div>
                        <h4 className="font-bold text-lg text-white mb-1">{win.event}</h4>
                        <p className="text-sm text-gray-400 mb-4">{win.phase}</p>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-green-400 bg-green-500/10 border border-green-500/20 w-fit px-3 py-1 rounded-md">
                            <CheckCircle2 size={10} />
                            Auspicious Window
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const GeneratorView = () => {
    const [selectedPage, setSelectedPage] = useState("MythicWisdom");
    const [generatedPlan, setGeneratedPlan] = useState<ContentItem[]>([]);
    const [selectedPost, setSelectedPost] = useState<ContentItem | null>(null);

    const handleGenerate = () => {
        const plan = engine.generateContentPlan(selectedPage, 7); // 7 days
        setGeneratedPlan(plan);
    };

    return (
        <div className="space-y-8">
            <div className="glass p-8 rounded-lg border border-white/10 flex flex-col md:flex-row items-center gap-8 justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Content Engine</h3>
                    <p className="text-gray-400 max-w-md">Select a strategy profile to generate a high-fidelity content plan aligned with your brand voice.</p>
                </div>
                <div className="flex items-center gap-4 bg-black/80 p-2 rounded-lg border border-white/10">
                    <select
                        value={selectedPage}
                        onChange={(e) => setSelectedPage(e.target.value)}
                        className="bg-transparent text-white font-bold px-4 py-3 outline-none cursor-pointer"
                    >
                        {engine.getStrategies().map(s => <option key={s} value={s} className="bg-black text-white">{s}</option>)}
                    </select>
                    <button
                        onClick={handleGenerate}
                        className="bg-white text-black px-8 py-3 rounded-md font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all shadow-xl"
                    >
                        Generate Plan
                    </button>
                </div>
            </div>

            {generatedPlan.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {generatedPlan.map((post) => (
                        <motion.div
                            layoutId={post.id}
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className="glass p-6 rounded-lg border border-white/10 group hover:border-white/30 cursor-pointer relative overflow-hidden"
                            whileHover={{ y: -4 }}
                        >
                            <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider text-white/30 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                {post.type.replace('_', ' ')}
                            </div>
                            <div className="mb-6">
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{post.scheduledDate}</p>
                                <p className="text-white font-black text-xl">{post.scheduledTime}</p>
                            </div>
                            <div className="aspect-video bg-black/80 rounded-md mb-4 border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-white/20 transition-colors">
                                <Layout className="text-white/20" size={32} />
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-white/60 text-sm line-clamp-2 mb-4 font-medium">{post.primaryText}</p>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${post.complianceCheck.checksPassed ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">
                                    {post.complianceCheck.checksPassed ? 'Compliance Pass' : 'Review Needed'}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="glass p-20 rounded-lg text-center border-white/10 dashed border-2 border-white/10">
                    <RefreshCw size={48} className="text-white/10 mx-auto mb-6" />
                    <p className="text-white/30 font-bold uppercase tracking-widest">Awaiting Engine Output</p>
                </div>
            )}

            <AnimatePresence>
                {selectedPost && (
                    <PostPreviewModal post={selectedPost} onClose={() => setSelectedPost(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

const PostPreviewModal = ({ post, onClose }: { post: ContentItem, onClose: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
        onClick={onClose}
    >
        <motion.div
            layoutId={post.id}
            className="w-full max-w-4xl bg-[#050505] rounded-lg border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={e => e.stopPropagation()}
        >
            {/* Preview Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 bg-black flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
                <div className={`aspect-[4/5] w-full max-w-sm rounded-xl border border-white/10 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden`}
                    style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)' }}>

                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }}></div>

                    <p className="relative z-10 text-white font-serif text-2xl italic leading-relaxed mb-6">
                        "{post.primaryText}"
                    </p>
                    {post.secondaryText && (
                        <p className="relative z-10 text-indigo-400 text-sm font-bold uppercase tracking-widest">
                            {post.secondaryText}
                        </p>
                    )}
                </div>
                <p className="mt-6 text-gray-500 text-xs font-bold uppercase tracking-widest">Instagram Feed Preview</p>
            </div>

            {/* Details Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[80vh]">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h4 className="text-2xl font-black text-white tracking-tight mb-2">Details</h4>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-widest border border-indigo-500/20">
                                {post.theme.replace('_', ' ')}
                            </span>
                            <span className="px-3 py-1 rounded-lg bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                                {post.format.replace('_', ' ')}
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <XCircle className="text-white" />
                    </button>
                </div>

                <div className="space-y-8">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3 block">Caption</label>
                        <p className="text-white/60 text-sm leading-relaxed whitespace-pre-wrap font-medium bg-black border border-white/10 p-5 rounded-lg">
                            {post.primaryText}
                            <br /><br />
                            {post.callToAction}
                            <br /><br />
                            <span className="text-white/40">
                                {post.hashtagStrategy?.primary.join(" ")} {post.hashtagStrategy?.niche?.join(" ")}
                            </span>
                        </p>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-3 block">Compliance Audit</label>
                        <div className={`p-4 rounded-lg border ${post.complianceCheck.checksPassed ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                            {post.complianceCheck.checksPassed ? (
                                <div className="flex items-center gap-3 text-green-400/80 font-bold text-sm">
                                    <CheckCircle2 size={18} />
                                    All Institutional Checks Passed
                                </div>
                            ) : (
                                <div className="text-red-400/80 font-bold text-sm">
                                    {post.complianceCheck.recommendations.join(", ")}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Schedule</p>
                            <p className="text-white font-bold">{post.scheduledDate} @ {post.scheduledTime}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Target</p>
                            <p className="text-white font-bold truncate">{post.targetAudience}</p>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-white text-black rounded-lg font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all shadow-xl">
                        Approve & Schedule
                    </button>
                </div>
            </div>
        </motion.div>
    </motion.div>
);

export default CosmicPlanner;
