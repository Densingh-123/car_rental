// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../utils/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await fetchUserProfile(result.user.uid);
      toast.success('Login successful!');
      return result;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const loginWithGoogle = async (role) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserProfile(result.user, role);
      toast.success('Google login successful!');
      return result;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const register = async (email, password, userData) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserProfile(result.user, userData.role, userData);
      toast.success('Registration successful!');
      return result;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const saveUserProfile = async (user, role, additionalData = {}) => {
    const userRef = doc(db, 'users', user.uid);
    const userProfile = {
      uid: user.uid,
      email: user.email,
      role: role,
      displayName: additionalData.name || user.displayName,
      phone: additionalData.phone || '',
      createdAt: new Date(),
      ...additionalData
    };
    
    await setDoc(userRef, userProfile);
    setUserProfile(userProfile);
  };

  const fetchUserProfile = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      setUserProfile(userSnap.data());
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    login,
    loginWithGoogle,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}