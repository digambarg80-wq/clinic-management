import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCalendar, FiClock, FiUser, FiActivity, FiSave, FiX } from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import toast from 'react-hot-toast'

const AddAppointment = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    doctorId: '',
    doctorName: '',
    date: '',
    time: '',
    type: 'consultation',
    notes: ''
  })

  // Mock data
  const patients = [
    { id: 1, name: 'Rahul Sharma' },
    { id: 2, name: 'Priya Patel' },
    { id: 3, name: 'Amit Kumar' },
    { id: 4, name: 'Neha Singh' },
  ]

  const doctors = [
    { id: 1, name: 'Dr. Rajesh Patel', specialization: 'Cardiologist' },
    { id: 2, name: 'Dr. Priya Shah', specialization: 'Dermatologist' },
    { id: 3, name: 'Dr. Amit Desai', specialization: 'Neurologist' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'patientId') {
      const patient = patients.find(p => p.id === parseInt(value))
      setFormData({ ...formData, patientId: value, patientName: patient?.name || '' })
    } else if (name === 'doctorId') {
      const doctor = doctors.find(d => d.id === parseInt(value))
      setFormData({ ...formData, doctorId: value, doctorName: doctor?.name || '' })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.patientId || !formData.doctorId || !formData.date || !formData.time) {
      toast.error('Please fill all required fields')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Appointment scheduled successfully!')
      setLoading(false)
      navigate('/appointments')
    }, 1500)
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-50 min-h-screen">
        <Header />
        <main className="p-8  pt-20 bg-gray-50 min-h-screen">
          <div className="mb-6">
            <button 
              onClick={() => navigate('/appointments')}
              className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
            >
              ← Back to Appointments
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Schedule New Appointment</h1>
            <p className="text-gray-600 mt-1">Book an appointment for a patient</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 max-w-3xl">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Selection */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Patient <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="patientId"
                      value={formData.patientId}
                      onChange={handleChange}
                      className="input-field pl-10"
                      required
                    >
                      <option value="">Choose a patient</option>
                      {patients.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Doctor Selection */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Doctor <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiActivity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="doctorId"
                      value={formData.doctorId}
                      onChange={handleChange}
                      className="input-field pl-10"
                      required
                    >
                      <option value="">Choose a doctor</option>
                      {doctors.map(d => (
                        <option key={d.id} value={d.id}>Dr. {d.name} - {d.specialization}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Appointment Type */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="consultation">Consultation</option>
                    <option value="followup">Follow-up</option>
                    <option value="emergency">Emergency</option>
                    <option value="checkup">Regular Checkup</option>
                  </select>
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes / Symptoms
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="input-field"
                    placeholder="Any specific symptoms or notes..."
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate('/appointments')}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                >
                  <FiX className="mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2" />
                      Schedule Appointment
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AddAppointment