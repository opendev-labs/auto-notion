import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, ExternalLink, RefreshCw, CheckCircle, XCircle, Terminal, Database } from 'lucide-react';

const AutomationPortal: React.FC = () => {
    const [n8nStatus, setN8nStatus] = useState<'checking' | 'online' | 'offline'>('checking');
    const [syncing, setSyncing] = useState<string | null>(null);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await fetch('http://localhost:5678/healthz').catch(() => null);
                setN8nStatus(response && response.status === 200 ? 'online' : 'offline');
            } catch {
                setN8nStatus('offline');
            }
        };
        checkStatus();
        const interval = setInterval(checkStatus, 10000);
        return () => clearInterval(interval);
    }, []);

    const triggerSync = async (type: string) => {
        setSyncing(type);
        // Simulate webhook trigger
        setTimeout(() => {
            setSyncing(null);
        }, 2000);
    };

    const automationCards = [
        {
            id: 'notion-sync',
            title: 'Notion Sync',
            description: 'Synchronize CRM data and leads to Notion Institutional Database.',
            icon: Database,
            path: 'notion-sync',
            color: 'blue'
        },
        {
            id: 'ig-automation',
            title: 'Instagram Automation',
            description: 'Trigger AI-driven content generation and scheduling via n8n.',
            icon: Zap,
            path: 'instagram-post',
            color: 'purple'
        },
        {
            id: 'hub-control',
            title: 'Central Hub',
            description: 'Main routing hub for all platform automation events.',
            icon: Activity,
            path: 'auto-notion',
            color: 'green'
        }
    ];

    return (
        <div className="space-y-8">
            <section className="glass-dark rounded-3xl p-8 border-0.5 border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                    <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border-0.5 text-xs font-bold tracking-widest ${n8nStatus === 'online' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                        <Activity size={14} className={n8nStatus === 'online' ? 'animate-pulse' : ''} />
                        N8N ENGINE: {n8nStatus.toUpperCase()}
                    </div>
                </div>

                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold text-white mb-4">Automation Control Panel</h2>
                    <p className="text-zen-sage leading-relaxed mb-6 font-medium">
                        Manage your local n8n automation engine. Auto-Notion leverages n8n to handle complex cross-platform workflows, ensuring high-fidelity data synchronization.
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="http://localhost:5678"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-2xl font-bold text-sm hover:bg-zen-sage transition-all"
                        >
                            Open n8n Interface <ExternalLink size={14} />
                        </a>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/10 transition-all">
                            Refresh Connection
                        </button>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {automationCards.map((card) => (
                    <motion.div
                        key={card.id}
                        whileHover={{ y: -5 }}
                        className="glass-dark rounded-3xl p-8 border-0.5 border-white/5 group hover:border-white/10 transition-all"
                    >
                        <div className={`w-12 h-12 rounded-2xl bg-${card.color}-500/10 flex items-center justify-center mb-6 text-${card.color}-400 group-hover:scale-110 transition-transform`}>
                            <card.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                        <p className="text-xs text-white/40 leading-relaxed font-bold mb-8 uppercase tracking-wider">{card.description}</p>

                        <button
                            onClick={() => triggerSync(card.id)}
                            disabled={syncing !== null || n8nStatus !== 'online'}
                            className={`w-full py-4 rounded-2xl font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all ${syncing === card.id
                                    ? 'bg-white/20 text-white'
                                    : n8nStatus === 'online'
                                        ? `bg-white/5 border border-white/10 text-white hover:bg-white/10`
                                        : 'bg-white/5 text-white/20 cursor-not-allowed'
                                }`}
                        >
                            {syncing === card.id ? (
                                <> <RefreshCw size={14} className="animate-spin" /> Syncing... </>
                            ) : (
                                <> <Zap size={14} /> Trigger Workflow </>
                            )}
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="glass-dark rounded-3xl p-8 border-0.5 border-white/5">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-white/5 text-white/60">
                        <Terminal size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-widest">Automation Logs</h3>
                </div>
                <div className="bg-black/40 rounded-2xl p-6 font-mono text-[10px] text-zinc-500 space-y-2 border border-white/5">
                    <p>[{new Date().toISOString()}] INITIALIZING AUTOMATION PORTAL...</p>
                    <p>[{new Date().toISOString()}] N8N_BASE_URL: http://localhost:5678</p>
                    <p className={n8nStatus === 'online' ? 'text-green-500/60' : 'text-red-500/60'}>
                        [{new Date().toISOString()}] CONNECTION STATUS: {n8nStatus.toUpperCase()}
                    </p>
                    {syncing && (
                        <p className="text-purple-400/60 animate-pulse">
                            [{new Date().toISOString()}] TRIGGERING WORKFLOW: {syncing.toUpperCase()}...
                        </p>
                    )}
                    <p>[{new Date().toISOString()}] READY FOR INSTRUCTIONS.</p>
                </div>
            </div>
        </div>
    );
};

export default AutomationPortal;
