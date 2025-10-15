// src/components/BillingPanel.jsx
import React from "react";
import { motion } from "framer-motion";
import { DollarSign, Download, Receipt } from "lucide-react";

const BillingPanel = () => {
  const bills = [
    { id: 1, period: "Jan 2024", amount: "₹2,450", status: "Paid", dueDate: "2024-01-15" },
    { id: 2, period: "Dec 2023", amount: "₹2,300", status: "Paid", dueDate: "2023-12-15" },
    { id: 3, period: "Nov 2023", amount: "₹2,150", status: "Paid", dueDate: "2023-11-15" },
    { id: 4, period: "Oct 2023", amount: "₹1,980", status: "Paid", dueDate: "2023-10-15" },
  ];

  const usageBreakdown = [
    { category: "Base Rate", amount: "₹1,500", percentage: "61%" },
    { category: "Distance Charge", amount: "₹650", percentage: "27%" },
    { category: "Service Fee", amount: "₹200", percentage: "8%" },
    { category: "Taxes", amount: "₹100", percentage: "4%" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Current Bill Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Current Billing Cycle</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Receipt className="w-4 h-4" />
              Pay Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Current Balance</p>
            <p className="text-2xl font-bold text-gray-900">₹2,450</p>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-green-600 font-semibold">✓</span>
            </div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="text-2xl font-bold text-green-600">Paid</p>
          </div>

          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-yellow-600 font-semibold">i</span>
            </div>
            <p className="text-sm text-gray-600">Due Date</p>
            <p className="text-2xl font-bold text-gray-900">15th</p>
          </div>
        </div>

        {/* Usage Breakdown */}
        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Usage Breakdown</h4>
          <div className="space-y-3">
            {usageBreakdown.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.category}</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: item.percentage }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-16 text-right">
                    {item.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
          <p className="text-gray-600">Previous billing statements</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Billing Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bill.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {bill.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {bill.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default BillingPanel;
