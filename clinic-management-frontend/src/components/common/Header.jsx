import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { FiBell, FiSettings } from 'react-icons/fi'

const Header = () => {
  const { user } = useAuth()

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-end px-8 fixed top-0 right-0 left-64 z-40">
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
          <FiBell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <FiSettings size={20} />
        </button>
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
          <span className="text-gray-700 font-medium">{user?.name || 'Dr. Patel'}</span>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 flex items-center justify-center text-white font-semibold shadow-md">
            {user?.name?.charAt(0) || 'D'}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header