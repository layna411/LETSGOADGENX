import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

export const firebaseConfig = {
  apiKey: 'AIzaSyAaRYKCJ0IRI6utFHOeOq_2EsAkRNrkfQA',
  authDomain: 'letsgo-adgenx.firebaseapp.com',
  projectId: 'letsgo-adgenx',
  storageBucket: 'letsgo-adgenx.firebasestorage.app',
  messagingSenderId: '1085039933297',
  appId: '1:1085039933297:web:2a1b607928988d837fa8d0',
  measurementId: 'G-0LPH8PW3FX',
};

// Singleton initialization for Vite HMR
export const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db: Firestore = getFirestore(app);

export let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      // Analytics unsupported or disabled in current environment
    });
}
