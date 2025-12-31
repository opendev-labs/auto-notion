import { motion } from 'framer-motion';
import { Instagram, Plus, MoreVertical, Search, CheckCircle2, ArrowRight } from 'lucide-react';

const IGPortal = () => {
    const accounts = [
        { name: '@MythicWisdom', category: 'Mythology', status: 'Connected', followers: '12.4k' },
        { name: '@DharmaDotes', category: 'Dharma', status: 'Connected', followers: '8.1k' },
        { name: '@KarmaKronicles', category: 'Karma', status: 'Syncing', followers: '15.2k' },
    ];

    const handleConnect = () => {
        const appId = "689310950781431";
        const redirectUri = encodeURIComponent("https://auto-notion.web.app/auth/callback");
        const scopes = encodeURIComponent("instagram_basic,instagram_content_publish,pages_read_engagement,pages_show_list,ads_management");
        const authUrl = `https://www.facebook.com/v24.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scopes}`;

        window.location.href = authUrl;
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
                <div className="relative w-full md:w-[480px]">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                    <input
                        type="text"
                        placeholder="Search connected accounts..."
                        className="w-full bg-white/[0.03] border-0.5 border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/20 focus:bg-white/[0.05] focus:border-white/20 outline-none transition-all duration-500 font-medium"
                    />
                </div>
                <button
                    onClick={handleConnect}
                    className="btn-primary flex items-center gap-3 px-8 group whitespace-nowrap"
                >
                    <Plus size={18} />
                    Connect New Account
                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accounts.map((acc, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" as any }}
                        className="glass p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-white/5 relative overflow-hidden group hover:border-white/20"
                    >
                        <div className="flex justify-between items-start mb-8 transition-transform duration-700 group-hover:-translate-y-1">
                            <div className="w-16 h-16 bg-white text-black rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                <Instagram size={32} strokeWidth={2.5} />
                            </div>
                            <button className="text-white/20 hover:text-white transition-colors p-2">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        <div className="space-y-1 mb-8">
                            <h4 className="font-bold text-xl text-white flex items-center gap-2 tracking-tight">
                                {acc.name}
                                <CheckCircle2 size={18} className="text-white" fill="white" />
                            </h4>
                            <p className="text-white/40 text-sm font-bold tracking-widest uppercase">{acc.category} Node</p>
                        </div>

                        <div className="flex justify-between items-end pt-8 border-t-0.5 border-white/10">
                            <div>
                                <p className="text-[10px] font-bold uppercase text-white/30 tracking-[0.2em] mb-1">Followers</p>
                                <p className="font-bold text-2xl tracking-tighter text-white">{acc.followers}</p>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border-0.5 ${acc.status === 'Connected'
                                ? 'bg-white/5 border-white/10 text-white'
                                : 'bg-white/[0.02] border-white/5 text-white/40'
                                }`}>
                                {acc.status}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default IGPortal;
