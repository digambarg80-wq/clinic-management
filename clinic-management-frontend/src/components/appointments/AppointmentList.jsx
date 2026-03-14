import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiPlus, FiSearch, FiCalendar, FiClock,
  FiUser, FiCheckCircle, FiXCircle, FiClock as FiClockIcon
} from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([])
  const [filter, setFilter] = useState('all')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    // Mock data
    setAppointments([
      {
        id: 1,
        patientName: 'Rahul Sharma',
        doctorName: 'Dr. Patel',
        date: '2024-01-20',
        time: '09:30 AM',
        type: 'Consultation',
        status: 'confirmed',
        avatar: 'RS'
      },
      {
        id: 2,
        patientName: 'Priya Patel',
        doctorName: 'Dr. Shah',
        date: '2024-01-20',
        time: '10:15 AM',
        type: 'Follow-up',
        status: 'waiting',
        avatar: 'PP'
      },
      {
        id: 3,
        patientName: 'Amit Kumar',
        doctorName: 'Dr. Desai',
        date: '2024-01-20',
        time: '11:00 AM',
        type: 'Checkup',
        status: 'confirmed',
        avatar: 'AK'
      },
      {
        id: 4,
        patientName: 'Neha Singh',
        doctorName: 'Dr. Mehta',
        date: '2024-01-20',
        time: '11:45 AM',
        type: 'Emergency',
        status: 'critical',
        avatar: 'NS'
      },
      {
        id: 5,
        patientName: 'Vikram Mehta',
        doctorName: 'Dr. Kumar',
        date: '2024-01-20',
        time: '12:30 PM',
        type: 'Consultation',
        status: 'scheduled',
        avatar: 'VM'
      }
    ])
  }, [])

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'waiting': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <FiCheckCircle size={14} />
      case 'waiting': return <FiClockIcon size={14} />
      case 'critical': return <FiXCircle size={14} />
      default: return null
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
              <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
              <p className="text-gray-600 mt-1">Schedule and manage patient appointments</p>
            </div>
            <Link to="/appointments/add" className="btn-primary flex items-center">
              <FiPlus className="mr-2" />
              New Appointment
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  className="input-field pl-10"
                />
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field w-40"
              />
              <select 
                className="input-field w-40"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="waiting">Waiting</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Timeline View */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-800">Today's Schedule - {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {appointments.map((apt) => (
                <div key={apt.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-16 text-center">
                      <span className="text-sm font-medium text-gray-600">{apt.time}</span>
                    </div>
                    <div className="w-1 h-12 bg-gray-300 rounded-full mx-4"></div>
                    <div className="flex-1 flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-semibold">
                        {apt.avatar}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800">{apt.patientName}</h4>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                            {getStatusIcon(apt.status)}
                            <span className="ml-1">{apt.status}</span>
                          </span>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <FiUser size={14} className="mr-1" />
                          {apt.doctorName}
                          <span className="mx-2">•</span>
                          <FiCalendar size={14} className="mr-1" />
                          {apt.type}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AppointmentList