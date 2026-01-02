import { Settings as SettingsIcon, Bell, Shield, User, Database, Globe } from 'lucide-react';

const Settings: React.FC = () => {
    return (
        <div className="space-y-8">
            <section className="glass-dark rounded-[2.5rem] p-8 md:p-12 border-0.5 border-white/5 relative overflow-hidden">
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-4">
                        <SettingsIcon className="text-white/40" />
                        Platform Settings
                    </h2>
                    <p className="text-zen-sage leading-relaxed mb-10 font-medium">
                        Configure your institutional automation parameters and system preferences.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Core Configuration</h3>

                            <div className="space-y-4">
                                <label className="block">
                                    <span className="text-xs font-bold text-white/60 uppercase tracking-widest block mb-2">Automation Environment</span>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/20">
                                        <option value="production">Production Hub</option>
                                        <option value="staging">Staging Node</option>
                                        <option value="development">Local Sandbox</option>
                                    </select>
                                </label>

                                <label className="block">
                                    <span className="text-xs font-bold text-white/60 uppercase tracking-widest block mb-2">Primary Sync Target</span>
                                    <div className="relative">
                                        <Database className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                        <input
                                            type="text"
                                            defaultValue="Notion Institutional CRM"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white outline-none focus:border-white/20"
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">System Preferences</h3>

                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <div className="flex items-center gap-3">
                                    <Bell size={18} className="text-white/40" />
                                    <div>
                                        <p className="text-sm font-bold text-white">Neural Notifications</p>
                                        <p className="text-[10px] text-white/30 uppercase font-bold">Real-time alerts</p>
                                    </div>
                                </div>
                                <div className="w-10 h-6 bg-white rounded-full relative p-1 cursor-pointer">
                                    <div className="absolute right-1 w-4 h-4 bg-black rounded-full shadow-lg" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <div className="flex items-center gap-3">
                                    <Globe size={18} className="text-white/40" />
                                    <div>
                                        <p className="text-sm font-bold text-white">Global CDN</p>
                                        <p className="text-[10px] text-white/30 uppercase font-bold">Edge delivery</p>
                                    </div>
                                </div>
                                <div className="w-10 h-6 bg-white/10 rounded-full relative p-1 cursor-pointer border border-white/10">
                                    <div className="absolute left-1 w-4 h-4 bg-white/20 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex gap-4">
                        <button className="px-8 py-4 bg-white text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-zen-sage transition-all shadow-xl">
                            Deploy Configurations
                        </button>
                        <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                            Reset to Default
                        </button>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-dark p-8 rounded-3xl border border-white/5 group hover:border-white/10 transition-all">
                    <User className="text-white/20 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-white mb-2">Account Logic</h3>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-relaxed">
                        Manage institutional credentials and access signatures.
                    </p>
                </div>
                <div className="glass-dark p-8 rounded-3xl border border-white/5 group hover:border-white/10 transition-all">
                    <Shield className="text-white/20 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-white mb-2">Security Hash</h3>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-relaxed">
                        Monitor cryptographic integrity and session tokens.
                    </p>
                </div>
                <div className="glass-dark p-8 rounded-3xl border border-white/5 group hover:border-white/10 transition-all">
                    <Database className="text-white/20 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-white mb-2">Data Sovereignty</h3>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-relaxed">
                        Control local storage and cached intelligence nodes.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
