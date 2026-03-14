import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FiPlus, FiTrash2, FiSave, FiX } from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import api from '../../services/api'
import toast from 'react-hot-toast'

const CreateInvoice = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [items, setItems] = useState([{ description: '', quantity: 1, rate: 0, amount: 0 }])
  const [selectedPatient, setSelectedPatient] = useState(null)

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

  const calculateAmount = (quantity, rate) => quantity * rate

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items]
    updatedItems[index][field] = value
    
    if (field === 'quantity' || field === 'rate') {
      updatedItems[index].amount = calculateAmount(
        updatedItems[index].quantity || 0,
        updatedItems[index].rate || 0
      )
    }
    
    setItems(updatedItems)
  }

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, rate: 0, amount: 0 }])
  }

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const getTotalAmount = () => {
    return items.reduce((sum, item) => sum + (item.amount || 0), 0)
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const invoiceData = {
        ...data,
        items: items,
        total: getTotalAmount(),
        date: new Date().toISOString(),
        invoiceNumber: `INV-${Date.now()}`
      }
      await api.post('/invoices', invoiceData)
      toast.success('Invoice created successfully')
      navigate('/billing')
    } catch (error) {
      toast.error('Failed to create invoice')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8 bg-gray-50 min-h-screen">
          <div className="mb-6">
            <button onClick={() => navigate('/billing')} className="text-primary-600 hover:text-primary-800 mb-4">
              ← Back to Billing
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Create New Invoice</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Patient and Doctor Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient *</label>
                  <select
                    {...register('patientId', { required: 'Patient is required' })}
                    className="input-field"
                    onChange={(e) => {
                      const patient = patients.find(p => p.id === parseInt(e.target.value))
                      setSelectedPatient(patient)
                    }}
                  >
                    <option value="">Choose patient</option>
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - {p.phone}</option>
                    ))}
                  </select>
                  {errors.patientId && <p className="text-sm text-red-600 mt-1">{errors.patientId.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Referring Doctor</label>
                  <select {...register('doctorId')} className="input-field">
                    <option value="">Select doctor</option>
                    {doctors.map(d => (
                      <option key={d.id} value={d.id}>Dr. {d.name} - {d.specialization}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Details Preview */}
              {selectedPatient && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Patient Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><span className="text-gray-600">Name:</span> {selectedPatient.name}</p>
                    <p><span className="text-gray-600">Phone:</span> {selectedPatient.phone}</p>
                    <p><span className="text-gray-600">Email:</span> {selectedPatient.email}</p>
                    <p><span className="text-gray-600">Address:</span> {selectedPatient.address}</p>
                  </div>
                </div>
              )}

              {/* Invoice Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Invoice Items</h3>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          className="input-field"
                          required
                        />
                      </div>
                      <div className="w-24">
                        <input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                          className="input-field"
                          min="1"
                          required
                        />
                      </div>
                      <div className="w-32">
                        <input
                          type="number"
                          placeholder="Rate"
                          value={item.rate}
                          onChange={(e) => handleItemChange(index, 'rate', parseInt(e.target.value) || 0)}
                          className="input-field"
                          min="0"
                          required
                        />
                      </div>
                      <div className="w-32">
                        <input
                          type="number"
                          value={item.amount}
                          className="input-field bg-gray-100"
                          readOnly
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addItem}
                  className="mt-4 btn-secondary flex items-center"
                >
                  <FiPlus className="mr-2" />
                  Add Item
                </button>
              </div>

              {/* Total Amount */}
              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64">
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Subtotal:</span>
                      <span>₹{getTotalAmount()}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Tax (0%):</span>
                      <span>₹0</span>
                    </div>
                    <div className="flex justify-between py-2 text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary-600">₹{getTotalAmount()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select {...register('paymentMethod')} className="input-field">
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                    <option value="insurance">Insurance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                  <select {...register('status')} className="input-field">
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  {...register('notes')}
                  rows="3"
                  className="input-field"
                  placeholder="Any additional notes..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/billing')}
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
                  <FiSave className="mr-2" />
                  {loading ? 'Creating...' : 'Create Invoice'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CreateInvoice