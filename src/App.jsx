import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import toast, { Toaster } from "react-hot-toast";
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import OwnerDashboard from './pages/OwnerDashboard';
import EnterpriseDashboard from './pages/EnterpriseDashboard';
import DriverDashboard from './pages/DriverDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Full width wrapper */}
        <div className="min-h-screen w-full bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/owner" 
              element={
                <ProtectedRoute>
                  <OwnerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/enterprise" 
              element={
                <ProtectedRoute>
                  <EnterpriseDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/driver" 
              element={
                <ProtectedRoute>
                  <DriverDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>

          {/* Toast Notifications */}
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
