import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiTrash2, FiSave, FiX, FiUser, FiDollarSign } from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import toast from 'react-hot-toast'

const CreateInvoice = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([{ description: '', quantity: 1, rate: 0, amount: 0 }])
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    doctorId: '',
    paymentMethod: 'cash',
    status: 'pending',
    notes: ''
  })

  // Mock data
  const patients = [
    { id: 1, name: 'Rahul Sharma' },
    { id: 2, name: 'Priya Patel' },
    { id: 3, name: 'Amit Kumar' },
  ]

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

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'patientId') {
      const patient = patients.find(p => p.id === parseInt(value))
      setFormData({ ...formData, patientId: value, patientName: patient?.name || '' })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.patientId) {
      toast.error('Please select a patient')
      return
    }

    if (items.some(item => !item.description || item.rate === 0)) {
      toast.error('Please fill all item details')
      return
    }

    setLoading(true)
    
    setTimeout(() => {
      toast.success('Invoice created successfully!')
      setLoading(false)
      navigate('/billing')
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
              onClick={() => navigate('/billing')}
              className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
            >
              ← Back to Billing
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Create New Invoice</h1>
            <p className="text-gray-600 mt-1">Generate invoice for patient</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <form onSubmit={handleSubmit}>
              {/* Patient Selection */}
              <div className="mb-6">
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

              {/* Invoice Items */}
              <div className="mb-6">
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
                  className="mt-4 text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium"
                >
                  <FiPlus className="mr-1" />
                  Add Item
                </button>
              </div>

              {/* Total Amount */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-end">
                  <div className="w-64">
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Subtotal:</span>
                      <span>₹{getTotalAmount()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-t border-gray-200 text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-blue-600">₹{getTotalAmount()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="input-field pl-10"
                    >
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                      <option value="upi">UPI</option>
                      <option value="insurance">Insurance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="input-field"
                  placeholder="Any additional notes..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate('/billing')}
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
                      Creating...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2" />
                      Create Invoice
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

export default CreateInvoice