import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Download, Receipt, Calendar, TrendingUp, CreditCard } from 'lucide-react';

const BillingPanel = ({ vehicleData }) => {
  const [billingData, setBillingData] = useState({
    currentBill: {
      amount: 2450,
      dueDate: '2024-02-15',
      status: 'pending',
      period: 'January 2024'
    },
    paymentHistory: [
      { id: 1, date: '2024-01-15', amount: 2340, status: 'paid', invoice: 'INV-001' },
      { id: 2, date: '2023-12-15', amount: 2180, status: 'paid', invoice: 'INV-002' },
      { id: 3, date: '2023-11-15', amount: 2450, status: 'paid', invoice: 'INV-003' },
      { id: 4, date: '2023-10-15', amount: 1980, status: 'paid', invoice: 'INV-004' }
    ],
    usageBreakdown: [
      { category: 'Base Subscription', amount: 1500, percentage: '61%' },
      { category: 'Distance Charges', amount: 650, percentage: '27%' },
      { category: 'Service Fee', amount: 200, percentage: '8%' },
      { category: 'Taxes', amount: 100, percentage: '4%' }
    ]
  });

  const downloadInvoice = (invoiceId) => {
    alert(`Downloading invoice: ${invoiceId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Billing & Payments</h2>
          <p className="text-blue-900/70">Manage your subscription and payments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          <Download className="w-4 h-4" />
          Export Statements
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Bill & Usage */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Bill Summary */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-blue-900">Current Billing Cycle</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                billingData.currentBill.status === 'paid' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {billingData.currentBill.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-blue-900/70">Current Balance</p>
                <p className="text-2xl font-bold text-blue-900">₹{billingData.currentBill.amount}</p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-blue-900/70">Due Date</p>
                <p className="text-2xl font-bold text-blue-900">15th</p>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-blue-900/70">Billing Period</p>
                <p className="text-lg font-bold text-blue-900">{billingData.currentBill.period}</p>
              </div>
            </div>

            {/* Usage Breakdown */}
            <div className="mb-6">
              <h4 className="text-md font-semibold text-blue-900 mb-4">Usage Breakdown</h4>
              <div className="space-y-3">
                {billingData.usageBreakdown.map((item) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <span className="text-sm text-blue-900/70">{item.category}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: item.percentage }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-blue-900 w-16 text-right">
                        ₹{item.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" />
                Pay Now
              </button>
              <button className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download Invoice
              </button>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/20">
              <h3 className="font-bold text-blue-900">Payment History</h3>
              <p className="text-sm text-blue-900/70">Previous billing statements</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Invoice</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Actions</th>
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
                      <td className="px-4 py-3 font-bold text-blue-900">₹{payment.amount}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => downloadInvoice(payment.invoice)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                        >
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
                <div className="text-2xl font-extrabold text-blue-900">Premium</div>
                <div className="text-lg font-semibold text-blue-900/70">₹2,450/month</div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-blue-900">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Real-time Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-blue-900">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Advanced Analytics</span>
                </div>
                <div className="flex items-center gap-2 text-blue-900">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Geo-fencing</span>
                </div>
                <div className="flex items-center gap-2 text-blue-900">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                Upgrade Plan
              </button>
            </div>
          </div>

          {/* Billing Statistics */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Billing Statistics</h3>
            <div className="space-y-3">
              <StatItem label="Monthly Average" value="₹2,320" />
              <StatItem label="Total Paid" value="₹27,840" />
              <StatItem label="Savings This Year" value="₹1,240" />
              <StatItem label="Next Billing" value="Feb 15, 2024" />
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Payment Methods</h3>
            <div className="space-y-3">
              <PaymentMethod 
                type="credit_card" 
                last4="4242" 
                isDefault={true} 
              />
              <PaymentMethod 
                type="paypal" 
                email="user@example.com" 
                isDefault={false} 
              />
              <button className="w-full text-center p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition text-blue-700 font-semibold">
                + Add Payment Method
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-blue-900/70 text-sm">{label}</span>
    <span className="font-bold text-blue-900">{value}</span>
  </div>
);

const PaymentMethod = ({ type, last4, email, isDefault }) => (
  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
    <div className="flex items-center gap-3">
      <CreditCard className="w-5 h-5 text-blue-600" />
      <div>
        <div className="font-semibold text-blue-900 text-sm">
          {type === 'credit_card' ? `Credit Card •••• ${last4}` : `PayPal • ${email}`}
        </div>
        {isDefault && (
          <div className="text-xs text-green-600 font-semibold">Default</div>
        )}
      </div>
    </div>
    {isDefault && (
      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
        Active
      </span>
    )}
  </div>
);

export default BillingPanel;