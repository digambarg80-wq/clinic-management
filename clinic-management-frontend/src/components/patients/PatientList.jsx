import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye,
  FiMail, FiPhone, FiCalendar, FiUser, FiDownload
} from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import toast from 'react-hot-toast'

const PatientList = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedPatients, setSelectedPatients] = useState([])

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = () => {
    // Mock data that works immediately
    const mockPatients = [
      { 
        id: 1, 
        patientId: 'PT001',
        name: 'Rahul Sharma', 
        email: 'rahul.sharma@email.com', 
        phone: '+91 98765 43210',
        dob: '1985-06-15',
        age: 38,
        gender: 'Male',
        bloodGroup: 'O+',
        lastVisit: '2024-01-15',
        status: 'active',
        avatar: 'RS'
      },
      { 
        id: 2, 
        patientId: 'PT002',
        name: 'Priya Patel', 
        email: 'priya.patel@email.com', 
        phone: '+91 98765 43211',
        dob: '1990-03-22',
        age: 33,
        gender: 'Female',
        bloodGroup: 'A+',
        lastVisit: '2024-01-14',
        status: 'active',
        avatar: 'PP'
      },
      { 
        id: 3, 
        patientId: 'PT003',
        name: 'Amit Kumar', 
        email: 'amit.kumar@email.com', 
        phone: '+91 98765 43212',
        dob: '1978-11-08',
        age: 45,
        gender: 'Male',
        bloodGroup: 'B+',
        lastVisit: '2024-01-13',
        status: 'inactive',
        avatar: 'AK'
      },
      { 
        id: 4, 
        patientId: 'PT004',
        name: 'Neha Singh', 
        email: 'neha.singh@email.com', 
        phone: '+91 98765 43213',
        dob: '1995-09-30',
        age: 28,
        gender: 'Female',
        bloodGroup: 'AB+',
        lastVisit: '2024-01-12',
        status: 'active',
        avatar: 'NS'
      },
      { 
        id: 5, 
        patientId: 'PT005',
        name: 'Vikram Mehta', 
        email: 'vikram.mehta@email.com', 
        phone: '+91 98765 43214',
        dob: '1982-12-05',
        age: 41,
        gender: 'Male',
        bloodGroup: 'O-',
        lastVisit: '2024-01-11',
        status: 'active',
        avatar: 'VM'
      },
      { 
        id: 6, 
        patientId: 'PT006',
        name: 'Anjali Desai', 
        email: 'anjali.desai@email.com', 
        phone: '+91 98765 43215',
        dob: '1988-07-19',
        age: 35,
        gender: 'Female',
        bloodGroup: 'A-',
        lastVisit: '2024-01-10',
        status: 'active',
        avatar: 'AD'
      }
    ]
    setPatients(mockPatients)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== id))
      toast.success('Patient deleted successfully')
    }
  }

  const handleSelectAll = () => {
    if (selectedPatients.length === filteredPatients.length) {
      setSelectedPatients([])
    } else {
      setSelectedPatients(filteredPatients.map(p => p.id))
    }
  }

  const handleSelectPatient = (id) => {
    if (selectedPatients.includes(id)) {
      setSelectedPatients(selectedPatients.filter(pid => pid !== id))
    } else {
      setSelectedPatients([...selectedPatients, id])
    }
  }

  const handleExport = () => {
    toast.success('Patient list exported successfully')
  }

  const filteredPatients = patients.filter(patient =>
    (filter === 'all' ? true : patient.status === filter) &&
    (patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     patient.phone.includes(searchTerm) ||
     patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const stats = {
    total: patients.length,
    active: patients.filter(p => p.status === 'active').length,
    inactive: patients.filter(p => p.status === 'inactive').length,
    newThisMonth: 12
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-50 min-h-screen">
        <Header />
        <main className="p-8  pt-20 bg-gray-50 min-h-screen">
          {/* Header with Actions */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
              <p className="text-gray-600 mt-1">Manage and view all patient records</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleExport}
                className="btn-secondary flex items-center"
              >
                <FiDownload className="mr-2" />
                Export
              </button>
              <Link to="/patients/add" className="btn-primary flex items-center">
                <FiPlus className="mr-2" />
                Add Patient
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">Active Patients</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-blue-600">{stats.newThisMonth}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-400">{stats.inactive}</p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone or patient ID..."
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
                <option value="all">All Patients</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedPatients.length > 0 && (
            <div className="bg-primary-50 rounded-xl p-4 mb-4 flex items-center justify-between">
              <span className="text-sm text-primary-700">
                {selectedPatients.length} patient(s) selected
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-white text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                  Send Email
                </button>
                <button className="px-3 py-1 bg-white text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                  Export Selected
                </button>
              </div>
            </div>
          )}

          {/* Patients Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Patient ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Age/Gender</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Blood Group</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Last Visit</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedPatients.includes(patient.id)}
                          onChange={() => handleSelectPatient(patient.id)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-primary-600">
                        {patient.patientId}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {patient.avatar}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">{patient.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <FiMail size={14} className="mr-2" />
                            {patient.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <FiPhone size={14} className="mr-2" />
                            {patient.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">{patient.age} years</p>
                          <p className="text-gray-600">{patient.gender}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">{patient.bloodGroup}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(patient.lastVisit).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          patient.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Link 
                            to={`/patients/${patient.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <FiEye size={18} />
                          </Link>
                          <Link 
                            to={`/patients/edit/${patient.id}`}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 size={18} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(patient.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing 1 to {filteredPatients.length} of {patients.length} patients
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default PatientList