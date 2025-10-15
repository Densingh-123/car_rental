// src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Car, 
  Building,
  MapPin,
  Check
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register, userProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: searchParams.get('role') || 'owner',
    address: '',
    companyName: '',
    vehicleCount: 1
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (userProfile) navigate(`/${userProfile.role}`);
  }, [userProfile, navigate]);

  const roles = [
    { value: 'owner', label: 'Vehicle Owner', icon: <Car className="w-5 h-5" /> },
    { value: 'enterprise', label: 'Enterprise', icon: <Building className="w-5 h-5" /> },
    { value: 'driver', label: 'Driver', icon: <User className="w-5 h-5" /> }
  ];

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validateStep1 = () => {
    if (!formData.name.trim()) return false;
    if (!formData.email.trim()) return false;
    if (!formData.phone.trim()) return false;
    if (formData.password.length < 6) return false;
    if (formData.password !== formData.confirmPassword) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) setStep(2);
      return;
    }
    setLoading(true);
    try {
      await register(formData.email, formData.password, {
        name: formData.name,
        phone: formData.phone,
        role: formData.role,
        address: formData.address,
        ...(formData.role === 'enterprise' && {
          companyName: formData.companyName,
          vehicleCount: parseInt(formData.vehicleCount),
        }),
      });
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  NEW UI – SAME LOGIC                                               */
  /* ------------------------------------------------------------------ */

  const progressSteps = [
    { number: 1, label: 'Account Details' },
    { number: 2, label: 'Complete Profile' },
  ];

  return (
    <div className="min-h-screen grid place-items-center px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
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
            <p className="text-blue-900/70 mt-1">Create your account</p>
          </div>

          {/* progress bar */}
          <div className="flex items-center justify-center mb-6 gap-2">
            {progressSteps.map((s, idx) => (
              <React.Fragment key={s.number}>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-semibold
                    ${step >= s.number ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-500'}`}
                >
                  {step > s.number ? <Check className="w-4 h-4" /> : s.number}
                </div>
                <span className={`text-xs ${step >= s.number ? 'text-blue-600' : 'text-gray-400'}`}>
                  {s.label}
                </span>
                {idx < progressSteps.length - 1 && (
                  <div className={`w-12 h-0.5 ${step > s.number ? 'bg-blue-600' : 'bg-gray-300'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* step 1 */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                {/* role */}
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">Register as</label>
                  <div className="grid grid-cols-3 gap-2">
                    {roles.map((r) => (
                      <button
                        type="button"
                        key={r.value}
                        onClick={() => setFormData((p) => ({ ...p, role: r.value }))}
                        className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all
                          ${formData.role === r.value
                            ? 'border-blue-500 bg-blue-500/10 text-blue-700'
                            : 'border-blue-100 bg-white/50 text-blue-900/70 hover:border-blue-300'}`}
                      >
                        {r.icon}
                        <span className="text-xs font-medium">{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* name */}
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-white/60 border border-blue-100 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                </div>

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

                {/* phone */}
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
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

                {/* confirm password */}
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 bg-white/60 border border-blue-100 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* step 2 */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                {/* address */}
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-1">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
                    <textarea
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123, Fleet Street, Mumbai"
                      className="w-full pl-10 pr-4 py-3 bg-white/60 border border-blue-100 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* enterprise fields */}
                {formData.role === 'enterprise' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-blue-900 mb-1">Company Name</label>
                      <input
                        name="companyName"
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="ABC Logistics Pvt Ltd"
                        className="w-full px-4 py-3 bg-white/60 border border-blue-100 rounded-lg
                          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-blue-900 mb-1">Number of Vehicles</label>
                      <select
                        name="vehicleCount"
                        value={formData.vehicleCount}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/60 border border-blue-100 rounded-lg
                          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} vehicle{i ? 's' : ''}
                          </option>
                        ))}
                        <option value="10+">10+ vehicles</option>
                      </select>
                    </div>
                  </>
                )}

                {/* terms */}
                <div className="flex items-start gap-3 text-sm">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="mt-1 rounded text-blue-600"
                  />
                  <label htmlFor="terms" className="text-blue-900/80">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </motion.div>
            )}

            {/* actions */}
            <div className="flex gap-3">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-lg border-2 border-blue-200 text-blue-700 font-semibold
                    hover:bg-blue-50 transition"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`${step === 2 ? 'flex-1' : 'w-full'} py-3 rounded-lg font-semibold text-white
                  bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/30
                  disabled:opacity-60 disabled:cursor-wait transition`}
              >
                {loading ? 'Creating Account...' : step === 1 ? 'Continue' : 'Create Account'}
              </button>
            </div>
          </form>

          {/* footer */}
          <p className="text-center mt-6 text-sm text-blue-900/70">
            Already have an account?{' '}
            <Link
              to={`/login?role=${formData.role}`}
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;