import { UserPlus, Shield, Cpu, Activity } from 'lucide-react';

const AgentManager = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass p-10 rounded-[3rem] border-none flex flex-col items-center text-center space-y-6">
                <div className="w-24 h-24 bg-institutional-indigo/10 rounded-[2rem] flex items-center justify-center text-institutional-indigo animate-bounce">
                    <UserPlus size={48} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-zen-slate mb-2">Appoint New Agent</h3>
                    <p className="text-zen-sage max-w-sm">Assign a governing AI Agent to oversee your Instagram node for 365-day deterministic growth.</p>
                </div>
                <button className="btn-primary w-full max-w-xs py-4 text-lg">
                    Launch Deployment Wizard
                </button>
            </div>

            <div className="space-y-6">
                <div className="glass p-6 rounded-[2rem] border-none flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-institutional-blue/10 text-institutional-blue">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-zen-slate">SOP Governance</h4>
                        <p className="text-xs text-zen-sage">Agents strictly adhere to institutional SOP.md protocols.</p>
                    </div>
                </div>

                <div className="glass p-6 rounded-[2rem] border-none flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-amber-100 text-amber-600">
                        <Cpu size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-zen-slate">Arbitronix Core Engine</h4>
                        <p className="text-xs text-zen-sage">Deterministic content logic handles 365-day scheduling.</p>
                    </div>
                </div>

                <div className="glass p-6 rounded-[2rem] border-none flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-green-100 text-green-600">
                        <Activity size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-zen-slate">Real-time Correction</h4>
                        <p className="text-xs text-zen-sage">Agents monitor engagement loops to optimize frequency.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentManager;
