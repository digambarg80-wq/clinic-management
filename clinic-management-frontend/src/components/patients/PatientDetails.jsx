import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import api from '../../services/api'
import toast from 'react-hot-toast'

const PatientDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatient()
  }, [id])

  const fetchPatient = async () => {
    try {
      const response = await api.get(`/patients/${id}`)
      setPatient(response.data)
    } catch (error) {
      toast.error('Failed to fetch patient details')
      navigate('/patients')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <div className="p-8">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8">
          <div className="mb-6">
            <button
              onClick={() => navigate('/patients')}
              className="text-primary-600 hover:text-primary-800 mb-4"
            >
              ← Back to Patients
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">Patient Details</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                <div className="space-y-3">
                  <p><span className="font-medium text-gray-600">Name:</span> {patient?.name}</p>
                  <p><span className="font-medium text-gray-600">Email:</span> {patient?.email}</p>
                  <p><span className="font-medium text-gray-600">Phone:</span> {patient?.phone}</p>
                  <p><span className="font-medium text-gray-600">Date of Birth:</span> {new Date(patient?.dob).toLocaleDateString()}</p>
                  <p><span className="font-medium text-gray-600">Gender:</span> {patient?.gender}</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-4">Medical Information</h2>
                <div className="space-y-3">
                  <p><span className="font-medium text-gray-600">Address:</span> {patient?.address}</p>
                  <p><span className="font-medium text-gray-600">Medical History:</span> {patient?.medicalHistory || 'None'}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default PatientDetails