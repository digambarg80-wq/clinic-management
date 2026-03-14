import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import api from '../../services/api'
import toast from 'react-hot-toast'

const DoctorList = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const response = await api.get('/doctors')
      setDoctors(response.data)
    } catch (error) {
      toast.error('Failed to fetch doctors')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await api.delete(`/doctors/${id}`)
        setDoctors(doctors.filter(d => d.id !== id))
        toast.success('Doctor deleted successfully')
      } catch (error) {
        toast.error('Failed to delete doctor')
      }
    }
  }

  const filteredDoctors = doctors.filter(d =>
    d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Doctors</h1>
            <Link to="/doctors/add" className="btn-primary flex items-center">
              <FiPlus className="mr-2" />
              Add Doctor
            </Link>
          </div>

          <div className="mb-6">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors..."
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr><td colSpan="5" className="px-6 py-4 text-center">Loading...</td></tr>
                  ) : filteredDoctors.length === 0 ? (
                    <tr><td colSpan="5" className="px-6 py-4 text-center">No doctors found</td></tr>
                  ) : (
                    filteredDoctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td className="px-6 py-4">{doctor.name}</td>
                        <td className="px-6 py-4">{doctor.specialization}</td>
                        <td className="px-6 py-4">{doctor.email}</td>
                        <td className="px-6 py-4">{doctor.phone}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleDelete(doctor.id)} className="text-red-600 hover:text-red-900">
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

export default DoctorList