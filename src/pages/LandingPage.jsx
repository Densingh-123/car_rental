// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navigation, MapPin, BarChart3, Shield, Zap, DollarSign } from 'lucide-react';

const LandingPage = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -120]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.25]);

  const features = [
    { icon: <Navigation />, title: 'Real-time Tracking', desc: 'Live GPS updates every 2 seconds' },
    { icon: <MapPin />, title: 'Geo-Fence Alerts', desc: 'Instant boundary breach push + SMS' },
    { icon: <BarChart3 />, title: 'AI Driver Score', desc: 'Behaviour analysis & risk predictions' },
    { icon: <Shield />, title: 'Remote Immobilizer', desc: 'One-click engine kill / resume' },
    { icon: <Zap />, title: 'Predictive Maintenance', desc: 'Break-down alerts before they happen' },
    { icon: <DollarSign />, title: 'Usage-based Billing', desc: 'Automated rental invoicing & tolls' },
  ];

  return (
    <div className="bg-slate-50 text-slate-800 font-inter overflow-x-hidden">
      {/* ------------- HERO ------------- */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50"
      >
        {/* Soft blue aurora */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 via-blue-400/20 to-cyan-400/25 blur-3xl" />
        <div className="absolute inset-0 bg-grid-blue opacity-10" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left text block */}
          <div className="text-center lg:text-left">
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl italic font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500"
            >
              Yantra Kavasam
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-4 text-base sm:text-lg md:text-xl text-blue-900/80 max-w-lg mx-auto lg:mx-0"
            >
              Track Smarter. Drive Safer. Save More.
            </motion.p>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
             <Link
  to="/login?role=owner"
  className="px-6 py-3 font-semibold bg-blue-600 text-white shadow-lg shadow-blue-500/30 
             hover:scale-105 hover:bg-blue-700 hover:text-white transition-all duration-300 rounded-lg"
>
  Owner Login
</Link>

              <Link
                to="/login?role=enterprise"
                className="px-6 py-3 font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors rounded-lg"
              >
                Enterprise Login
              </Link>
              <button className="px-6 py-3 font-semibold bg-white/70 backdrop-blur border border-blue-200 text-blue-700 hover:bg-white transition rounded-lg">
                Book Demo
              </button>
            </motion.div>

            {/* 3-line description */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-6 max-w-lg text-center lg:text-left text-gray-700 space-y-2 text-sm md:text-base"
            >
              <p>Yantra Kavasam is a smart vehicle tracking platform designed to keep your fleet safe and efficient.</p>
              <p>Monitor routes, optimize driving behavior, and save costs with real-time analytics and alerts.</p>
              <p>Our easy-to-use dashboard ensures you can track, manage, and make decisions quickly and confidently.</p>
            </motion.div>
          </div>

          {/* Right image */}
         <motion.div
  initial={{ x: 80, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 0.6, duration: 0.9 }}
  className="flex justify-center"
>
  <img
    src="/car.png"
    alt="Car Tracking"
    className="w-3/4 max-w-md rounded-2xl shadow-2xl shadow-blue-500/10"
  />
</motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-blue-500 rounded-full mt-2" />
        </motion.div>
      </motion.section>

      {/* ------------- FEATURES ------------- */}
      <section className="py-28 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
            Everything you need to manage fleets at scale
          </h2>
          <p className="mt-4 text-base sm:text-lg text-blue-900/70 max-w-2xl mx-auto">
            AI-driven insights, security, and automation — packaged in one sleek platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="group relative p-6 rounded-2xl bg-white backdrop-blur-md border border-blue-100 hover:border-blue-400 shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              <div className="w-12 h-12 mb-4 text-blue-600 flex items-center justify-center">
                {React.cloneElement(f.icon, { className: 'w-8 h-8' })}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-slate-600 text-sm sm:text-base">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------- CTA ------------- */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Ready to future-proof your fleet?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-white/90"
          >
            Start your 14-day free trial today. No credit card required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/register?role=owner"
              className="px-8 py-3 rounded-full font-semibold bg-white text-blue-600 shadow-lg hover:scale-105 transition"
            >
              Start Free Trial
            </Link>
            <Link
              to="/register?role=enterprise"
              className="px-8 py-3 rounded-full font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-colors"
            >
              Enterprise Solution
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ------------- FOOTER ------------- */}
      <footer className="py-6 text-center text-blue-700/60 text-sm">
        © {new Date().getFullYear()} Yantra Kavasam. All rights reserved.
      </footer>

      {/* ------------- CSS ------------- */}
      <style jsx global>{`
        @import url('https://rsms.me/inter/inter.css');
        html {
          font-family: 'Inter', sans-serif;
        }
        .bg-grid-blue {
          background-image: linear-gradient(rgba(30, 64, 175, 0.08) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(30, 64, 175, 0.08) 1px, transparent 1px);
          background-size: 2rem 2rem;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
