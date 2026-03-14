import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSave, FiX, FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiHeart } from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import toast from 'react-hot-toast'

const AddPatient = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    patientId: 'PT' + Math.floor(100 + Math.random() * 900),
    name: '',
    email: '',
    phone: '',
    dob: '',
    age: '',
    gender: '',
    bloodGroup: '',
    address: '',
    emergencyContact: '',
    medicalHistory: '',
    allergies: '',
    status: 'active'
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits'
    }
    if (!formData.dob) newErrors.dob = 'Date of birth is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Auto calculate age from DOB
    if (name === 'dob') {
      const age = Math.floor((new Date() - new Date(value)) / (365.25 * 24 * 60 * 60 * 1000))
      setFormData({ ...formData, [name]: value, age: age > 0 ? age : '' })
    } else {
      setFormData({ ...formData, [name]: value })
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error('Please fill all required fields')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Patient added successfully!')
      setLoading(false)
      navigate('/patients')
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
              onClick={() => navigate('/patients')}
              className="text-primary-600 hover:text-primary-800 mb-4 flex items-center"
            >
              ← Back to Patients
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Add New Patient</h1>
            <p className="text-gray-600 mt-1">Enter patient details to create a new record</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <form onSubmit={handleSubmit}>
              {/* Patient ID */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient ID
                </label>
                <input
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  className="input-field bg-gray-100 font-mono"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated patient ID</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Enter full name"
                    />
                  </div>
                  {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="patient@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="9876543210"
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.dob ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.dob && <p className="text-sm text-red-600 mt-1">{errors.dob}</p>}
                </div>

                {/* Age (Auto-calculated) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    className="input-field bg-gray-100"
                    readOnly
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`input-field ${errors.gender ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="text-sm text-red-600 mt-1">{errors.gender}</p>}
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group
                  </label>
                  <div className="relative">
                    <FiHeart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="input-field pl-10"
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Emergency phone number"
                  />
                </div>

                {/* Address - Full width */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="2"
                      className="input-field pl-10"
                      placeholder="Full address"
                    />
                  </div>
                </div>

                {/* Medical History */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical History
                  </label>
                  <textarea
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleChange}
                    rows="3"
                    className="input-field"
                    placeholder="Previous medical conditions, surgeries, etc."
                  />
                </div>

                {/* Allergies */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allergies
                  </label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    rows="2"
                    className="input-field"
                    placeholder="Any known allergies"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate('/patients')}
                  className="btn-secondary flex items-center"
                >
                  <FiX className="mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2" />
                      Save Patient
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

export default AddPatient