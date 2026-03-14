import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiDollarSign, FiPlus, FiSearch, FiDownload,
  FiFilter, FiEye, FiPrinter, FiCheckCircle,
  FiClock, FiXCircle
} from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import api from '../../services/api'
import toast from 'react-hot-toast'

const BillingDashboard = () => {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingPayments: 0,
    paidInvoices: 0,
    overdueInvoices: 0
  })

  useEffect(() => {
    fetchBillingData()
  }, [])

  const fetchBillingData = async () => {
    try {
      // Mock data for now - replace with actual API calls
      const mockInvoices = [
        { id: 'INV-001', patient: 'John Doe', date: '2024-01-15', amount: 250, status: 'paid', items: 3 },
        { id: 'INV-002', patient: 'Jane Smith', date: '2024-01-14', amount: 180, status: 'pending', items: 2 },
        { id: 'INV-003', patient: 'Mike Johnson', date: '2024-01-13', amount: 450, status: 'overdue', items: 5 },
        { id: 'INV-004', patient: 'Sarah Williams', date: '2024-01-12', amount: 120, status: 'paid', items: 1 },
        { id: 'INV-005', patient: 'Robert Brown', date: '2024-01-11', amount: 320, status: 'pending', items: 4 },
      ]
      
      setInvoices(mockInvoices)
      setStats({
        totalRevenue: 1320,
        pendingPayments: 500,
        paidInvoices: 2,
        overdueInvoices: 1
      })
    } catch (error) {
      toast.error('Failed to fetch billing data')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'paid': return <FiCheckCircle className="mr-1" size={14} />
      case 'pending': return <FiClock className="mr-1" size={14} />
      case 'overdue': return <FiXCircle className="mr-1" size={14} />
      default: return null
    }
  }

  const filteredInvoices = invoices.filter(inv =>
    inv.patient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.id?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statsCards = [
    { 
      title: 'Total Revenue', 
      value: `₹${stats.totalRevenue}`, 
      icon: FiDollarSign, 
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50'
    },
    { 
      title: 'Pending Payments', 
      value: `₹${stats.pendingPayments}`, 
      icon: FiClock, 
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50'
    },
    { 
      title: 'Paid Invoices', 
      value: stats.paidInvoices, 
      icon: FiCheckCircle, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    { 
      title: 'Overdue', 
      value: stats.overdueInvoices, 
      icon: FiXCircle, 
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50'
    },
  ]

  return (
    <div className="flex">
      <Sidebar />
      <div className={`flex-1 transition-all duration-300 ml-72`}>
        <Header />
        <main className="p-8 bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Billing & Invoices</h1>
              <p className="text-gray-600 mt-1">Manage payments and generate invoices</p>
            </div>
            <div className="flex space-x-3">
              <button className="btn-secondary flex items-center">
                <FiDownload className="mr-2" />
                Export
              </button>
              <Link to="/billing/create" className="btn-primary flex items-center">
                <FiPlus className="mr-2" />
                New Invoice
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`bg-gradient-to-r ${stat.color} p-4 rounded-xl shadow-lg`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by invoice ID or patient name..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="btn-secondary flex items-center justify-center md:w-auto">
                <FiFilter className="mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Invoice ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center">
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                        </div>
                      </td>
                    </tr>
                  ) : filteredInvoices.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                        No invoices found
                      </td>
                    </tr>
                  ) : (
                    filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-medium text-emerald-600">{invoice.id}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          {invoice.patient}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {new Date(invoice.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {invoice.items} items
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                          ₹{invoice.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                            {getStatusIcon(invoice.status)}
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                              <FiEye size={18} />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Print">
                              <FiPrinter size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
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