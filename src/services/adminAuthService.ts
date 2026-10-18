import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Admin Authentication Service for LetsGo AdGenX Management Portal
 * Authentication credentials are stored and verified strictly in Cloud Firestore.
 * No credential data or default passwords are kept in the frontend code.
 */

const ADMIN_AUTH_COLLECTION = 'admin_auth';
const ADMIN_AUTH_DOC = 'credentials';
const STORAGE_KEY_AUTH = 'adgenx_admin_session';

export interface VerifyLoginResult {
  success: boolean;
  error?: string;
}

/**
 * Retrieves admin credentials document from Cloud Firestore
 */
async function fetchFirestoreCredentials(): Promise<{ username: string; password: string } | null> {
  const credsRef = doc(db, ADMIN_AUTH_COLLECTION, ADMIN_AUTH_DOC);
  const snap = await getDoc(credsRef);

  if (snap.exists()) {
    const data = snap.data();
    return {
      username: data.username || '',
      password: data.password || '',
    };
  }

  return null;
}

/**
 * Verify admin login against Cloud Firestore
 */
export async function verifyAdminLogin(username: string, pass: string): Promise<VerifyLoginResult> {
  const u = username.trim().toLowerCase();
  const p = pass.trim();

  try {
    const creds = await fetchFirestoreCredentials();

    if (!creds || !creds.username || !creds.password) {
      return {
        success: false,
        error:
          'Admin credentials document not found in Firestore (admin_auth/credentials). Please verify your Firestore database configuration.',
      };
    }

    const firestoreUser = creds.username.trim().toLowerCase();
    const firestorePass = creds.password.trim();

    // Verify against credentials stored in Firestore
    const userMatches =
      u === firestoreUser ||
      (firestoreUser.includes('@') && u === firestoreUser.split('@')[0]);

    const passMatches = p === firestorePass;

    if (userMatches && passMatches) {
      const sessionToken = {
        user: creds.username,
        loggedInAt: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };

      if (typeof window !== 'undefined') {
        sessionStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(sessionToken));
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(sessionToken));
      }

      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid Admin ID or Password. Access denied.',
    };
  } catch (err: any) {
    console.error('Firestore admin login error:', err);
    if (err?.code === 'permission-denied' || err?.message?.includes('permission-denied')) {
      return {
        success: false,
        error:
          'Firestore permission denied for admin_auth collection. Please ensure your Firestore security rules allow read access to admin_auth.',
      };
    }
    return {
      success: false,
      error: 'Unable to connect to Firestore authentication service. Please check your connection.',
    };
  }
}

/**
 * Update Admin ID and Password directly in Cloud Firestore
 */
export async function updateAdminCredentials(
  newUsername: string,
  newPass: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const credsRef = doc(db, ADMIN_AUTH_COLLECTION, ADMIN_AUTH_DOC);
    await setDoc(
      credsRef,
      {
        username: newUsername.trim(),
        password: newPass.trim(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return { success: true };
  } catch (err: any) {
    console.error('Failed to update credentials in Firestore:', err);
    return {
      success: false,
      error: err?.message || 'Failed to update credentials in Firestore.',
    };
  }
}

/**
 * Check if admin is currently authenticated with a valid session
 */
export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const raw =
    sessionStorage.getItem(STORAGE_KEY_AUTH) || localStorage.getItem(STORAGE_KEY_AUTH);
  if (!raw) return false;

  try {
    const session = JSON.parse(raw);
    if (session.expiresAt && Date.now() < session.expiresAt) {
      return true;
    }
    // Expired session
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
    localStorage.removeItem(STORAGE_KEY_AUTH);
    return false;
  } catch {
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
    localStorage.removeItem(STORAGE_KEY_AUTH);
    return false;
  }
}

/**
 * Logout admin and clear active session
 */
export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
    localStorage.removeItem(STORAGE_KEY_AUTH);
  }
}

/**
 * Get current logged in admin username
 */
export function getAdminUser(): string {
  if (typeof window === 'undefined') return 'Admin';
  const raw =
    sessionStorage.getItem(STORAGE_KEY_AUTH) || localStorage.getItem(STORAGE_KEY_AUTH);
  if (!raw) return 'Admin';
  try {
    return JSON.parse(raw).user || 'Admin';
  } catch {
    return 'Admin';
  }
}
