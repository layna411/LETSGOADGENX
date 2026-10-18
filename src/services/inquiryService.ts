import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export type InquiryStatus = 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';
export type InquiryType = 'project' | 'photography' | 'general';

export interface ClientInquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  serviceCategory: string;
  budget?: string;
  timeline?: string;
  message?: string;
  type: InquiryType;
  shootDate?: string;
  location?: string;
  duration?: string;
  indoorOutdoor?: string;
  status: InquiryStatus;
  notes?: string;
  sourceUrl?: string;
  userAgent?: string;
  createdAt?: Timestamp | null;
  createdAtIso?: string;
}

const INQUIRIES_COLLECTION = 'inquiries';

/**
 * Submit a new client inquiry directly into Firestore
 */
export async function createInquiry(
  data: Omit<ClientInquiry, 'id' | 'status' | 'createdAt' | 'createdAtIso'> & {
    status?: InquiryStatus;
  }
): Promise<string> {
  const payload = {
    ...data,
    status: data.status || 'new',
    createdAt: serverTimestamp(),
    createdAtIso: new Date().toISOString(),
    sourceUrl: typeof window !== 'undefined' ? window.location.pathname : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  };

  const docRef = await addDoc(collection(db, INQUIRIES_COLLECTION), payload);
  return docRef.id;
}

/**
 * Subscribe to real-time inquiries updates in the Admin dashboard
 */
export function subscribeToInquiries(
  onData: (inquiries: ClientInquiry[]) => void,
  onError?: (error: Error) => void
): () => void {
  const q = query(collection(db, INQUIRIES_COLLECTION), orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: ClientInquiry[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          fullName: d.fullName || 'Anonymous Client',
          email: d.email || '',
          phone: d.phone || '',
          businessName: d.businessName || '',
          serviceCategory: d.serviceCategory || d.service_category || 'General Inquiry',
          budget: d.budget || 'Flexible',
          timeline: d.timeline || '',
          message: d.message || d.projectDetails || d.description || '',
          type: d.type || 'project',
          shootDate: d.shootDate || '',
          location: d.location || '',
          duration: d.duration || '',
          indoorOutdoor: d.indoorOutdoor || '',
          status: (d.status as InquiryStatus) || 'new',
          notes: d.notes || '',
          sourceUrl: d.sourceUrl || '',
          userAgent: d.userAgent || '',
          createdAt: d.createdAt || null,
          createdAtIso: d.createdAtIso || (d.createdAt ? new Date().toISOString() : ''),
        };
      });
      onData(items);
    },
    (err) => {
      if (onError) onError(err);
    }
  );
}

/**
 * Fetch one-time list of all inquiries
 */
export async function getInquiries(): Promise<ClientInquiry[]> {
  const q = query(collection(db, INQUIRIES_COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const d = docSnap.data();
    return {
      id: docSnap.id,
      fullName: d.fullName || 'Anonymous Client',
      email: d.email || '',
      phone: d.phone || '',
      businessName: d.businessName || '',
      serviceCategory: d.serviceCategory || d.service_category || 'General Inquiry',
      budget: d.budget || 'Flexible',
      timeline: d.timeline || '',
      message: d.message || d.projectDetails || d.description || '',
      type: d.type || 'project',
      shootDate: d.shootDate || '',
      location: d.location || '',
      duration: d.duration || '',
      indoorOutdoor: d.indoorOutdoor || '',
      status: (d.status as InquiryStatus) || 'new',
      notes: d.notes || '',
      sourceUrl: d.sourceUrl || '',
      userAgent: d.userAgent || '',
      createdAt: d.createdAt || null,
      createdAtIso: d.createdAtIso || '',
    };
  });
}

/**
 * Update the status or administrative notes on an inquiry
 */
export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  notes?: string
): Promise<void> {
  const docRef = doc(db, INQUIRIES_COLLECTION, id);
  const updateData: Record<string, any> = { status };
  if (notes !== undefined) {
    updateData.notes = notes;
  }
  await updateDoc(docRef, updateData);
}

/**
 * Delete an inquiry
 */
export async function deleteInquiry(id: string): Promise<void> {
  const docRef = doc(db, INQUIRIES_COLLECTION, id);
  await deleteDoc(docRef);
}
