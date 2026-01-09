// Firebase initialization and Firestore helpers (module)
// This file uses Firebase v9 modular SDK via CDN imports and exposes helpers on window.FirestoreHelper

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, runTransaction, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase config - replace or use the supplied values
const firebaseConfig = {
  apiKey: "AIzaSyDGsK8Tp7gxI0qSiAbiul60Jp0HleGHlMg",
  authDomain: "flutter-ai-playground-687a5.firebaseapp.com",
  projectId: "flutter-ai-playground-687a5",
  storageBucket: "flutter-ai-playground-687a5.firebasestorage.app",
  messagingSenderId: "357164612972",
  appId: "1:357164612972:web:5182a768ef7d3011db0749"
};

let app = null;
let db = null;
let enabled = false;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  enabled = true;
  console.log('Firebase initialized');
} catch (e) {
  console.warn('Firebase init failed or not present', e);
  enabled = false;
}

// Helper functions with graceful fallback
async function getTokenDoc(token) {
  if (!enabled) return null;
  try {
    const ref = doc(db, 'tokens', token);
    const snap = await getDoc(ref);
    if (snap.exists()) return { id: snap.id, ...snap.data() };
    return null;
  } catch (e) {
    console.error('getTokenDoc error', e);
    return null;
  }
}

async function createToken(tokenObj) {
  if (!enabled) return Promise.reject(new Error('Firestore disabled'));
  try {
    const ref = doc(db, 'tokens', tokenObj.token);
    await setDoc(ref, {
      studentName: tokenObj.studentName,
      studentEmail: tokenObj.studentEmail,
      generated: tokenObj.generated || new Date().toLocaleString(),
      used: !!tokenObj.used,
      invited: !!tokenObj.invited,
      createdAt: serverTimestamp(),
      meta: tokenObj.meta || null
    });
    return { ok: true };
  } catch (e) {
    console.error('createToken error', e);
    throw e;
  }
}

async function markTokenUsed(token, metadata = {}) {
  if (!enabled) return Promise.reject(new Error('Firestore disabled'));
  const ref = doc(db, 'tokens', token);
  try {
    return await runTransaction(db, async (tx) => {
      const snap = await tx.get(ref);
      if (!snap.exists()) throw new Error('Token not found');
      const data = snap.data();
      if (data.used) throw new Error('Token already used');
      tx.update(ref, {
        used: true,
        attemptedBy: metadata.byEmail || null,
        attemptedAt: serverTimestamp()
      });
      return { ok: true };
    });
  } catch (e) {
    console.error('markTokenUsed error', e);
    throw e;
  }
}

async function saveAssessment(record) {
  if (!enabled) return Promise.reject(new Error('Firestore disabled'));
  try {
    const col = collection(db, 'assessments');
    const docRef = await addDoc(col, {
      ...record,
      createdAt: serverTimestamp()
    });
    return { ok: true, id: docRef.id };
  } catch (e) {
    console.error('saveAssessment error', e);
    throw e;
  }
}

async function updateAssessment(id, fields) {
  if (!enabled) return Promise.reject(new Error('Firestore disabled'));
  try {
    const ref = doc(db, 'assessments', id);
    await updateDoc(ref, { ...fields });
    return { ok: true };
  } catch (e) {
    console.error('updateAssessment error', e);
    throw e;
  }
}

// Expose helpers globally for non-module scripts
window.FirestoreHelper = {
  enabled,
  getTokenDoc,
  createToken,
  markTokenUsed,
  saveAssessment,
  updateAssessment
};

console.log('FirestoreHelper available:', window.FirestoreHelper.enabled);
