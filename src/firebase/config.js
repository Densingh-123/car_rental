// src/firebase/config.js
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAJmfeDLlx0CrONqNKRtmHCeA9-MzRYlIw",
  authDomain: "model-155e4.firebaseapp.com",
  projectId: "model-155e4",
  storageBucket: "model-155e4.appspot.com",
  messagingSenderId: "177746217017",
  appId: "1:177746217017:web:b5834aa0b3c6af2c7d65e8",
  measurementId: "G-61MV52Z21W"
};

// ✅ Initialize Firebase only if no apps exist
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
