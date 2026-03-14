import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = () => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }

  const login = async (credentials) => {
    try {
      // Mock login - works immediately
      if (credentials.email && credentials.password) {
        const mockUser = {
          id: 1,
          name: 'Dr. Rajesh Patel',
          email: credentials.email,
          role: 'admin'
        }
        
        localStorage.setItem('token', 'mock-jwt-token-123')
        localStorage.setItem('user', JSON.stringify(mockUser))
        setUser(mockUser)
        
        toast.success('Login successful!')
        navigate('/')
        return { user: mockUser, token: 'mock-jwt-token-123' }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.')
      throw error
    }
  }

  const register = async (userData) => {
    try {
      // Mock registration - works immediately
      if (userData.name && userData.email && userData.password) {
        if (userData.password !== userData.confirmPassword) {
          throw new Error('Passwords do not match')
        }
        
        toast.success('Registration successful! Please login.')
        navigate('/login')
        return { message: 'Registration successful' }
      } else {
        throw new Error('Please fill all fields')
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed')
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}