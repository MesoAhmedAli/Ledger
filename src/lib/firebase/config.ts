
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize App Check only on the client-side and if a valid key is provided
if (typeof window !== 'undefined') {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
  // Ensure the key is present and not the placeholder value from .env
  if (recaptchaSiteKey && recaptchaSiteKey !== 'ENTER_YOUR_RECAPTCHA_V3_SITE_KEY_HERE') {
    try {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(recaptchaSiteKey),
        isTokenAutoRefreshEnabled: true, // Set to true for automatic token refresh
      });
      // For your local debugging, you can add: console.log('App Check initialized successfully.');
    } catch (error) {
      // For your local debugging, you can add: console.error('Error initializing App Check:', error);
    }
  } else {
    // For your local debugging, you could add a warning if App Check is expected:
    // console.warn('App Check not initialized: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing or is still the placeholder. If App Check is enforced in Firebase, this will cause issues.');
  }
}

export { app, auth, db };
