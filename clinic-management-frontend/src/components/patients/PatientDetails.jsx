import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  FiUser, FiMail, FiPhone, FiCalendar, FiHeart,
  FiMapPin, FiActivity, FiFileText, FiDollarSign,
  FiEdit2, FiPrinter, FiDownload, FiMessageSquare
} from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import toast from 'react-hot-toast'

const PatientDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [patient, setPatient] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load patient data based on ID
    const mockPatients = {
      1: {
        id: 1,
        patientId: 'PT001',
        name: 'Rahul Sharma',
        email: 'rahul.sharma@email.com',
        phone: '+91 98765 43210',
        dob: '1985-06-15',
        age: 38,
        gender: 'Male',
        bloodGroup: 'O+',
        address: '123 MG Road, Pune, Maharashtra 411001',
        emergencyContact: '+91 98765 43211',
        medicalHistory: 'Hypertension (2019), Diabetes Type 2 (2021)',
        allergies: 'Penicillin, Dust',
        status: 'active',
        lastVisit: '2024-01-15',
        registeredDate: '2023-06-10',
        appointments: [
          { date: '2024-01-15', doctor: 'Dr. Patel', type: 'Consultation', status: 'completed' },
          { date: '2024-01-10', doctor: 'Dr. Shah', type: 'Follow-up', status: 'completed' },
          { date: '2024-01-05', doctor: 'Dr. Patel', type: 'Checkup', status: 'completed' },
        ],
        prescriptions: [
          { date: '2024-01-15', doctor: 'Dr. Patel', medicines: 3, diagnosis: 'Viral Fever' },
          { date: '2024-01-05', doctor: 'Dr. Patel', medicines: 2, diagnosis: 'BP Check' },
        ],
        invoices: [
          { date: '2024-01-15', amount: 1250, status: 'paid' },
          { date: '2024-01-05', amount: 800, status: 'paid' },
        ]
      }
    }

    setPatient(mockPatients[1])
    setLoading(false)
  }, [id])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiUser },
    { id: 'appointments', label: 'Appointments', icon: FiCalendar },
    { id: 'prescriptions', label: 'Prescriptions', icon: FiFileText },
    { id: 'billing', label: 'Billing', icon: FiDollarSign },
    { id: 'reports', label: 'Reports', icon: FiActivity },
  ]

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-50 min-h-screen">
        <Header />
        <main className="p-8  pt-20 bg-gray-50 min-h-screen">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/patients')}
            className="text-primary-600 hover:text-primary-800 mb-4 flex items-center"
          >
            ← Back to Patients
          </button>

          {/* Patient Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{patient.name}</h1>
                  <p className="text-primary-600 font-mono mt-1">{patient.patientId}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.status}
                    </span>
                    <span className="text-sm text-gray-600">Registered: {new Date(patient.registeredDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <button className="btn-secondary flex items-center">
                  <FiEdit2 className="mr-2" />
                  Edit
                </button>
                <button className="btn-secondary flex items-center">
                  <FiPrinter className="mr-2" />
                  Print
                </button>
                <button className="btn-secondary flex items-center">
                  <FiMessageSquare className="mr-2" />
                  Message
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <tab.icon className="mr-2" size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Personal Information */}
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <FiMail className="text-gray-400 mt-1" size={16} />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{patient.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FiPhone className="text-gray-400 mt-1" size={16} />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{patient.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FiCalendar className="text-gray-400 mt-1" size={16} />
                      <div>
                        <p className="text-sm text-gray-600">Date of Birth</p>
                        <p className="font-medium">{new Date(patient.dob).toLocaleDateString()} ({patient.age} years)</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FiHeart className="text-gray-400 mt-1" size={16} />
                      <div>
                        <p className="text-sm text-gray-600">Blood Group</p>
                        <p className="font-medium">{patient.bloodGroup}</p>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-start space-x-3">
                      <FiMapPin className="text-gray-400 mt-1" size={16} />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium">{patient.address}</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Medical Information</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">Medical History</p>
                      <p className="text-gray-600">{patient.medicalHistory}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">Allergies</p>
                      <p className="text-gray-600">{patient.allergies}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">Emergency Contact</p>
                      <p className="text-gray-600">{patient.emergencyContact}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-600">Total Appointments</p>
                      <p className="text-2xl font-bold text-blue-800">24</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-600">Last Visit</p>
                      <p className="text-2xl font-bold text-green-800">{new Date(patient.lastVisit).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-purple-600">Total Spent</p>
                      <p className="text-2xl font-bold text-purple-800">₹8,450</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment History</h3>
                <div className="space-y-3">
                  {patient.appointments.map((apt, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{apt.date}</p>
                        <p className="text-sm text-gray-600">{apt.doctor} • {apt.type}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'prescriptions' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Prescriptions</h3>
                <div className="space-y-3">
                  {patient.prescriptions.map((pres, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <p className="font-medium">{pres.date}</p>
                        <p className="text-sm text-gray-600">{pres.doctor}</p>
                      </div>
                      <p className="text-sm text-gray-700">Diagnosis: {pres.diagnosis}</p>
                      <p className="text-sm text-gray-600 mt-1">{pres.medicines} medicines prescribed</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Billing History</h3>
                <div className="space-y-3">
                  {patient.invoices.map((inv, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{inv.date}</p>
                        <p className="text-sm text-gray-600">Invoice #{inv.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{inv.amount}</p>
                        <span className="text-xs text-green-600">{inv.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default PatientDetails