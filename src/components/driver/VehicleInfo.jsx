import React from 'react';
import { motion } from 'framer-motion';
import { Car, Fuel, Gauge, Battery, Wrench, Calendar, Shield } from 'lucide-react';

const VehicleInfo = ({ vehicle, liveData }) => {
  const maintenanceItems = [
    { item: 'Oil Change', due: '500 km', status: 'good' },
    { item: 'Brake Pads', due: '1,200 km', status: 'warning' },
    { item: 'Tire Rotation', due: '2,000 km', status: 'good' },
    { item: 'Engine Check', due: '5,000 km', status: 'good' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Vehicle Information</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vehicle Details */}
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Vehicle Details</h3>
            <div className="space-y-4">
              <DetailItem icon={<Car className="w-4 h-4" />} label="Plate Number" value={vehicle?.plate} />
              <DetailItem icon={<Car className="w-4 h-4" />} label="Model" value={vehicle?.model} />
              <DetailItem icon={<Fuel className="w-4 h-4" />} label="Fuel Type" value={vehicle?.fuelType} />
              <DetailItem icon={<Shield className="w-4 h-4" />} label="Insurance" value={vehicle?.insurance} />
              <DetailItem icon={<Calendar className="w-4 h-4" />} label="Registration" value={vehicle?.registration} />
            </div>
          </div>

          {/* Live Data */}
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Current Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <LiveDataCard
                icon={<Gauge className="w-5 h-5" />}
                label="Speed"
                value={`${liveData.speed || 0} km/h`}
                color={liveData.speed > 80 ? 'text-red-600' : 'text-green-600'}
              />
              <LiveDataCard
                icon={<Fuel className="w-5 h-5" />}
                label="Fuel"
                value={`${liveData.fuel?.toFixed(1) || 0}%`}
                color="text-blue-600"
              />
              <LiveDataCard
                icon={<Battery className="w-5 h-5" />}
                label="Battery"
                value={`${liveData.battery || 0}%`}
                color="text-green-600"
              />
              <LiveDataCard
                icon={<Wrench className="w-5 h-5" />}
                label="Engine Temp"
                value={`${liveData.engineTemp || 0}°C`}
                color={liveData.engineTemp > 90 ? 'text-red-600' : 'text-blue-600'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Schedule */}
      <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Maintenance Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {maintenanceItems.map((item, index) => (
            <motion.div
              key={item.item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <div>
                <div className="font-semibold text-blue-900">{item.item}</div>
                <div className="text-sm text-blue-900/70">Due in {item.due}</div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center justify-between py-2 border-b border-blue-100">
    <div className="flex items-center gap-3">
      {React.cloneElement(icon, { className: 'w-4 h-4 text-blue-600' })}
      <span className="font-semibold text-blue-900/70">{label}</span>
    </div>
    <span className="font-semibold text-blue-900">{value}</span>
  </div>
);

const LiveDataCard = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-xl p-4 text-center border border-blue-200">
    <div className="flex justify-center mb-2">
      {React.cloneElement(icon, { className: `w-5 h-5 ${color}` })}
    </div>
    <div className="text-xs font-semibold text-blue-900/70 mb-1">{label}</div>
    <div className={`text-lg font-bold ${color}`}>{value}</div>
  </div>
);

export default VehicleInfo;