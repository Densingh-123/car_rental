import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Award, Download } from 'lucide-react';

const TripHistory = ({ driverId }) => {
  const [trips, setTrips] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate trip data
    const tripData = [
      {
        id: 1,
        date: '2024-01-15',
        startLocation: 'Bangalore Office',
        endLocation: 'Chennai Client Site',
        distance: '350 km',
        duration: '6h 30m',
        score: 92,
        purpose: 'Client Meeting',
        fuelUsed: '28.5L',
        revenue: '₹4,200'
      },
      {
        id: 2,
        date: '2024-01-14',
        startLocation: 'Bangalore Office',
        endLocation: 'Mysore Delivery',
        distance: '150 km',
        duration: '3h 15m',
        score: 85,
        purpose: 'Delivery',
        fuelUsed: '12.3L',
        revenue: '₹1,800'
      },
      {
        id: 3,
        date: '2024-01-13',
        startLocation: 'Bangalore',
        endLocation: 'Hyderabad Warehouse',
        distance: '570 km',
        duration: '9h 45m',
        score: 88,
        purpose: 'Stock Transfer',
        fuelUsed: '45.2L',
        revenue: '₹6,500'
      }
    ];
    setTrips(tripData);
  }, [driverId]);

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
          <p className="text-blue-900/70">Your completed trips and performance</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Trips</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase">Route</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase">Distance</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase">Duration</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase">Purpose</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase">Score</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-blue-900 uppercase">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {trips.map((trip, index) => (
                <motion.tr
                  key={trip.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-white/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-900">{trip.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-blue-900">{trip.startLocation}</div>
                      <div className="text-sm text-blue-900/70 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        to {trip.endLocation}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-blue-900">{trip.distance}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-900">{trip.duration}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      {trip.purpose}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getScoreColor(trip.score)}`}>
                      <Award className="w-3 h-3 inline mr-1" />
                      {trip.score}/100
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600">{trip.revenue}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TripHistory;