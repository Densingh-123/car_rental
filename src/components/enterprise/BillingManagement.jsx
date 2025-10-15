import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Download, FileText, Calendar, TrendingUp, CreditCard } from 'lucide-react';

const BillingManagement = ({ vehicles, drivers }) => {
  const [billingData, setBillingData] = useState({
    currentBill: {
      amount: 24500,
      dueDate: '2024-02-15',
      status: 'pending',
      usage: {
        vehicles: vehicles.length,
        distance: 12450,
        trips: 345
      }
    },
    paymentHistory: [
      { id: 1, date: '2024-01-15', amount: 23400, status: 'paid', invoice: 'INV-001' },
      { id: 2, date: '2023-12-15', amount: 21800, status: 'paid', invoice: 'INV-002' },
      { id: 3, date: '2023-11-15', amount: 24500, status: 'paid', invoice: 'INV-003' }
    ],
    subscription: {
      plan: 'Enterprise Pro',
      price: '₹24,500/month',
      vehicles: 'Up to 50 vehicles',
      features: ['Real-time Tracking', 'Advanced Analytics', 'Priority Support']
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Billing & Reports</h2>
          <p className="text-blue-900/70">Manage billing, invoices, and subscriptions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          <Download className="w-4 h-4" />
          Export Statements
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Bill */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-blue-900 mb-6">Current Billing Cycle</h3>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-extrabold text-blue-900">₹{billingData.currentBill.amount.toLocaleString()}</div>
                <div className="text-sm text-blue-900/70">Total Amount</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-900">{billingData.currentBill.usage.vehicles}</div>
                <div className="text-sm text-blue-900/70">Active Vehicles</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-900">{billingData.currentBill.usage.trips}</div>
                <div className="text-sm text-blue-900/70">Trips</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <div className="font-semibold text-blue-900">Due Date</div>
                <div className="text-blue-900/70">{billingData.currentBill.dueDate}</div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                billingData.currentBill.status === 'paid' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {billingData.currentBill.status}
              </span>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                Pay Now
              </button>
              <button className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold">
                Download Invoice
              </button>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/20">
              <h3 className="font-bold text-blue-900">Payment History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Invoice</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {billingData.paymentHistory.map((payment, index) => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-white/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-blue-900">{payment.date}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-blue-900">{payment.invoice}</td>
                      <td className="px-4 py-3 font-bold text-blue-900">₹{payment.amount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                          Download
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Subscription Plan */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Subscription Plan</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-extrabold text-blue-900">{billingData.subscription.plan}</div>
                <div className="text-lg font-semibold text-blue-900/70">{billingData.subscription.price}</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-blue-900">
                  <CreditCard className="w-4 h-4" />
                  <span>{billingData.subscription.vehicles}</span>
                </div>
                {billingData.subscription.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-blue-900/70">
                    <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                Upgrade Plan
              </button>
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Usage Statistics</h3>
            <div className="space-y-3">
              <UsageItem label="Vehicle Usage" value="78%" change="+5%" />
              <UsageItem label="Distance Covered" value="12,450 km" change="+12%" />
              <UsageItem label="Fuel Consumption" value="8,450 L" change="-3%" />
              <UsageItem label="Active Drivers" value={drivers.filter(d => d.status === 'active').length} change="+2" />
            </div>
          </div>

          {/* Quick Reports */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Quick Reports</h3>
            <div className="space-y-3">
              <ReportButton icon={<FileText className="w-4 h-4" />} label="Monthly Performance" />
              <ReportButton icon={<TrendingUp className="w-4 h-4" />} label="Revenue Report" />
              <ReportButton icon={<Download className="w-4 h-4" />} label="Export All Data" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UsageItem = ({ label, value, change }) => (
  <div className="flex justify-between items-center">
    <span className="text-blue-900/70 text-sm">{label}</span>
    <div className="text-right">
      <div className="font-semibold text-blue-900">{value}</div>
      <div className={`text-xs ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </div>
    </div>
  </div>
);

const ReportButton = ({ icon, label }) => (
  <button className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition">
    {React.cloneElement(icon, { className: 'w-4 h-4 text-blue-600' })}
    <span className="font-semibold text-blue-900 text-sm">{label}</span>
  </button>
);

export default BillingManagement;