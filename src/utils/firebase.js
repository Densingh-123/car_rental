// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJmfeDLlx0CrONqNKRtmHCeA9-MzRYlIw",
  authDomain: "model-155e4.firebaseapp.com",
  projectId: "model-155e4",
  storageBucket: "model-155e4.appspot.com",
  messagingSenderId: "177746217017",
  appId: "1:177746217017:web:b5834aa0b3c6af2c7d65e8",
  measurementId: "G-61MV52Z21W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore(app);

// Firebase Authentication
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Firebase Storage
export const storage = getStorage(app);

// Default export (optional)
export default app;
