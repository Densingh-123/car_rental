import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Zap, Download, Calendar, Award, Navigation } from 'lucide-react';

const TripHistory = ({ vehicleId }) => {
  const [trips, setTrips] = useState([
    { 
      id: 1, 
      date: '2024-01-15', 
      route: 'Home to Office', 
      distance: '15.2 km', 
      duration: '45 min', 
      fuel: '1.2 L', 
      score: 88,
      start: 'Bangalore Home',
      end: 'Tech Park Office',
      driver: 'Raj Kumar'
    },
    { 
      id: 2, 
      date: '2024-01-14', 
      route: 'Office to Mall', 
      distance: '8.7 km', 
      duration: '25 min', 
      fuel: '0.7 L', 
      score: 92,
      start: 'Tech Park Office',
      end: 'Orion Mall',
      driver: 'Raj Kumar'
    },
    { 
      id: 3, 
      date: '2024-01-13', 
      route: 'Mall to Home', 
      distance: '12.3 km', 
      duration: '35 min', 
      fuel: '1.0 L', 
      score: 85,
      start: 'Orion Mall',
      end: 'Bangalore Home',
      driver: 'Raj Kumar'
    },
    { 
      id: 4, 
      date: '2024-01-12', 
      route: 'Home to Airport', 
      distance: '35.6 km', 
      duration: '1h 15min', 
      fuel: '2.8 L', 
      score: 78,
      start: 'Bangalore Home',
      end: 'KIA Airport',
      driver: 'Raj Kumar'
    }
  ]);

  const [selectedTrip, setSelectedTrip] = useState(null);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Trip History</h2>
          <p className="text-blue-900/70">Complete record of all vehicle trips</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trips List */}
        <div className="lg:col-span-2">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/20">
              <h3 className="font-bold text-blue-900">Recent Trips ({trips.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Route</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Distance</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Duration</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Fuel</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {trips.map((trip, index) => (
                    <motion.tr
                      key={trip.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`hover:bg-white/30 transition-colors cursor-pointer ${
                        selectedTrip?.id === trip.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedTrip(trip)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-blue-900">{trip.date}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-semibold text-blue-900 text-sm">{trip.route}</div>
                          <div className="text-xs text-blue-900/70 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {trip.start} to {trip.end}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-blue-900">{trip.distance}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-blue-900">{trip.duration}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4 text-orange-600" />
                          <span className="font-semibold text-blue-900">{trip.fuel}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getScoreColor(trip.score)}`}>
                          <Award className="w-3 h-3 inline mr-1" />
                          {trip.score}/100
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="space-y-6">
          {selectedTrip ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-blue-900 mb-4">Trip Details</h3>
              <div className="space-y-4">
                <DetailItem label="Date" value={selectedTrip.date} />
                <DetailItem label="Driver" value={selectedTrip.driver} />
                <DetailItem label="Route" value={selectedTrip.route} />
                <DetailItem label="Start Location" value={selectedTrip.start} />
                <DetailItem label="End Location" value={selectedTrip.end} />
                <DetailItem label="Distance" value={selectedTrip.distance} />
                <DetailItem label="Duration" value={selectedTrip.duration} />
                <DetailItem label="Fuel Used" value={selectedTrip.fuel} />
                <DetailItem label="Driving Score" value={`${selectedTrip.score}/100`} />
              </div>

              <div className="mt-6 pt-4 border-t border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <MetricItem label="Avg Speed" value="45 km/h" color="blue" />
                  <MetricItem label="Max Speed" value="78 km/h" color="red" />
                  <MetricItem label="Fuel Efficiency" value="12.7 km/l" color="green" />
                  <MetricItem label="Idle Time" value="8 min" color="orange" />
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-12 shadow-lg text-center">
              <Navigation className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Select a Trip</h3>
              <p className="text-blue-900/70">Choose a trip from the list to view details</p>
            </div>
          )}

          {/* Trip Statistics */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Trip Statistics</h3>
            <div className="space-y-3">
              <StatItem label="Total Trips" value={trips.length} />
              <StatItem label="Total Distance" value="71.8 km" />
              <StatItem label="Total Fuel" value="5.7 L" />
              <StatItem label="Avg Score" value="85.8/100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-blue-100">
    <span className="text-blue-900/70 font-semibold text-sm">{label}</span>
    <span className="font-semibold text-blue-900">{value}</span>
  </div>
);

const MetricItem = ({ label, value, color }) => {
  const getColorClass = (color) => {
    switch (color) {
      case 'blue': return 'text-blue-600';
      case 'red': return 'text-red-600';
      case 'green': return 'text-green-600';
      case 'orange': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="text-center">
      <div className="text-xs text-blue-900/70 mb-1">{label}</div>
      <div className={`font-bold ${getColorClass(color)}`}>{value}</div>
    </div>
  );
};

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-blue-900/70">{label}</span>
    <span className="font-bold text-blue-900">{value}</span>
  </div>
);

export default TripHistory;