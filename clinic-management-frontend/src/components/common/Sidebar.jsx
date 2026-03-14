import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  FiHome, FiUsers, FiCalendar, FiUser, 
  FiLogOut, FiMenu, FiChevronLeft, FiActivity,
  FiDollarSign, FiPieChart, FiSettings
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
  ]

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-primary-700 to-primary-900 text-white h-screen fixed left-0 top-0 transition-all duration-300 shadow-xl z-50`}>
      <div className="p-4 flex items-center justify-between border-b border-primary-600">
        {!isCollapsed && (
          <h1 className="text-xl font-bold tracking-wider">Clinic <span className="text-primary-300">D&G</span></h1>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-primary-600 transition-all"
        >
          {isCollapsed ? <FiMenu size={20} /> : <FiChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mx-2 my-1 rounded-lg transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-white text-primary-700 shadow-md' 
                  : 'text-primary-100 hover:bg-primary-600 hover:text-white'
              }`
            }
          >
            <div className="flex items-center">
              <item.icon size={20} />
              {!isCollapsed && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
              {isCollapsed && (
                <span className="absolute left-14 bg-primary-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </span>
              )}
            </div>
          </NavLink>
        ))}

        {/* Additional Quick Links */}
        {!isCollapsed && (
          <div className="mt-8 pt-4 border-t border-primary-600 mx-4">
            <p className="text-xs text-primary-300 mb-2 uppercase tracking-wider">Quick Links</p>
            <NavLink 
              to="/reports" 
              className="flex items-center text-primary-100 hover:text-white w-full py-2 px-2 rounded hover:bg-primary-600 transition-colors"
            >
              <FiActivity size={16} className="mr-3" />
              <span className="text-sm">Reports</span>
            </NavLink>
            <NavLink 
              to="/billing" 
              className="flex items-center text-primary-100 hover:text-white w-full py-2 px-2 rounded hover:bg-primary-600 transition-colors"
            >
              <FiDollarSign size={16} className="mr-3" />
              <span className="text-sm">Billing</span>
            </NavLink>
            <NavLink 
              to="/analytics" 
              className="flex items-center text-primary-100 hover:text-white w-full py-2 px-2 rounded hover:bg-primary-600 transition-colors"
            >
              <FiPieChart size={16} className="mr-3" />
              <span className="text-sm">Analytics</span>
            </NavLink>
          </div>
        )}
      </nav>
      
      <button
        onClick={logout}
        className={`flex items-center px-4 py-3 mx-2 my-1 text-primary-100 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200 absolute bottom-4 w-[calc(100%-16px)] group ${
          isCollapsed ? 'justify-center' : ''
        }`}
      >
        <FiLogOut size={20} />
        {!isCollapsed && <span className="ml-3">Logout</span>}
        {isCollapsed && (
          <span className="absolute left-14 bg-red-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Logout
          </span>
        )}
      </button>
    </div>
  )
}

export default Sidebar