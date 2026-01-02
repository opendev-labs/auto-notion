
import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

// Firebase configuration from user request
const firebaseConfig = {
    apiKey: "AIzaSyBMsqr--MMnif5HrvtcTvoPyIkqHznuqkg",
    authDomain: "meta-auto-notion.firebaseapp.com",
    projectId: "meta-auto-notion",
    storageBucket: "meta-auto-notion.firebasestorage.app",
    messagingSenderId: "357502904034",
    appId: "1:357502904034:web:817d672e8947ef6afaa0bb",
    measurementId: "G-XNBEM9HKV0"
};

console.log("Firebase Initializing with Project:", firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth Providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('instagram_basic');
facebookProvider.addScope('instagram_content_publish');
facebookProvider.addScope('pages_show_list');
facebookProvider.addScope('pages_read_engagement');
export const githubProvider = new GithubAuthProvider();

export const signInWithProvider = async (provider: any) => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Persist user data to Firestore for monitoring and history
        if (user) {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                lastLogin: serverTimestamp(),
                role: 'user', // Default role
                provider: provider.providerId
            }, { merge: true });
        }

        return user;
    } catch (error) {
        console.error("Auth Error:", error);
        throw error;
    }
};
