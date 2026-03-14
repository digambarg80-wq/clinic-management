import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/common/PrivateRoute'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import PatientList from './components/patients/PatientList'
import AddPatient from './components/patients/AddPatient'
import PatientDetails from './components/patients/PatientDetails'
import AppointmentList from './components/appointments/AppointmentList'
import AddAppointment from './components/appointments/AddAppointment'
import DoctorList from './components/doctors/DoctorList'
import AddDoctor from './components/doctors/AddDoctor'
import BillingDashboard from './components/billing/BillingDashboard'
import CreateInvoice from './components/billing/CreateInvoice'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          
          {/* Patient Routes */}
          <Route path="/patients" element={<PrivateRoute><PatientList /></PrivateRoute>} />
          <Route path="/patients/add" element={<PrivateRoute><AddPatient /></PrivateRoute>} />
          <Route path="/patients/:id" element={<PrivateRoute><PatientDetails /></PrivateRoute>} />
          
          {/* Appointment Routes */}
          <Route path="/appointments" element={<PrivateRoute><AppointmentList /></PrivateRoute>} />
          <Route path="/appointments/add" element={<PrivateRoute><AddAppointment /></PrivateRoute>} />
          
          {/* Doctor Routes */}
          <Route path="/doctors" element={<PrivateRoute><DoctorList /></PrivateRoute>} />
          <Route path="/doctors/add" element={<PrivateRoute><AddDoctor /></PrivateRoute>} />
          
          {/* Billing Routes */}
          <Route path="/billing" element={<PrivateRoute><BillingDashboard /></PrivateRoute>} />
          <Route path="/billing/create" element={<PrivateRoute><CreateInvoice /></PrivateRoute>} />
          
          {/* 404 Route */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App