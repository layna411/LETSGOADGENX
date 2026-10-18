import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

// Runtime credential decoding to prevent plain text exposure in client inspection
const dec = (s: string) => (typeof atob === 'function' ? atob(s) : s);

export const firebaseConfig = {
  apiKey: dec('QUl6YVN5QWFSWUtDSjBJUkk2dXRGSE9lcV8yRXNBa1JOcmtmUUE='),
  authDomain: dec('bGV0c2dvLWFkZ2VueC5maXJlYmFzZWFwcC5jb20='),
  projectId: dec('bGV0c2dvLWFkZ2VueA=='),
  storageBucket: dec('bGV0c2dvLWFkZ2VueC5maXJlYmFzZXN0b3JhZ2UuYXBw'),
  messagingSenderId: dec('MTA4NTAzOTkzMzI5Nw=='),
  appId: dec('MToxMDg1MDM5OTMzMjk3OndlYjoyYTFiNjA3OTI4OTg4ZDgzN2ZhOGQw'),
  measurementId: dec('Ry0wTFBIOFBXM0ZY'),
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
