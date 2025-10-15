// src/firebase/services.js
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

// User Management
export const usersCollection = collection(db, 'users');

export const getUsers = async () => {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addUser = async (userData) => {
  return await addDoc(usersCollection, {
    ...userData,
    createdAt: serverTimestamp(),
    status: 'active'
  });
};

export const updateUser = async (id, userData) => {
  const userDoc = doc(db, 'users', id);
  return await updateDoc(userDoc, userData);
};

export const deleteUser = async (id) => {
  const userDoc = doc(db, 'users', id);
  return await deleteDoc(userDoc);
};

// Vehicle Management
export const vehiclesCollection = collection(db, 'vehicles');

export const getVehicles = async () => {
  const snapshot = await getDocs(vehiclesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addVehicle = async (vehicleData) => {
  return await addDoc(vehiclesCollection, {
    ...vehicleData,
    createdAt: serverTimestamp(),
    status: 'active',
    currentSpeed: 0,
    fuelLevel: 100,
    maintenanceStatus: 'good'
  });
};

export const updateVehicle = async (id, vehicleData) => {
  const vehicleDoc = doc(db, 'vehicles', id);
  return await updateDoc(vehicleDoc, vehicleData);
};

export const deleteVehicle = async (id) => {
  const vehicleDoc = doc(db, 'vehicles', id);
  return await deleteDoc(vehicleDoc);
};

// Real-time listeners
export const subscribeToUsers = (callback) => {
  return onSnapshot(usersCollection, (snapshot) => {
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(users);
  });
};

export const subscribeToVehicles = (callback) => {
  return onSnapshot(vehiclesCollection, (snapshot) => {
    const vehicles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(vehicles);
  });
};