import React, { useState, useEffect } from 'react'
import { FiBell, FiCheck, FiX, FiCalendar, FiUser, FiDollarSign } from 'react-icons/fi'
import Sidebar from '../common/Sidebar'
import Header from '../common/Header'

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Mock notifications
    setNotifications([
      {
        id: 1,
        type: 'appointment',
        title: 'New Appointment',
        message: 'Rahul Sharma booked an appointment for tomorrow at 10:00 AM',
        time: '5 min ago',
        read: false,
        icon: FiCalendar,
        color: 'bg-blue-500'
      },
      {
        id: 2,
        type: 'payment',
        title: 'Payment Received',
        message: '₹2,500 received from Priya Patel',
        time: '1 hour ago',
        read: false,
        icon: FiDollarSign,
        color: 'bg-green-500'
      },
      {
        id: 3,
        type: 'patient',
        title: 'New Patient Registered',
        message: 'Amit Kumar registered as new patient',
        time: '2 hours ago',
        read: true,
        icon: FiUser,
        color: 'bg-purple-500'
      },
      {
        id: 4,
        type: 'appointment',
        title: 'Appointment Reminder',
        message: 'You have 5 appointments scheduled for today',
        time: '3 hours ago',
        read: true,
        icon: FiCalendar,
        color: 'bg-blue-500'
      },
    ])
  }, [])

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const filteredNotifications = notifications.filter(n => 
    filter === 'all' ? true : filter === 'unread' ? !n.read : true
  )

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8 bg-gray-50 min-h-screen">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
              <p className="text-gray-600 mt-1">Stay updated with clinic activities</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="btn-secondary flex items-center"
              >
                <FiCheck className="mr-2" />
                Mark all as read
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-xl shadow-sm p-2 mb-6 inline-flex">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all' ? 'bg-primary-600 text-white' : 'hover:bg-gray-100'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'unread' ? 'bg-primary-600 text-white' : 'hover:bg-gray-100'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
                <FiBell size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No notifications to show</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl shadow-sm p-4 transition-all hover:shadow-md ${
                    !notification.read ? 'border-l-4 border-primary-600' : ''
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`${notification.color} p-3 rounded-lg mr-4`}>
                      <notification.icon className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                          <p className="text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                        </div>
                        <div className="flex space-x-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                              title="Mark as read"
                            >
                              <FiCheck size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <FiX size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default NotificationCenter