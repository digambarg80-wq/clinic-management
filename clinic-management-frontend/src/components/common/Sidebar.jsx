import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  FiHome, FiUsers, FiCalendar, FiUser, 
  FiLogOut, FiMenu, FiChevronLeft, FiDollarSign,
  FiActivity, FiSettings, FiBell
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
  const { logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/patients', icon: FiUsers, label: 'Patients' },
    { path: '/appointments', icon: FiCalendar, label: 'Appointments' },
    { path: '/doctors', icon: FiUser, label: 'Doctors' },
    { path: '/billing', icon: FiDollarSign, label: 'Billing' },
  ]

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen fixed left-0 top-0 transition-all duration-300 shadow-2xl z-50`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h1 className="text-xl font-bold">
              Clinic<span className="text-blue-400">MS</span>
            </h1>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-all"
        >
          {isCollapsed ? <FiMenu size={20} /> : <FiChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="mt-6 px-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-3 mb-1 rounded-xl transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            {!isCollapsed && (
              <span className="ml-3 font-medium">{item.label}</span>
            )}
            {isCollapsed && (
              <span className="absolute left-14 bg-gray-800 text-white px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      
      <div className="absolute bottom-4 left-0 right-0 px-3">
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-3 rounded-xl text-gray-300 hover:bg-red-600 hover:text-white transition-all group"
        >
          <FiLogOut size={20} />
          {!isCollapsed && <span className="ml-3">Logout</span>}
          {isCollapsed && (
            <span className="absolute left-14 bg-red-600 text-white px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

export default Sidebar