import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
  collection,
  addDoc,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface VisitorMetrics {
  totalVisits: number;
  uniqueVisitors: number;
  lastVisitAt?: Timestamp | null;
  visitsByDate: Record<string, number>;
  pageCounts: Record<string, number>;
  deviceCounts: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
}

const STATS_DOC_ID = 'visitor_metrics';
const STATS_COLLECTION = 'stats';

function getVisitorId(): { id: string; isNew: boolean } {
  if (typeof window === 'undefined') {
    return { id: 'server', isNew: false };
  }
  let id = localStorage.getItem('adgenx_visitor_id');
  let isNew = false;
  if (!id) {
    id = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    localStorage.setItem('adgenx_visitor_id', id);
    isNew = true;
  }
  return { id, isNew };
}

function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * Record a page visit in Firestore with error tolerance
 */
export async function recordPageView(pathname: string): Promise<void> {
  // Ignore admin pages from visitor metrics
  if (pathname.startsWith('/admin')) {
    return;
  }

  // Prevent multiple double-counting in short session for exact same page
  const sessionKey = `adgenx_view_${pathname}_${new Date().getMinutes()}`;
  if (typeof sessionStorage !== 'undefined') {
    if (sessionStorage.getItem(sessionKey)) {
      return;
    }
    sessionStorage.setItem(sessionKey, '1');
  }

  try {
    const { id: visitorId, isNew } = getVisitorId();
    const today = getTodayString();
    const device = getDeviceType();

    // Clean pathname for key name (Firestore map keys cannot contain slashes)
    const pageKey = pathname === '/' ? 'home' : pathname.replace(/[\/.:#?&=]/g, '_');

    const statsRef = doc(db, STATS_COLLECTION, STATS_DOC_ID);

    const updatePayload: Record<string, any> = {
      totalVisits: increment(1),
      [`visitsByDate.${today}`]: increment(1),
      [`pageCounts.${pageKey}`]: increment(1),
      [`deviceCounts.${device}`]: increment(1),
      lastVisitAt: serverTimestamp(),
    };

    if (isNew) {
      updatePayload.uniqueVisitors = increment(1);
    }

    try {
      await updateDoc(statsRef, updatePayload);
    } catch {
      // Document may not exist yet, create initial document
      await setDoc(
        statsRef,
        {
          totalVisits: 1,
          uniqueVisitors: isNew ? 1 : 1,
          visitsByDate: { [today]: 1 },
          pageCounts: { [pageKey]: 1 },
          deviceCounts: {
            desktop: device === 'desktop' ? 1 : 0,
            mobile: device === 'mobile' ? 1 : 0,
            tablet: device === 'tablet' ? 1 : 0,
          },
          lastVisitAt: serverTimestamp(),
        },
        { merge: true }
      );
    }

    // Optional lightweight recent view log (for real-time dashboard feed)
    try {
      await addDoc(collection(db, 'page_views'), {
        path: pathname,
        visitorId,
        device,
        timestamp: serverTimestamp(),
        createdAtIso: new Date().toISOString(),
        referrer: typeof document !== 'undefined' ? document.referrer || 'Direct' : 'Direct',
      });
    } catch {
      // Ignore detailed view log errors
    }
  } catch {
    // Ignore visitor tracking errors silently
  }
}

/**
 * Subscribe to live visitor metrics in the Admin Dashboard
 */
export function subscribeToVisitorMetrics(
  onData: (metrics: VisitorMetrics) => void,
  onError?: (err: Error) => void
): () => void {
  const statsRef = doc(db, STATS_COLLECTION, STATS_DOC_ID);

  return onSnapshot(
    statsRef,
    (docSnap) => {
      if (docSnap.exists()) {
        const d = docSnap.data();
        onData({
          totalVisits: d.totalVisits || 0,
          uniqueVisitors: d.uniqueVisitors || 0,
          lastVisitAt: d.lastVisitAt || null,
          visitsByDate: d.visitsByDate || {},
          pageCounts: d.pageCounts || {},
          deviceCounts: d.deviceCounts || { desktop: 0, mobile: 0, tablet: 0 },
        });
      } else {
        // Default empty stats
        onData({
          totalVisits: 0,
          uniqueVisitors: 0,
          lastVisitAt: null,
          visitsByDate: {},
          pageCounts: {},
          deviceCounts: { desktop: 0, mobile: 0, tablet: 0 },
        });
      }
    },
    (err) => {
      if (onError) onError(err);
    }
  );
}

/**
 * Fetch one-time visitor metrics
 */
export async function getVisitorMetrics(): Promise<VisitorMetrics> {
  const statsRef = doc(db, STATS_COLLECTION, STATS_DOC_ID);
  const snap = await getDoc(statsRef);

  if (snap.exists()) {
    const d = snap.data();
    return {
      totalVisits: d.totalVisits || 0,
      uniqueVisitors: d.uniqueVisitors || 0,
      lastVisitAt: d.lastVisitAt || null,
      visitsByDate: d.visitsByDate || {},
      pageCounts: d.pageCounts || {},
      deviceCounts: d.deviceCounts || { desktop: 0, mobile: 0, tablet: 0 },
    };
  }

  return {
    totalVisits: 0,
    uniqueVisitors: 0,
    lastVisitAt: null,
    visitsByDate: {},
    pageCounts: {},
    deviceCounts: { desktop: 0, mobile: 0, tablet: 0 },
  };
}
