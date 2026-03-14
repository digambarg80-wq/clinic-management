import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import authService from '../services/auth.service'

const AuthContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
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

  const checkUser = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const userData = await authService.getCurrentUser()
        setUser(userData)
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials)
      localStorage.setItem('token', response.token)
      setUser(response.user)
      toast.success('Login successful!')
      navigate('/')
      return response
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await authService.register(userData)
      toast.success('Registration successful! Please login.')
      navigate('/login')
      return response
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}