
import { Shield, FileText, Trash2, RefreshCcw } from 'lucide-react';

export const PrivacyPolicy = () => (
    <div className="glass-dark p-8 rounded-lg space-y-6 text-white/60 leading-relaxed border border-white/10">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-white/5 text-white/40 rounded-md border border-white/10">
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
    <div className="glass-dark p-8 rounded-lg space-y-6 text-white/60 leading-relaxed border border-white/10">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-white/5 text-white/40 rounded-md border border-white/10">
                <FileText size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white">Terms of Service</h2>
        </div>
        <p>By using Auto-Notion, you agree to comply with Meta's Platform Policies and our Institutional Standard Operating Procedures (SOP.md).</p>
    </div>
);

export const DataDeletion = () => (
    <div className="glass-dark p-8 rounded-lg space-y-6 text-white/60 leading-relaxed border border-white/10">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-red-500/10 text-red-500 rounded-md border border-red-500/20">
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

export const RefundPolicy = () => (
    <div className="glass-dark p-8 rounded-lg space-y-6 text-white/60 leading-relaxed border border-white/10">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-orange-500/10 text-orange-400 rounded-md border border-orange-500/20">
                <RefreshCcw size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white">Refund & Cancellation Policy</h2>
        </div>
        <p>At Auto-Notion, we strive to provide the best sovereign AI experience. Please review our policy carefully:</p>
        <section className="space-y-4">
            <h3 className="text-xl font-bold text-white">1. Refunds</h3>
            <p>We offer a 7-day money-back guarantee for all new subscriptions. If you are not satisfied with the platform, you may request a full refund within 7 days of purchase. After 7 days, no refunds will be issued.</p>
        </section>
        <section className="space-y-4">
            <h3 className="text-xl font-bold text-white">2. Cancellations</h3>
            <p>You can cancel your subscription at any time via the Mission Control Dashboard. Your access will continue until the end of the current billing cycle.</p>
        </section>
        <section className="space-y-4">
            <h3 className="text-xl font-bold text-white">3. Contact</h3>
            <p>For any billing inquiries, please contact our support channnel at support@auto-notion.com.</p>
        </section>
    </div>
);
