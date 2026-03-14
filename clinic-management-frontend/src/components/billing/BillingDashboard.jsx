import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiDollarSign, FiPlus, FiDownload, FiFilter,
  FiCheckCircle, FiClock, FiXCircle, FiTrendingUp
} from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'

const BillingDashboard = () => {
  const [invoices] = useState([
    { id: 'INV-001', patient: 'Rahul Sharma', date: '2024-01-20', amount: 1250, status: 'paid', method: 'Cash' },
    { id: 'INV-002', patient: 'Priya Patel', date: '2024-01-20', amount: 800, status: 'pending', method: 'Card' },
    { id: 'INV-003', patient: 'Amit Kumar', date: '2024-01-19', amount: 2500, status: 'overdue', method: 'Insurance' },
    { id: 'INV-004', patient: 'Neha Singh', date: '2024-01-19', amount: 600, status: 'paid', method: 'UPI' },
    { id: 'INV-005', patient: 'Vikram Mehta', date: '2024-01-18', amount: 1800, status: 'paid', method: 'Cash' },
  ])

  const stats = [
    { label: 'Today\'s Collection', value: '₹12,450', change: '+15%', icon: FiDollarSign, color: 'green' },
    { label: 'Pending Payments', value: '₹8,200', change: '5 invoices', icon: FiClock, color: 'yellow' },
    { label: 'Monthly Revenue', value: '₹1,25,000', change: '+8%', icon: FiTrendingUp, color: 'blue' },
    { label: 'Overdue', value: '₹2,500', change: '1 invoice', icon: FiXCircle, color: 'red' },
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-50 min-h-screen">
        <Header />
        <main className="p-8  pt-20 bg-gray-50 min-h-screen">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Billing & Invoices</h1>
              <p className="text-gray-600 mt-1">Manage payments and generate invoices</p>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary flex items-center">
                <FiDownload className="mr-2" />
                Export
              </button>
              <Link to="/billing/create" className="btn-primary flex items-center">
                <FiPlus className="mr-2" />
                Create Invoice
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                    <p className={`text-xs mt-2 ${
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'yellow' ? 'text-yellow-600' :
                      stat.color === 'blue' ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <stat.icon className={`text-${stat.color}-600`} size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Invoices Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Recent Invoices</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm flex items-center">
                <FiFilter className="mr-1" size={14} />
                Filter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-primary-600">{invoice.id}</td>
                      <td className="px-6 py-4">{invoice.patient}</td>
                      <td className="px-6 py-4">{new Date(invoice.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 font-semibold">₹{invoice.amount}</td>
                      <td className="px-6 py-4">{invoice.method}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                        <button className="text-green-600 hover:text-green-800">Print</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default BillingDashboard