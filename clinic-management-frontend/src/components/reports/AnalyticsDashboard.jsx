import React, { useState, useEffect } from 'react'
import { 
  FiTrendingUp, FiUsers, FiCalendar, FiDollarSign,
  FiDownload, FiFilter, FiActivity
} from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'

const AnalyticsDashboard = () => {
  const [period, setPeriod] = useState('month')
  const [data, setData] = useState(null)

  useEffect(() => {
    // Mock data
    setData({
      revenue: {
        total: 425000,
        growth: 12.5,
        data: [35000, 42000, 38000, 45000, 52000, 48000, 55000, 60000, 58000, 62000, 65000, 70000]
      },
      patients: {
        total: 1250,
        new: 145,
        returning: 1105,
        growth: 8.3
      },
      appointments: {
        total: 850,
        completed: 720,
        cancelled: 80,
        pending: 50,
        growth: 15.2
      },
      popularServices: [
        { name: 'General Consultation', count: 450, revenue: 90000 },
        { name: 'Dental Checkup', count: 280, revenue: 84000 },
        { name: 'Eye Examination', count: 190, revenue: 57000 },
        { name: 'Physiotherapy', count: 150, revenue: 60000 },
        { name: 'Lab Tests', count: 320, revenue: 48000 },
      ]
    })
  }, [period])

  if (!data) return <div>Loading...</div>

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8 bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Analytics & Reports</h1>
              <p className="text-gray-600 mt-1">Track your clinic's performance</p>
            </div>
            <div className="flex space-x-3">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="input-field w-32"
              >
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="quarter">Quarter</option>
                <option value="year">Year</option>
              </select>
              <button className="btn-secondary flex items-center">
                <FiDownload className="mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-800">₹{data.revenue.total.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-2">↑ {data.revenue.growth}%</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <FiDollarSign className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-800">{data.patients.total}</p>
                  <p className="text-sm text-green-600 mt-2">↑ {data.patients.growth}%</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FiUsers className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Appointments</p>
                  <p className="text-2xl font-bold text-gray-800">{data.appointments.total}</p>
                  <p className="text-sm text-green-600 mt-2">↑ {data.appointments.growth}%</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FiCalendar className="text-purple-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {Math.round((data.appointments.completed / data.appointments.total) * 100)}%
                  </p>
                  <p className="text-sm text-green-600 mt-2">↑ 5.2%</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <FiActivity className="text-orange-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trend</h3>
              <div className="h-64 flex items-end space-x-2">
                {data.revenue.data.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-primary-600 rounded-t-lg hover:bg-primary-700 transition-all"
                      style={{ height: `${(value / 80000) * 200}px` }}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">Month {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Status</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completed</span>
                    <span className="font-semibold">{data.appointments.completed}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(data.appointments.completed / data.appointments.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Cancelled</span>
                    <span className="font-semibold">{data.appointments.cancelled}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(data.appointments.cancelled / data.appointments.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pending</span>
                    <span className="font-semibold">{data.appointments.pending}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${(data.appointments.pending / data.appointments.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Services */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Services</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 text-sm font-semibold text-gray-600">Service</th>
                    <th className="text-left py-3 text-sm font-semibold text-gray-600">Patients</th>
                    <th className="text-left py-3 text-sm font-semibold text-gray-600">Revenue</th>
                    <th className="text-left py-3 text-sm font-semibold text-gray-600">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {data.popularServices.map((service, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3">{service.name}</td>
                      <td className="py-3">{service.count}</td>
                      <td className="py-3 font-semibold">₹{service.revenue.toLocaleString()}</td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${(service.revenue / data.revenue.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {Math.round((service.revenue / data.revenue.total) * 100)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AnalyticsDashboard