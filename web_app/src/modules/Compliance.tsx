import { Shield, FileText, Trash2 } from 'lucide-react';

export const PrivacyPolicy = () => (
    <div className="glass p-10 rounded-[3rem] space-y-6 text-zen-sage leading-relaxed">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-institutional-indigo/20 text-institutional-indigo rounded-2xl">
                <Shield size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white">Privacy Policy</h2>
        </div>
        <p>Last Updated: December 2025</p>
        <section className="space-y-4">
            <h3 className="text-xl font-bold text-white">1. Data Collection</h3>
            <p>Auto-Notion collects only the necessary data to perform Instagram automation and sentiment analysis. This includes public profile information and media insights via the Meta Graph API.</p>
        </section>
        <section className="space-y-4">
            <h3 className="text-xl font-bold text-white">2. Data Usage</h3>
            <p>Your data is used exclusively to calibrate the Deterministic Engine and ensure 'No Drift' from the institutional benchmarks defined in your mission profile.</p>
        </section>
    </div>
);

export const TermsOfService = () => (
    <div className="glass p-10 rounded-[3rem] space-y-6 text-zen-sage leading-relaxed">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-institutional-blue/20 text-institutional-blue rounded-2xl">
                <FileText size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white">Terms of Service</h2>
        </div>
        <p>By using Auto-Notion, you agree to comply with Meta's Platform Policies and our Institutional Standard Operating Procedures (SOP.md).</p>
    </div>
);

export const DataDeletion = () => (
    <div className="glass p-10 rounded-[3rem] space-y-6 text-zen-sage leading-relaxed">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-red-500/20 text-red-500 rounded-2xl">
                <Trash2 size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white">User Data Deletion</h2>
        </div>
        <p>To request deletion of your data from the Auto-Notion platform, please follow these institutional steps:</p>
        <ol className="list-decimal list-inside space-y-4">
            <li>Login to your Missions Control Dashboard.</li>
            <li>Navigate to <b>Settings &gt; Account Management</b>.</li>
            <li>Click on the <b>"Decommission Node"</b> button.</li>
            <li>Confirm your request. All cryptographically signed logs and access tokens will be purged within 24 hours.</li>
        </ol>
        <p className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 italic text-sm">
            Note: This action is irreversible once the 24-hour cooling period expires.
        </p>
    </div>
);
