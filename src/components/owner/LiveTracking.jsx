import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Gauge, Compass, Fuel, Battery } from 'lucide-react';
const LiveTracking = ({ vehicleData, liveData }) => {
  const [isTracking, setIsTracking] = useState(true);

  const trackingData = [
    {
      icon: <Gauge className="w-5 h-5" />,
      label: 'Current Speed',
      value: `${liveData.speed || 0} km/h`,
      color: liveData.speed > 80 ? 'text-red-600' : 'text-green-600'
    },
    {
      icon: <Compass className="w-5 h-5" />,
      label: 'Heading',
      value: '180°',
      color: 'text-blue-600'
    },
    {
      icon: <Fuel className="w-5 h-5" />,
      label: 'Fuel Level',
      value: `${liveData.fuel?.toFixed(1) || 0}%`,
      color: 'text-orange-600'
    },
    {
      icon: <Battery className="w-5 h-5" />,
      label: 'Engine Temp',
      value: `${liveData.engineTemp || 0}°C`,
      color: liveData.engineTemp > 90 ? 'text-red-600' : 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Live Vehicle Tracking</h2>
          <p className="text-blue-900/70">Real-time location and movement tracking</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            isTracking ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isTracking ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm font-semibold">
              {isTracking ? 'Live Tracking' : 'Tracking Paused'}
            </span>
          </div>
          <button
            onClick={() => setIsTracking(!isTracking)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              isTracking 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isTracking ? 'Pause Tracking' : 'Resume Tracking'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/20 flex items-center justify-between">
              <h3 className="font-bold text-blue-900">Live Location</h3>
              <div className="flex items-center gap-2 text-sm text-blue-900/70">
                <MapPin className="w-4 h-4" />
                <span>Bangalore, Karnataka</span>
              </div>
            </div>
            <div className="h-96 bg-gradient-to-br from-blue-100 to-cyan-100 relative">
              {/* Simulated Map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center mx-auto mb-4">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-blue-900">{vehicleData.plateNumber}</p>
                  <p className="text-sm text-blue-900/70">Live tracking active</p>
                </div>
              </div>
              
              {/* Map Grid */}
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="absolute w-full h-px bg-blue-300 top-1/4"></div>
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="absolute h-full w-px bg-blue-300 left-1/4"></div>
                ))}
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-sm text-blue-900 font-semibold">Current Location</div>
                <div className="text-xs text-blue-900/70">
                  Lat: {liveData.location?.lat?.toFixed(4) || '12.9716'}, 
                  Lng: {liveData.location?.lng?.toFixed(4) || '77.5946'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Data */}
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Live Data</h3>
            <div className="space-y-4">
              {trackingData.map((data, index) => (
                <motion.div
                  key={data.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {React.cloneElement(data.icon, { className: `w-4 h-4 ${data.color}` })}
                    <span className="font-semibold text-blue-900 text-sm">{data.label}</span>
                  </div>
                  <span className={`font-bold ${data.color}`}>{data.value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Vehicle Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-900/70">Plate Number:</span>
                <span className="font-semibold text-blue-900">{vehicleData.plateNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-900/70">Model:</span>
                <span className="font-semibold text-blue-900">{vehicleData.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-900/70">Driver:</span>
                <span className="font-semibold text-blue-900">{vehicleData.driver?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-900/70">Last Update:</span>
                <span className="font-semibold text-blue-900">
                  {liveData.timestamp ? new Date(liveData.timestamp).toLocaleTimeString() : 'Just now'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;