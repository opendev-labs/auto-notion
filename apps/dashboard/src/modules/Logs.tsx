import { Search, Download, Trash2, Filter, ChevronRight } from 'lucide-react';

const Logs: React.FC = () => {
    const logEntries = [
        { id: '1', level: 'SUCCESS', action: 'Facebook Meta Sync', timestamp: '2026-01-02 17:50:12', message: 'Successfully pulled 15 performance metrics from API.' },
        { id: '2', level: 'INFO', action: 'n8n Workflow Trigger', timestamp: '2026-01-02 17:48:05', message: 'Automation [Daily-IG-Post] initiated by scheduler.' },
        { id: '3', level: 'WARNING', action: 'Notion API Rate Limit', timestamp: '2026-01-02 17:45:30', message: 'Approaching rate limit. Slowing down synchronization throughput.' },
        { id: '4', level: 'SUCCESS', action: 'Gemini Analysis', timestamp: '2026-01-02 17:42:00', message: 'Content sentiment analysis completed for 42 comments.' },
        { id: '5', level: 'ERROR', action: 'Instagram API Auth', timestamp: '2026-01-02 17:35:15', message: 'Access token expired. Re-authentication required.' },
    ];

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Logs & History</h2>
                    <p className="text-zen-sage text-sm font-medium">Real-time audit trail of all platform operations.</p>
                </div>
                <div className="flex gap-4">
                    <button className="p-3 bg-white/5 border border-white/10 rounded-md text-white/60 hover:text-white transition-all">
                        <Download size={18} />
                    </button>
                    <button className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400/60 hover:text-red-400 transition-all">
                        <Trash2 size={18} />
                    </button>
                </div>
            </header>

            <div className="glass-dark rounded-lg border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10 flex flex-col md:flex-row gap-4 justify-between bg-black/40">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                        <input
                            type="text"
                            placeholder="Search logs by action or message..."
                            className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-xs text-white outline-none focus:border-white/40 transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold text-white/40 uppercase tracking-widest hover:bg-white/10 transition-all">
                            <Filter size={14} /> Filter
                        </button>
                        <select className="bg-white/5 border border-white/10 rounded-md px-4 py-2 text-[10px] font-bold text-white/40 uppercase tracking-widest outline-none appearance-none cursor-pointer">
                            <option>All Levels</option>
                            <option>Success</option>
                            <option>Error</option>
                            <option>Warning</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                                <th className="px-8 py-6">Timestamp</th>
                                <th className="px-6 py-6">Level</th>
                                <th className="px-6 py-6">Action</th>
                                <th className="px-6 py-6">Diagnostic Message</th>
                                <th className="px-8 py-6 text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {logEntries.map((log) => (
                                <tr key={log.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-6 text-xs text-white/40 font-mono tracking-tighter whitespace-nowrap">
                                        {log.timestamp}
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className={`px-3 py-1 rounded-md text-[9px] font-black tracking-widest uppercase ${log.level === 'SUCCESS' ? 'bg-green-500/10 text-green-400' :
                                            log.level === 'ERROR' ? 'bg-red-500/10 text-red-400' :
                                                log.level === 'WARNING' ? 'bg-orange-500/10 text-orange-400' :
                                                    'bg-blue-500/10 text-blue-400'
                                            }`}>
                                            {log.level}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 text-sm font-bold text-white tracking-tight">
                                        {log.action}
                                    </td>
                                    <td className="px-6 py-6 text-xs text-white/40 leading-relaxed max-w-xs">
                                        {log.message}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 rounded-lg bg-white/5 text-white/20 hover:text-white group-hover:translate-x-1 transition-all">
                                            <ChevronRight size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-white/10 flex justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    <span>Showing 5 of 1,248 entries</span>
                    <div className="flex gap-4">
                        <button className="hover:text-white transition-colors disabled:opacity-30 border-r border-white/10 pr-4" disabled>Previous</button>
                        <button className="hover:text-white transition-colors">Next Page</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logs;
