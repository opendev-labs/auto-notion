import { useState } from 'react';
import { Check, Zap, Crown, Shield } from 'lucide-react';
import { PaymentService } from '../services/payment';
import { auth } from '../services/firebase';

const plans = [
    {
        id: 'starter',
        name: 'Starter Node',
        price: 999,
        features: ['1 Instagram Account', 'Basic Auto-Replies', 'Standard Support', '7-Day History'],
        icon: Zap,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10',
        border: 'border-blue-400/20'
    },
    {
        id: 'pro',
        name: 'Professional',
        price: 2499,
        features: ['3 Instagram Accounts', 'Advanced AI Logic', 'Priority Support', '30-Day History', 'Sentiment Analysis'],
        icon: Crown,
        color: 'text-purple-400',
        bg: 'bg-purple-400/10',
        border: 'border-purple-400/20',
        popular: true
    },
    {
        id: 'agency',
        name: 'Agency Core',
        price: 9999,
        features: ['Unlimited Accounts', 'Custom AI Training', 'Dedicated Account Manager', 'Unlimited History', 'Whitelabel Reports'],
        icon: Shield,
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/10',
        border: 'border-emerald-400/20'
    }
];

export const SubscriptionPage = () => {
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubscribe = async (plan: any) => {
        const user = auth.currentUser;
        if (!user) {
            alert("Please login to subscribe");
            return;
        }

        setLoading(plan.id);
        try {
            const order = await PaymentService.createOrder(plan.price);
            PaymentService.openPaymentModal(
                {
                    uid: user.uid,
                    email: user.email || "",
                    displayName: user.displayName || "Valued Customer"
                },
                order,
                (success) => {
                    setLoading(null);
                    alert("Subscription activated successfully! Payment ID: " + success.razorpay_payment_id);
                },
                (error) => {
                    setLoading(null);
                    // Error is logged in PaymentService
                    console.error(error);
                    alert("Payment failed. Please try again.");
                }
            );
        } catch (error) {
            console.error("Setup failed", error);
            setLoading(null);
            alert("Could not initialize payment.");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/50">
                    Upgrade Your Node
                </h1>
                <p className="text-zen-sage max-w-2xl mx-auto text-lg">
                    Scale your autonomous operations with institutional-grade power.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                {plans.map((plan) => {
                    const Icon = plan.icon;
                    return (
                        <div key={plan.id} className={`glass-dark p-8 rounded-lg border relative group transition-all duration-300 hover:-translate-y-2 ${plan.border} ${plan.popular ? 'border-white/30 shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]' : 'border-white/10'}`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-md text-[10px] font-black tracking-widest uppercase">
                                    Strategic Choice
                                </div>
                            )}

                            <div className="flex flex-col h-full">
                                <div className={`w-14 h-14 rounded-lg bg-white/5 ${plan.color} flex items-center justify-center mb-6 border border-white/10 shadow-xl`}>
                                    <Icon size={28} />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-sm text-zen-sage">₹</span>
                                    <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                                    <span className="text-sm text-zen-sage">/month</span>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                                <Check size={12} className="text-white" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleSubscribe(plan)}
                                    disabled={loading === plan.id}
                                    className={`w-full py-4 rounded-lg font-black tracking-widest uppercase text-xs transition-all ${plan.popular
                                        ? 'bg-white text-black shadow-xl hover:bg-zinc-200'
                                        : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {loading === plan.id ? 'Processing Pulse...' : 'Activate Node'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="text-center mt-12 pb-8 text-xs text-zen-sage/60">
                <p>Secure payments powered by Razorpay. By upgrading, you agree to our Terms of Service.</p>
            </div>
        </div>
    );
};
