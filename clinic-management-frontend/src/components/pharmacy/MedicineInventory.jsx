import React, { useState, useEffect } from 'react'
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiAlertCircle } from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'
import toast from 'react-hot-toast'

const MedicineInventory = () => {
  const [medicines, setMedicines] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchMedicines()
  }, [])

  const fetchMedicines = async () => {
    try {
      // Mock data
      const mockMedicines = [
        { 
          id: 1, 
          name: 'Paracetamol', 
          category: 'Pain Killer',
          manufacturer: 'Cipla',
          stock: 500,
          price: 2.5,
          expiry: '2025-12-31',
          reorderLevel: 100
        },
        { 
          id: 2, 
          name: 'Amoxicillin', 
          category: 'Antibiotic',
          manufacturer: 'GSK',
          stock: 50,
          price: 15.0,
          expiry: '2024-06-30',
          reorderLevel: 100
        },
        { 
          id: 3, 
          name: 'Cetirizine', 
          category: 'Antihistamine',
          manufacturer: 'Dr. Reddy',
          stock: 200,
          price: 3.0,
          expiry: '2025-03-31',
          reorderLevel: 50
        },
      ]
      setMedicines(mockMedicines)
    } catch (error) {
      toast.error('Failed to fetch medicines')
    } finally {
      setLoading(false)
    }
  }

  const getStockStatus = (stock, reorderLevel) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' }
    if (stock <= reorderLevel) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' }
    return { label: 'In Stock', color: 'bg-green-100 text-green-800' }
  }

  const filteredMedicines = medicines.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: medicines.length,
    lowStock: medicines.filter(m => m.stock <= m.reorderLevel).length,
    outOfStock: medicines.filter(m => m.stock === 0).length,
    totalValue: medicines.reduce((sum, m) => sum + (m.stock * m.price), 0)
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8 bg-gray-50 min-h-screen">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Medicine Inventory</h1>
              <p className="text-gray-600 mt-1">Manage pharmacy stock</p>
            </div>
            <button className="btn-primary flex items-center">
              <FiPlus className="mr-2" />
              Add Medicine
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600">Total Medicines</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-sm text-gray-600">Inventory Value</p>
              <p className="text-2xl font-bold text-primary-600">₹{stats.totalValue}</p>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search medicines..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Medicines Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicine</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manufacturer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMedicines.map((medicine) => {
                  const status = getStockStatus(medicine.stock, medicine.reorderLevel)
                  return (
                    <tr key={medicine.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{medicine.name}</td>
                      <td className="px-6 py-4">{medicine.category}</td>
                      <td className="px-6 py-4">{medicine.manufacturer}</td>
                      <td className="px-6 py-4">
                        <span className="font-semibold">{medicine.stock}</span>
                        {medicine.stock <= medicine.reorderLevel && (
                          <FiAlertCircle className="inline ml-2 text-yellow-500" size={16} />
                        )}
                      </td>
                      <td className="px-6 py-4">₹{medicine.price}</td>
                      <td className="px-6 py-4">{new Date(medicine.expiry).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <FiEdit2 size={18} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

export default MedicineInventory