import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import api from '../../services/api'
import toast from 'react-hot-toast'

const AddDoctor = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await api.post('/doctors', data)
      toast.success('Doctor added successfully')
      navigate('/doctors')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add doctor')
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
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add New Doctor</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" {...register('name', { required: 'Name is required' })} className="input-field" />
                {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
                <input type="text" {...register('specialization', { required: 'Specialization is required' })} className="input-field" />
                {errors.specialization && <p className="text-sm text-red-600">{errors.specialization.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" {...register('email', { required: 'Email is required' })} className="input-field" />
                {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input type="tel" {...register('phone', { required: 'Phone is required' })} className="input-field" />
                {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
              </div>

              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => navigate('/doctors')} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Adding...' : 'Add Doctor'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AddDoctor