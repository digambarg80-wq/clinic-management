import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiSearch, FiEye, FiPrinter, FiDownload } from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import api from '../../services/api'
import toast from 'react-hot-toast'

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchPrescriptions()
  }, [])

  const fetchPrescriptions = async () => {
    try {
      // Mock data
      const mockData = [
        { 
          id: 'RX-001', 
          patient: 'Rahul Sharma',
          doctor: 'Dr. Patel',
          date: '2024-01-15',
          medicines: 3,
          diagnosis: 'Viral Fever',
          followUp: '2024-01-22'
        },
        { 
          id: 'RX-002', 
          patient: 'Priya Patel',
          doctor: 'Dr. Shah',
          date: '2024-01-14',
          medicines: 2,
          diagnosis: 'Blood Pressure',
          followUp: '2024-02-14'
        },
      ]
      setPrescriptions(mockData)
    } catch (error) {
      toast.error('Failed to fetch prescriptions')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8 bg-gray-50 min-h-screen">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Prescriptions</h1>
              <p className="text-gray-600 mt-1">Manage patient prescriptions</p>
            </div>
            <Link to="/prescriptions/new" className="btn-primary flex items-center">
              <FiPlus className="mr-2" />
              New Prescription
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search prescriptions..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">RX ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Diagnosis</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicines</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((rx) => (
                  <tr key={rx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-primary-600">{rx.id}</td>
                    <td className="px-6 py-4">{rx.patient}</td>
                    <td className="px-6 py-4">{rx.doctor}</td>
                    <td className="px-6 py-4">{new Date(rx.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{rx.diagnosis}</td>
                    <td className="px-6 py-4">{rx.medicines} items</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <FiEye size={18} />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                          <FiPrinter size={18} />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
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

export default PrescriptionList