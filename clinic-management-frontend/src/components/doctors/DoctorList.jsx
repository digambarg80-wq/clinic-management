import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiSearch, FiStar, FiClock } from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'

const DoctorList = () => {
  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Rajesh Patel',
      specialization: 'Cardiologist',
      qualification: 'MD, DM',
      experience: 15,
      patients: 1250,
      rating: 4.8,
      availability: 'Mon-Fri',
      image: 'RP',
      status: 'available'
    },
    {
      id: 2,
      name: 'Dr. Priya Shah',
      specialization: 'Dermatologist',
      qualification: 'MD',
      experience: 8,
      patients: 850,
      rating: 4.6,
      availability: 'Mon-Sat',
      image: 'PS',
      status: 'busy'
    },
    {
      id: 3,
      name: 'Dr. Amit Desai',
      specialization: 'Neurologist',
      qualification: 'MD, DM',
      experience: 12,
      patients: 980,
      rating: 4.9,
      availability: 'Tue-Sat',
      image: 'AD',
      status: 'available'
    },
    {
      id: 4,
      name: 'Dr. Neha Mehta',
      specialization: 'Pediatrician',
      qualification: 'MD',
      experience: 6,
      patients: 720,
      rating: 4.7,
      availability: 'Mon-Fri',
      image: 'NM',
      status: 'away'
    },
  ])

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-50 min-h-screen">
        <Header />
        <main className="p-8  pt-20 bg-gray-50 min-h-screen">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Doctors</h1>
              <p className="text-gray-600 mt-1">Manage doctor profiles and schedules</p>
            </div>
            <Link to="/doctors/add" className="btn-primary flex items-center">
              <FiPlus className="mr-2" />
              Add Doctor
            </Link>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors by name or specialization..."
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {doctor.image}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                      <p className="text-sm text-primary-600">{doctor.specialization}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    doctor.status === 'available' ? 'bg-green-100 text-green-800' :
                    doctor.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {doctor.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Qualification:</span> {doctor.qualification}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Experience:</span> {doctor.experience} years
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Patients:</span> {doctor.patients}+
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiClock className="mr-1" size={14} />
                    {doctor.availability}
                  </div>
                  <Link to={`/doctors/${doctor.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DoctorList