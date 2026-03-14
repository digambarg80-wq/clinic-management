import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiPlus, FiSearch, FiEye, FiCheckCircle, 
  FiXCircle, FiClock, FiDownload
} from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import api from '../../services/api'
import toast from 'react-hot-toast'

const InsuranceClaims = () => {
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchClaims()
  }, [])

  const fetchClaims = async () => {
    try {
      // Mock data - replace with API call
      const mockClaims = [
        { 
          id: 'CLM-001', 
          patient: 'Rahul Sharma', 
          insurance: 'Star Health', 
          policyNo: 'SH-12345',
          amount: 5000,
          date: '2024-01-15',
          status: 'approved',
          provider: 'ICICI Lombard'
        },
        { 
          id: 'CLM-002', 
          patient: 'Priya Patel', 
          insurance: 'HDFC Ergo', 
          policyNo: 'HE-67890',
          amount: 3500,
          date: '2024-01-14',
          status: 'pending',
          provider: 'HDFC Ergo'
        },
        { 
          id: 'CLM-003', 
          patient: 'Amit Kumar', 
          insurance: 'Bajaj Allianz', 
          policyNo: 'BA-54321',
          amount: 8000,
          date: '2024-01-13',
          status: 'rejected',
          provider: 'Bajaj Allianz'
        },
      ]
      setClaims(mockClaims)
    } catch (error) {
      toast.error('Failed to fetch claims')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return <FiCheckCircle className="mr-1" />
      case 'pending': return <FiClock className="mr-1" />
      case 'rejected': return <FiXCircle className="mr-1" />
      default: return null
    }
  }

  const filteredClaims = claims.filter(claim => 
    claim.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.insurance.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: claims.length,
    approved: claims.filter(c => c.status === 'approved').length,
    pending: claims.filter(c => c.status === 'pending').length,
    rejected: claims.filter(c => c.status === 'rejected').length,
    totalAmount: claims.reduce((sum, c) => sum + c.amount, 0)
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8 bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Insurance Claims</h1>
              <p className="text-gray-600 mt-1">Manage and track insurance claims</p>
            </div>
            <Link to="/billing/claims/new" className="btn-primary flex items-center">
              <FiPlus className="mr-2" />
              New Claim
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600">Total Claims</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-primary-600">₹{stats.totalAmount}</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search claims..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="input-field w-40"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Claims Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claim ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Insurance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="8" className="text-center py-8">Loading...</td></tr>
                ) : filteredClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-primary-600">{claim.id}</td>
                    <td className="px-6 py-4">{claim.patient}</td>
                    <td className="px-6 py-4">{claim.insurance}</td>
                    <td className="px-6 py-4">{claim.policyNo}</td>
                    <td className="px-6 py-4 font-semibold">₹{claim.amount}</td>
                    <td className="px-6 py-4">{new Date(claim.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                        {getStatusIcon(claim.status)}
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View">
                          <FiEye size={18} />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg" title="Download">
                          <FiDownload size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

export default InsuranceClaims