import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import api from '../../services/api'
import toast from 'react-hot-toast'

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments')
      setAppointments(response.data)
    } catch (error) {
      toast.error('Failed to fetch appointments')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await api.delete(`/appointments/${id}`)
        setAppointments(appointments.filter(apt => apt.id !== id))
        toast.success('Appointment deleted successfully')
      } catch (error) {
        toast.error('Failed to delete appointment')
      }
    }
  }

  const filteredAppointments = appointments.filter(apt =>
    apt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.doctorName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Appointments</h1>
            <Link to="/appointments/add" className="btn-primary flex items-center">
              <FiPlus className="mr-2" />
              New Appointment
            </Link>
          </div>

          <div className="mb-6">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr><td colSpan="6" className="px-6 py-4 text-center">Loading...</td></tr>
                  ) : filteredAppointments.length === 0 ? (
                    <tr><td colSpan="6" className="px-6 py-4 text-center">No appointments found</td></tr>
                  ) : (
                    filteredAppointments.map((apt) => (
                      <tr key={apt.id}>
                        <td className="px-6 py-4">{apt.patientName}</td>
                        <td className="px-6 py-4">{apt.doctorName}</td>
                        <td className="px-6 py-4">{new Date(apt.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{apt.time}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleDelete(apt.id)} className="text-red-600 hover:text-red-900">
                            <FiTrash2 />
                          </button>
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

export default AppointmentList