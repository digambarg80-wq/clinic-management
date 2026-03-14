import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiUsers, FiCalendar, FiUser, FiDollarSign,
  FiActivity, FiTrendingUp, FiClock, FiCheckCircle,
  FiXCircle, FiArrowUp, FiArrowDown
} from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    totalDoctors: 0,
    monthlyRevenue: 0,
    pendingPayments: 0,
    completedToday: 0
  })
  
  const [recentActivities, setRecentActivities] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load mock data immediately for client demo
    loadDashboardData()
  }, [])

  const loadDashboardData = () => {
    // Mock Data - Everything works without backend
    setStats({
      totalPatients: 1250,
      todayAppointments: 18,
      totalDoctors: 12,
      monthlyRevenue: 425000,
      pendingPayments: 38000,
      completedToday: 12,
      revenueGrowth: 12.5,
      patientGrowth: 8.3
    })

    setAppointments([
      { 
        id: 1, 
        patientName: 'Rahul Sharma', 
        doctorName: 'Dr. Patel', 
        time: '09:30 AM',
        type: 'Consultation',
        status: 'confirmed',
        avatar: 'RS'
      },
      { 
        id: 2, 
        patientName: 'Priya Patel', 
        doctorName: 'Dr. Shah', 
        time: '10:15 AM',
        type: 'Follow-up',
        status: 'waiting',
        avatar: 'PP'
      },
      { 
        id: 3, 
        patientName: 'Amit Kumar', 
        doctorName: 'Dr. Desai', 
        time: '11:00 AM',
        type: 'Checkup',
        status: 'confirmed',
        avatar: 'AK'
      },
      { 
        id: 4, 
        patientName: 'Neha Singh', 
        doctorName: 'Dr. Mehta', 
        time: '11:45 AM',
        type: 'Emergency',
        status: 'critical',
        avatar: 'NS'
      },
      { 
        id: 5, 
        patientName: 'Vikram Mehta', 
        doctorName: 'Dr. Kumar', 
        time: '12:30 PM',
        type: 'Consultation',
        status: 'confirmed',
        avatar: 'VM'
      }
    ])

    setRecentActivities([
      { 
        id: 1, 
        action: 'New patient registered', 
        patient: 'Sunita Reddy', 
        time: '5 min ago',
        type: 'patient'
      },
      { 
        id: 2, 
        action: 'Appointment completed', 
        patient: 'Rajesh Kumar', 
        time: '15 min ago',
        type: 'appointment'
      },
      { 
        id: 3, 
        action: 'Payment received', 
        patient: 'Meera Joshi', 
        amount: '₹2,500', 
        time: '25 min ago',
        type: 'payment'
      },
      { 
        id: 4, 
        action: 'Prescription created', 
        patient: 'Arjun Singh', 
        time: '35 min ago',
        type: 'prescription'
      },
      { 
        id: 5, 
        action: 'Lab report uploaded', 
        patient: 'Kavita Sharma', 
        time: '45 min ago',
        type: 'lab'
      }
    ])

    setLoading(false)
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'waiting': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const statCards = [
    { 
      title: 'Total Patients', 
      value: stats.totalPatients, 
      icon: FiUsers, 
      change: '+12%',
      trend: 'up',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      title: "Today's Appointments", 
      value: stats.todayAppointments, 
      subValue: `${stats.completedToday} completed`,
      icon: FiCalendar, 
      change: '+3',
      trend: 'up',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      title: 'Total Doctors', 
      value: stats.totalDoctors, 
      icon: FiUser, 
      change: '2 on leave',
      trend: 'neutral',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      title: 'Monthly Revenue', 
      value: `₹${stats.monthlyRevenue.toLocaleString()}`, 
      icon: FiDollarSign, 
      change: '+₹12,500',
      trend: 'up',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <div className="p-8 flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-50 min-h-screen">
        <Header />
        <main className="p-8  pt-20 bg-gray-50 min-h-screen">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, Dr. Patel</h1>
            <p className="text-gray-600 mt-1">Here's what's happening at your clinic today</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    {stat.subValue && (
                      <p className="text-xs text-gray-500 mt-1">{stat.subValue}</p>
                    )}
                  </div>
                  <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl shadow-lg`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  {stat.trend === 'up' && <FiArrowUp className="text-green-500 mr-1" size={14} />}
                  {stat.trend === 'down' && <FiArrowDown className="text-red-500 mr-1" size={14} />}
                  <span className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Today's Schedule and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Today's Schedule */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Today's Schedule</h2>
                <Link to="/appointments" className="text-sm text-primary-600 hover:text-primary-700">
                  View all
                </Link>
              </div>
              
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div key={apt.id} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {apt.avatar}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">{apt.patientName}</h3>
                        <span className="text-sm font-medium text-gray-600">{apt.time}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-600">{apt.doctorName} • {apt.type}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                          {apt.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'patient' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'payment' ? 'bg-green-100 text-green-600' :
                      activity.type === 'appointment' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {activity.type === 'patient' && <FiUser size={14} />}
                      {activity.type === 'payment' && <FiDollarSign size={14} />}
                      {activity.type === 'appointment' && <FiCalendar size={14} />}
                      {activity.type === 'prescription' && <FiActivity size={14} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">{activity.action}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.patient}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/appointments/add" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <FiCalendar className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">New Appointment</h3>
                <p className="text-sm text-gray-600">Schedule now</p>
              </div>
            </Link>
            
            <Link to="/patients/add" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <FiUsers className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Register Patient</h3>
                <p className="text-sm text-gray-600">Add new patient</p>
              </div>
            </Link>
            
            <Link to="/billing/create" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <FiDollarSign className="text-orange-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Create Invoice</h3>
                <p className="text-sm text-gray-600">Generate bill</p>
              </div>
            </Link>
            
            <Link to="/reports" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <FiTrendingUp className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">View Reports</h3>
                <p className="text-sm text-gray-600">Analytics</p>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard