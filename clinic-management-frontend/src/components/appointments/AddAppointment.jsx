import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import api from '../../services/api'
import toast from 'react-hot-toast'

const AddAppointment = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [patientsRes, doctorsRes] = await Promise.all([
        api.get('/patients'),
        api.get('/doctors')
      ])
      setPatients(patientsRes.data)
      setDoctors(doctorsRes.data)
    } catch (error) {
      toast.error('Failed to load data')
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await api.post('/appointments', data)
      toast.success('Appointment scheduled successfully')
      navigate('/appointments')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to schedule appointment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Schedule Appointment</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
                <select {...register('patientId', { required: 'Patient is required' })} className="input-field">
                  <option value="">Select Patient</option>
                  {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                {errors.patientId && <p className="text-sm text-red-600">{errors.patientId.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor *</label>
                <select {...register('doctorId', { required: 'Doctor is required' })} className="input-field">
                  <option value="">Select Doctor</option>
                  {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
                {errors.doctorId && <p className="text-sm text-red-600">{errors.doctorId.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input type="date" {...register('date', { required: 'Date is required' })} className="input-field" />
                {errors.date && <p className="text-sm text-red-600">{errors.date.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                <input type="time" {...register('time', { required: 'Time is required' })} className="input-field" />
                {errors.time && <p className="text-sm text-red-600">{errors.time.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea {...register('reason')} rows="3" className="input-field" />
              </div>

              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => navigate('/appointments')} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Scheduling...' : 'Schedule Appointment'}
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