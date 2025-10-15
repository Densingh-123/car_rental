// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Car, Building, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, loginWithGoogle, userProfile } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: searchParams.get('role') || 'owner',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userProfile) navigate(`/${userProfile.role}`);
  }, [userProfile, navigate]);

  const roles = [
    { value: 'owner', label: 'Vehicle Owner', icon: <Car className="w-5 h-5" /> },
    { value: 'enterprise', label: 'Enterprise', icon: <Building className="w-5 h-5" /> },
    { value: 'driver', label: 'Driver', icon: <User className="w-5 h-5" /> },
    { value: 'admin', label: 'Admin', icon: <Lock className="w-5 h-5" /> },
  ];

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle(formData.role);
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  NEW UI – SAME LOGIC                                               */
  /* ------------------------------------------------------------------ */

  return (
    <div className="min-h-screen grid place-items-center px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* glass card */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-8">
          {/* header */}
          <div className="text-center mb-6">
            <Link to="/">
              <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
                Yantra Kavasam
              </h1>
            </Link>
            <p className="text-blue-900/70 mt-1">Sign in to your account</p>
          </div>

          {/* role pills */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-blue-900 mb-2">Login as</label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, role: r.value }))}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border-2 transition-all
                    ${formData.role === r.value
                      ? 'border-blue-500 bg-blue-500/10 text-blue-700'
                      : 'border-blue-100 bg-white/50 text-blue-900/70 hover:border-blue-300'}`}
                >
                  {r.icon}
                  <span className="text-sm font-medium">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* email */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/60 border border-blue-100 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* password */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-white/60 border border-blue-100 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* helpers */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-blue-900/80">
                <input type="checkbox" className="rounded text-blue-600" />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500
                hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-60 disabled:cursor-wait transition"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px bg-blue-200 flex-1" />
            <span className="text-xs text-blue-700/60 uppercase">Or</span>
            <div className="h-px bg-blue-200 flex-1" />
          </div>

          {/* google */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-blue-200
              bg-white/60 text-blue-900 hover:bg-white transition"
          >
            <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="G" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* footer */}
          <p className="text-center mt-6 text-sm text-blue-900/70">
            Don't have an account?{' '}
            <Link
              to={`/register?role=${formData.role}`}
              className="text-blue-600 hover:text-blue-500 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;