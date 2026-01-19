import { initializeApp } from "firebase/app";
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult
} from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig().public.firebase;

    const app = initializeApp(config);
    const auth = getAuth(app);
    const db = getFirestore(app);

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    facebookProvider.addScope('instagram_basic');
    facebookProvider.addScope('instagram_content_publish');
    facebookProvider.addScope('pages_show_list');
    facebookProvider.addScope('pages_read_engagement');
    const githubProvider = new GithubAuthProvider();
    githubProvider.addScope('read:user');
    githubProvider.addScope('user:email');

    const syncUserToFirestore = async (user: any, providerId?: string) => {
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastLogin: serverTimestamp(),
            role: 'user',
            provider: providerId || user.providerData?.[0]?.providerId
        }, { merge: true });
    };

    const signInWithProvider = async (provider: any) => {
        try {
            const result = await signInWithPopup(auth, provider);
            return result.user;
        } catch (error) {
            console.error("Popup Auth Error:", error);
            throw error;
        }
    };

    const signInWithProviderRedirect = async (provider: any) => {
        try {
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error("Redirect Auth Error:", error);
            throw error;
        }
    };

    const user = ref<any>(null);
    const authReady = ref(false);

    onAuthStateChanged(auth, async (currentUser) => {
        user.value = currentUser;
        if (currentUser) {
            await syncUserToFirestore(currentUser);
        }
        authReady.value = true;
    });

    // Handle redirect result
    getRedirectResult(auth).then(async (result) => {
        if (result?.user) {
            await syncUserToFirestore(result.user);
        }
    }).catch((error) => {
        console.error("Redirect Result Error:", error);
    });

    // Wait for initial auth state
    const waitForAuth = () => new Promise((resolve) => {
        if (authReady.value) resolve(user.value);
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            unsubscribe();
            resolve(u);
        });
    });

    return {
        provide: {
            firebaseApp: app,
            auth: auth,
            db: db,
            user,
            authReady,
            waitForAuth,
            providers: {
                google: googleProvider,
                facebook: facebookProvider,
                github: githubProvider
            },
            signInWithProvider,
            signInWithProviderRedirect,
            syncUserToFirestore
        }
    }
})
