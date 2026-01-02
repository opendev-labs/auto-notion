import { db } from './firebase'; // Assuming you have firestore setup
import { doc, setDoc } from 'firebase/firestore';

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface PaymentOrder {
    amount: number; // in paise
    currency: string;
    receipt: string;
}

// NOTE: using LIVE key as provided. 
// WARNING: Real money transaction.
const RAZORPAY_KEY_ID = "rzp_live_RR5721D6h6BMt4";

export const PaymentService = {
    createOrder: async (amountINR: number): Promise<PaymentOrder> => {
        // In a real backend, you call your server here to create an order via Razorpay API.
        // For client-side only (testing/verification), we simulate an order ID or just pass parameters to checkout.
        // Razorpay Checkout supports "client-side" mode without order_id for simple payments, 
        // but better to have order_id. 
        // For this MVP, we will use the "options" directly without a server-generated order_id if possible,
        // or mock it.

        // Returning mock data to be used in openPaymentModal
        return {
            amount: amountINR * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };
    },

    openPaymentModal: (
        user: { email: string; displayName?: string; uid: string },
        order: PaymentOrder,
        onSuccess: (response: any) => void,
        onFailure: (error: any) => void
    ) => {
        const options = {
            key: RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Auto-Notion",
            description: "Premium Subscription",
            image: "/logo.svg",
            // order_id: "order_9A33XWu170gLgm", // This must come from backend in prod
            handler: async function (response: any) {
                console.log("Payment Successful:", response);
                // Save to Firestore
                try {
                    await setDoc(doc(db, "subscriptions", user.uid), {
                        status: "active",
                        plan: "premium",
                        paymentId: response.razorpay_payment_id,
                        updatedAt: new Date().toISOString()
                    }, { merge: true });
                } catch (e) {
                    console.error("Failed to save subscription", e);
                }
                onSuccess(response);
            },
            prefill: {
                name: user.displayName || "",
                email: user.email,
                contact: "" // Can leave empty to let user fill
            },
            notes: {
                address: "Auto-Notion Corporate Office"
            },
            theme: {
                color: "#6366f1" // Indigo-500
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response: any) {
            console.error("Payment Failed:", response.error);
            onFailure(response.error);
        });
        rzp1.open();
    }
};
