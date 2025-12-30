import { Instagram, Plus, MoreVertical, Search, CheckCircle2 } from 'lucide-react';

const IGPortal = () => {
    const accounts = [
        { name: '@MythicWisdom', category: 'Mythology', status: 'Connected', followers: '12.4k' },
        { name: '@DharmaDotes', category: 'Dharma', status: 'Connected', followers: '8.1k' },
        { name: '@KarmaKronicles', category: 'Karma', status: 'Syncing', followers: '15.2k' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zen-sage" size={20} />
                    <input
                        type="text"
                        placeholder="Search connected accounts..."
                        className="w-full bg-white/50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-institutional-indigo outline-none transition-all shadow-inner"
                    />
                </div>
                <button className="btn-primary flex items-center gap-2 whitespace-nowrap">
                    <Plus size={20} />
                    Connect New Account
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map((acc, i) => (
                    <div key={i} className="glass p-6 rounded-[2rem] border-none group hover:shadow-2xl transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-institutional-indigo/5 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:bg-institutional-blue/10 transition-colors" />

                        <div className="flex justify-between items-start mb-6 relative">
                            <div className="w-14 h-14 bg-gradient-to-tr from-institutional-indigo to-institutional-blue rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                                <Instagram size={28} />
                            </div>
                            <button className="text-zen-sage hover:text-zen-slate">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        <div className="relative">
                            <h4 className="font-bold text-lg text-zen-slate flex items-center gap-2">
                                {acc.name}
                                <CheckCircle2 size={16} className="text-institutional-blue" />
                            </h4>
                            <p className="text-zen-sage text-sm">{acc.category} Node</p>
                        </div>

                        <div className="mt-6 flex justify-between items-center relative pt-6 border-t border-zen-sage/10">
                            <div>
                                <p className="text-[10px] font-bold uppercase text-zen-sage tracking-widest">Followers</p>
                                <p className="font-bold text-lg">{acc.followers}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${acc.status === 'Connected' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                                }`}>
                                {acc.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IGPortal;
