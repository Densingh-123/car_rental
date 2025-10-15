import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wrench, AlertTriangle, CheckCircle, Clock, Car, Battery, Gauge, Droplets } from 'lucide-react';

const PredictiveMaintenance = ({ vehicles }) => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    // Simulate predictive maintenance data
    const data = vehicles.map(vehicle => {
      const baseHealth = 85 + Math.random() * 15;
      const brakeHealth = Math.max(0, baseHealth - Math.random() * 30);
      const tireHealth = Math.max(0, baseHealth - Math.random() * 25);
      const engineHealth = Math.max(0, baseHealth - Math.random() * 20);
      const batteryHealth = Math.max(0, baseHealth - Math.random() * 15);
      
      const overallHealth = Math.round((brakeHealth + tireHealth + engineHealth + batteryHealth) / 4);
      
      const issues = [];
      if (brakeHealth < 70) issues.push('Brake pads worn');
      if (tireHealth < 65) issues.push('Tire tread low');
      if (engineHealth < 75) issues.push('Oil change due');
      if (batteryHealth < 80) issues.push('Battery aging');
      
      return {
        id: vehicle.id,
        vehicle: vehicle.plateNumber,
        driver: vehicle.driverName,
        model: vehicle.model,
        overallHealth,
        components: {
          brakes: Math.round(brakeHealth),
          tires: Math.round(tireHealth),
          engine: Math.round(engineHealth),
          battery: Math.round(batteryHealth),
          transmission: Math.round(85 + Math.random() * 15),
          suspension: Math.round(80 + Math.random() * 20)
        },
        nextService: new Date(Date.now() + (7 + Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        lastService: new Date(Date.now() - (30 + Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString(),
        mileage: Math.round(5000 + Math.random() * 45000),
        issues,
        prediction: overallHealth < 70 ? 'high' : overallHealth < 80 ? 'medium' : 'low',
        maintenanceCost: Math.round(5000 + Math.random() * 20000)
      };
    });
    setMaintenanceData(data);
  }, [vehicles]);

  const getHealthColor = (health) => {
    if (health >= 80) return 'text-green-600';
    if (health >= 70) return 'text-yellow-600';
    if (health >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getHealthBgColor = (health) => {
    if (health >= 80) return 'bg-green-100';
    if (health >= 70) return 'bg-yellow-100';
    if (health >= 60) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getPredictionColor = (prediction) => {
    switch (prediction) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Predictive Maintenance</h2>
          <p className="text-blue-900/70">Break-down alerts before they happen</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-2 rounded-lg">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-semibold">
              {maintenanceData.filter(v => v.prediction === 'high').length} Critical
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicles List */}
        <div className="space-y-4">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-4 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Vehicle Health Status</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {maintenanceData.map((vehicle, index) => (
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
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-blue-900">{vehicle.vehicle}</h4>
                      <p className="text-sm text-blue-900/70">{vehicle.driver}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPredictionColor(vehicle.prediction)}`}>
                      {vehicle.prediction.toUpperCase()} RISK
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wrench className={`w-4 h-4 ${getHealthColor(vehicle.overallHealth)}`} />
                      <span className={`text-lg font-bold ${getHealthColor(vehicle.overallHealth)}`}>
                        {vehicle.overallHealth}%
                      </span>
                    </div>
                    <span className="text-sm text-blue-900/70">
                      {vehicle.mileage.toLocaleString()} km
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getHealthBgColor(vehicle.overallHealth)}`}
                      style={{ width: `${vehicle.overallHealth}%` }}
                    ></div>
                  </div>
                  
                  {vehicle.issues.length > 0 && (
                    <div className="mt-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-red-600" />
                      <span className="text-xs text-red-600 font-semibold">
                        {vehicle.issues.length} issue{vehicle.issues.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedVehicle ? (
            <>
              {/* Health Overview */}
              <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">{selectedVehicle.vehicle}</h3>
                    <p className="text-blue-900/70">{selectedVehicle.model} • {selectedVehicle.driver}</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getHealthColor(selectedVehicle.overallHealth)}`}>
                      {selectedVehicle.overallHealth}%
                    </div>
                    <div className="text-sm text-blue-900/70">Overall Health</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <ComponentHealth
                    label="Brakes"
                    health={selectedVehicle.components.brakes}
                    icon={<AlertTriangle className="w-4 h-4" />}
                  />
                  <ComponentHealth
                    label="Tires"
                    health={selectedVehicle.components.tires}
                    icon={<Car className="w-4 h-4" />}
                  />
                  <ComponentHealth
                    label="Engine"
                    health={selectedVehicle.components.engine}
                    icon={<Gauge className="w-4 h-4" />}
                  />
                  <ComponentHealth
                    label="Battery"
                    health={selectedVehicle.components.battery}
                    icon={<Battery className="w-4 h-4" />}
                  />
                  <ComponentHealth
                    label="Transmission"
                    health={selectedVehicle.components.transmission}
                    icon={<Droplets className="w-4 h-4" />}
                  />
                  <ComponentHealth
                    label="Suspension"
                    health={selectedVehicle.components.suspension}
                    icon={<Wrench className="w-4 h-4" />}
                  />
                </div>

                {/* Maintenance Info */}
                <div className="border-t border-blue-200 pt-4">
                  <h4 className="font-semibold text-blue-900 mb-3">Maintenance Schedule</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <InfoItem
                      label="Last Service"
                      value={new Date(selectedVehicle.lastService).toLocaleDateString()}
                    />
                    <InfoItem
                      label="Next Service"
                      value={new Date(selectedVehicle.nextService).toLocaleDateString()}
                    />
                    <InfoItem
                      label="Total Mileage"
                      value={`${selectedVehicle.mileage.toLocaleString()} km`}
                    />
                    <InfoItem
                      label="Est. Cost"
                      value={`₹${selectedVehicle.maintenanceCost.toLocaleString()}`}
                    />
                  </div>
                </div>
              </div>

              {/* Issues & Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
                  <h4 className="font-semibold text-blue-900 mb-4">Detected Issues</h4>
                  <div className="space-y-3">
                    {selectedVehicle.issues.length > 0 ? (
                      selectedVehicle.issues.map((issue, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-red-900 font-semibold">{issue}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-900 font-semibold">No critical issues detected</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
                  <h4 className="font-semibold text-blue-900 mb-4">AI Recommendations</h4>
                  <div className="space-y-3">
                    {selectedVehicle.components.brakes < 70 && (
                      <Recommendation
                        text="Replace brake pads immediately"
                        priority="high"
                        timeframe="Within 1 week"
                      />
                    )}
                    {selectedVehicle.components.tires < 65 && (
                      <Recommendation
                        text="Check and replace tires"
                        priority="high"
                        timeframe="Within 2 weeks"
                      />
                    )}
                    {selectedVehicle.components.engine < 75 && (
                      <Recommendation
                        text="Schedule oil change and engine check"
                        priority="medium"
                        timeframe="Within 1 month"
                      />
                    )}
                    {selectedVehicle.components.battery < 80 && (
                      <Recommendation
                        text="Monitor battery health closely"
                        priority="medium"
                        timeframe="Ongoing"
                      />
                    )}
                    {selectedVehicle.overallHealth >= 85 && (
                      <Recommendation
                        text="Vehicle in excellent condition"
                        priority="low"
                        timeframe="Continue regular maintenance"
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-12 shadow-lg text-center">
              <Wrench className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Select a Vehicle</h3>
              <p className="text-blue-900/70">Choose a vehicle to view predictive maintenance analysis and health status</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ComponentHealth = ({ label, health, icon }) => (
  <div className="bg-blue-50 rounded-xl p-4 text-center">
    <div className="flex justify-center mb-2">
      {React.cloneElement(icon, { className: `w-5 h-5 ${getHealthColor(health)}` })}
    </div>
    <div className="text-xs font-semibold text-blue-900/70 mb-1">{label}</div>
    <div className={`text-xl font-bold ${getHealthColor(health)}`}>{health}%</div>
    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
      <div
        className={`h-1 rounded-full ${getHealthBgColor(health)}`}
        style={{ width: `${health}%` }}
      ></div>
    </div>
  </div>
);

const InfoItem = ({ label, value }) => (
  <div>
    <div className="text-blue-900/70 text-xs font-semibold">{label}</div>
    <div className="text-blue-900 font-semibold">{value}</div>
  </div>
);

const Recommendation = ({ text, priority, timeframe }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-3 bg-white rounded-lg border border-white/50">
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-blue-900 flex-1">{text}</span>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(priority)}`}>
          {priority}
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs text-blue-900/70">
        <Clock className="w-3 h-3" />
        <span>{timeframe}</span>
      </div>
    </div>
  );
};

// Helper functions
const getHealthColor = (health) => {
  if (health >= 80) return 'text-green-600';
  if (health >= 70) return 'text-yellow-600';
  if (health >= 60) return 'text-orange-600';
  return 'text-red-600';
};

const getHealthBgColor = (health) => {
  if (health >= 80) return 'bg-green-100';
  if (health >= 70) return 'bg-yellow-100';
  if (health >= 60) return 'bg-orange-100';
  return 'bg-red-100';
};

export default PredictiveMaintenance;