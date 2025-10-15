import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calendar, Download, Receipt, Car, Clock, MapPin, Users } from 'lucide-react';

const UsageBasedBilling = ({ users }) => {
  const [billingData, setBillingData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Simulate billing data
    const data = users.map(user => {
      const baseUsage = 100 + Math.random() * 900;
      const trips = Math.floor(5 + Math.random() * 20);
      const distance = (baseUsage * 0.8 + Math.random() * baseUsage * 0.4).toFixed(2);
      const tollCharges = (trips * 2.5 + Math.random() * trips * 1.5).toFixed(2);
      const rentalFee = (baseUsage * 0.15).toFixed(2);
      const total = (parseFloat(rentalFee) + parseFloat(tollCharges)).toFixed(2);
      
      return {
        id: user.id,
        userName: user.name,
        email: user.email,
        vehicle: `KA01${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        period: 'Jan 2024',
        usage: {
          hours: parseFloat(baseUsage.toFixed(2)),
          distance: parseFloat(distance),
          trips,
          avgSpeed: (40 + Math.random() * 60).toFixed(1)
        },
        charges: {
          rental: parseFloat(rentalFee),
          tolls: parseFloat(tollCharges),
          taxes: parseFloat(rentalFee) * 0.18,
          total: parseFloat(total)
        },
        status: Math.random() > 0.2 ? 'paid' : 'pending',
        dueDate: new Date(Date.now() + (5 + Math.random() * 25) * 24 * 60 * 60 * 1000).toISOString(),
        invoiceId: `INV-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
      };
    });
    setBillingData(data);

    // Sample invoices
    setInvoices([
      {
        id: 1,
        invoiceId: 'INV-7X9B2C8D',
        userName: 'John Doe',
        amount: 245.50,
        status: 'paid',
        dueDate: '2024-01-15',
        period: 'Dec 2023'
      },
      {
        id: 2,
        invoiceId: 'INV-5A3B9C1D',
        userName: 'Acme Corp',
        amount: 1890.75,
        status: 'pending',
        dueDate: '2024-01-20',
        period: 'Dec 2023'
      }
    ]);
  }, [users]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const calculateTotals = () => {
    return billingData.reduce((acc, curr) => ({
      revenue: acc.revenue + curr.charges.total,
      rental: acc.rental + curr.charges.rental,
      tolls: acc.tolls + curr.charges.tolls,
      taxes: acc.taxes + curr.charges.taxes
    }), { revenue: 0, rental: 0, tolls: 0, taxes: 0 });
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Usage-based Billing</h2>
          <p className="text-blue-900/70">Automated rental invoicing & tolls</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Summary Cards */}
        <SummaryCard
          label="Total Revenue"
          value={`₹${totals.revenue.toFixed(2)}`}
          change="+12.5%"
          icon={<DollarSign className="w-6 h-6" />}
          color="green"
        />
        <SummaryCard
          label="Rental Income"
          value={`₹${totals.rental.toFixed(2)}`}
          change="+8.3%"
          icon={<Car className="w-6 h-6" />}
          color="blue"
        />
        <SummaryCard
          label="Toll Charges"
          value={`₹${totals.tolls.toFixed(2)}`}
          change="+15.2%"
          icon={<MapPin className="w-6 h-6" />}
          color="purple"
        />
        <SummaryCard
          label="Active Users"
          value={billingData.length.toString()}
          change="+5.7%"
          icon={<Users className="w-6 h-6" />}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Billing List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/20 flex items-center justify-between">
              <h3 className="font-bold text-blue-900">Current Billing Cycle</h3>
              <span className="text-sm text-blue-900/70">{billingData.length} users</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">User</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Usage</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Charges</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {billingData.map((bill, index) => (
                    <motion.tr
                      key={bill.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-white/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-semibold text-blue-900">{bill.userName}</div>
                          <div className="text-xs text-blue-900/70">{bill.vehicle}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          <div>{bill.usage.hours}h • {bill.usage.distance}km</div>
                          <div className="text-xs text-blue-900/70">{bill.usage.trips} trips</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-semibold text-blue-900">₹{bill.charges.total}</div>
                        <div className="text-xs text-blue-900/70">
                          Rental: ₹{bill.charges.rental} • Tolls: ₹{bill.charges.tolls}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(bill.status)}`}>
                          {bill.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-800 text-sm font-semibold">
                            Invoice
                          </button>
                        </div>
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
          {/* Recent Invoices */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Recent Invoices</h3>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="p-3 bg-white rounded-lg border border-white/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-blue-900">{invoice.invoiceId}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </div>
                  <div className="text-sm text-blue-900/70 mb-2">{invoice.userName}</div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-blue-900">₹{invoice.amount}</span>
                    <span className="text-blue-900/70">{invoice.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Overview */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Billing Overview</h3>
            <div className="space-y-3">
              <OverviewItem label="Total Revenue" value={`₹${totals.revenue.toFixed(2)}`} />
              <OverviewItem label="Rental Income" value={`₹${totals.rental.toFixed(2)}`} />
              <OverviewItem label="Toll Charges" value={`₹${totals.tolls.toFixed(2)}`} />
              <OverviewItem label="Taxes Collected" value={`₹${totals.taxes.toFixed(2)}`} />
              <OverviewItem label="Pending Payments" value={`₹${billingData.filter(b => b.status === 'pending').reduce((sum, b) => sum + b.charges.total, 0).toFixed(2)}`} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition">
                <Receipt className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Generate Invoices</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition">
                <Download className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-blue-900">Export Reports</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-blue-900">Schedule Billing</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, change, icon, color }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'green': return 'bg-green-100 text-green-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-900/70">{label}</p>
          <p className="text-2xl font-extrabold text-blue-900">{value}</p>
          <p className={`text-xs font-semibold ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change} from last period
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(color)}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

const OverviewItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-blue-900/70 text-sm">{label}</span>
    <span className="font-semibold text-blue-900">{value}</span>
  </div>
);

export default UsageBasedBilling;