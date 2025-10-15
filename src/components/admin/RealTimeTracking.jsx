import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Gauge, Compass, Battery, Wifi, Satellite } from 'lucide-react';

const RealTimeTracking = ({ vehicles }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [liveData, setLiveData] = useState({});
  const [updateInterval, setUpdateInterval] = useState(2000);

  // Simulate real-time GPS updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {};
      vehicles.forEach(vehicle => {
        if (vehicle.status === 'active') {
          newData[vehicle.id] = {
            latitude: 12.9716 + (Math.random() - 0.5) * 0.01,
            longitude: 77.5946 + (Math.random() - 0.5) * 0.01,
            speed: Math.floor(Math.random() * 120),
            heading: Math.floor(Math.random() * 360),
            timestamp: new Date().toISOString(),
            fuelLevel: Math.max(0, (vehicle.fuelLevel || 100) - Math.random() * 0.5),
            battery: 85 + Math.floor(Math.random() * 15)
          };
        }
      });
      setLiveData(newData);
    }, updateInterval);

    return () => clearInterval(interval);
  }, [vehicles, updateInterval]);

  const getVehicleStatus = (vehicle) => {
    const data = liveData[vehicle.id];
    if (!data) return 'offline';
    if (data.speed > 80) return 'overspeeding';
    if (data.speed > 0) return 'moving';
    return 'idle';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'moving': return 'text-green-600';
      case 'idle': return 'text-yellow-600';
      case 'overspeeding': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Real-time Tracking</h2>
          <p className="text-blue-900/70">Live GPS updates every 2 seconds</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={updateInterval}
            onChange={(e) => setUpdateInterval(Number(e.target.value))}
            className="px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value={1000}>1 second</option>
            <option value={2000}>2 seconds</option>
            <option value={5000}>5 seconds</option>
            <option value={10000}>10 seconds</option>
          </select>
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 rounded-lg">
            <Wifi className="w-4 h-4" />
            <span className="text-sm font-semibold">Live</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicles List */}
        <div className="space-y-4">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-4 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Active Vehicles ({vehicles.filter(v => v.status === 'active').length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {vehicles.filter(v => v.status === 'active').map((vehicle, index) => {
                const data = liveData[vehicle.id];
                const status = getVehicleStatus(vehicle);
                
                return (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedVehicle?.id === vehicle.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-white/50 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          status === 'moving' ? 'bg-green-500' :
                          status === 'idle' ? 'bg-yellow-500' :
                          status === 'overspeeding' ? 'bg-red-500' : 'bg-gray-500'
                        }`} />
                        <h4 className="font-bold text-blue-900">{vehicle.plateNumber}</h4>
                      </div>
                      <span className={`text-sm font-semibold ${getStatusColor(status)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Gauge className="w-3 h-3 text-blue-600" />
                        <span>{data?.speed || 0} km/h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Battery className="w-3 h-3 text-green-600" />
                        <span>{data?.battery || 0}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Compass className="w-3 h-3 text-purple-600" />
                        <span>{data?.heading || 0}°</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-600" />
                        <span>{data ? 'Live' : 'Offline'}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Map and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map Placeholder */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/20 flex items-center justify-between">
              <h3 className="font-bold text-blue-900">Live Vehicle Locations</h3>
              <div className="flex items-center gap-2 text-sm text-blue-900/70">
                <Satellite className="w-4 h-4" />
                <span>GPS Active</span>
              </div>
            </div>
            <div className="h-96 bg-gradient-to-br from-blue-100 to-cyan-100 relative">
              {/* Simulated Map with Vehicle Markers */}
              {vehicles.filter(v => v.status === 'active').map((vehicle) => {
                const data = liveData[vehicle.id];
                if (!data) return null;
                
                return (
                  <div
                    key={vehicle.id}
                    className={`absolute w-4 h-4 rounded-full border-2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                      getVehicleStatus(vehicle) === 'overspeeding' 
                        ? 'bg-red-500 border-red-700 animate-pulse' 
                        : getVehicleStatus(vehicle) === 'moving'
                        ? 'bg-green-500 border-green-700'
                        : 'bg-yellow-500 border-yellow-700'
                    }`}
                    style={{
                      left: `${((data.longitude - 77.5896) / 0.01) * 50 + 50}%`,
                      top: `${((data.latitude - 12.9666) / 0.01) * 50 + 50}%`
                    }}
                    title={`${vehicle.plateNumber} - ${data.speed} km/h`}
                  />
                );
              })}
              
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
                <div className="text-sm text-blue-900 font-semibold">Bangalore Area</div>
                <div className="text-xs text-blue-900/70">Live vehicle tracking active</div>
              </div>
            </div>
          </div>

          {/* Selected Vehicle Details */}
          {selectedVehicle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="font-bold text-blue-900 mb-4">Vehicle Details - {selectedVehicle.plateNumber}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <DataCard
                  icon={<Speed className="w-5 h-5" />}
                  label="Current Speed"
                  value={`${liveData[selectedVehicle.id]?.speed || 0} km/h`}
                  color={liveData[selectedVehicle.id]?.speed > 80 ? 'text-red-600' : 'text-green-600'}
                />
                <DataCard
                  icon={<Compass className="w-5 h-5" />}
                  label="Heading"
                  value={`${liveData[selectedVehicle.id]?.heading || 0}°`}
                  color="text-blue-600"
                />
                <DataCard
                  icon={<Battery className="w-5 h-5" />}
                  label="Battery"
                  value={`${liveData[selectedVehicle.id]?.battery || 0}%`}
                  color="text-green-600"
                />
                <DataCard
                  icon={<Navigation className="w-5 h-5" />}
                  label="Status"
                  value={getVehicleStatus(selectedVehicle)}
                  color={getStatusColor(getVehicleStatus(selectedVehicle))}
                />
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-900/70">Last Update: </span>
                  <span className="font-semibold text-blue-900">
                    {liveData[selectedVehicle.id]?.timestamp ? new Date(liveData[selectedVehicle.id].timestamp).toLocaleTimeString() : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-blue-900/70">Driver: </span>
                  <span className="font-semibold text-blue-900">{selectedVehicle.driverName}</span>
                </div>
                <div>
                  <span className="text-blue-900/70">Vehicle: </span>
                  <span className="font-semibold text-blue-900">{selectedVehicle.model}</span>
                </div>
                <div>
                  <span className="text-blue-900/70">Fuel: </span>
                  <span className="font-semibold text-blue-900">{liveData[selectedVehicle.id]?.fuelLevel?.toFixed(1) || 0}%</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const DataCard = ({ icon, label, value, color }) => (
  <div className="bg-blue-50 rounded-xl p-4 text-center">
    <div className="flex justify-center mb-2">
      {React.cloneElement(icon, { className: `w-6 h-6 ${color}` })}
    </div>
    <div className="text-xs font-semibold text-blue-900/70 mb-1">{label}</div>
    <div className={`text-lg font-bold ${color}`}>{value}</div>
  </div>
);

export default RealTimeTracking;