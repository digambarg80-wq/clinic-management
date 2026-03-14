import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Header = () => {
  const { user } = useAuth()

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-end px-8">
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">Welcome, {user?.name || 'User'}</span>
        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
          <span className="text-primary-600 font-semibold">
            {user?.name?.charAt(0) || 'U'}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header