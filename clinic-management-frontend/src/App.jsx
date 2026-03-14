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

// New imports
import BillingDashboard from './components/billing/BillingDashboard'
import CreateInvoice from './components/billing/CreateInvoice'
import InsuranceClaims from './components/billing/InsuranceClaims'
import PrescriptionList from './components/prescriptions/PrescriptionList'
import MedicineInventory from './components/pharmacy/MedicineInventory'
import NotificationCenter from './components/notifications/NotificationCenter'
import AnalyticsDashboard from './components/reports/AnalyticsDashboard'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Main Routes */}
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
          <Route path="/billing/claims" element={<PrivateRoute><InsuranceClaims /></PrivateRoute>} />
          
          {/* Prescription Routes */}
          <Route path="/prescriptions" element={<PrivateRoute><PrescriptionList /></PrivateRoute>} />
          
          {/* Pharmacy Routes */}
          <Route path="/pharmacy" element={<PrivateRoute><MedicineInventory /></PrivateRoute>} />
          
          {/* Notification Routes */}
          <Route path="/notifications" element={<PrivateRoute><NotificationCenter /></PrivateRoute>} />
          
          {/* Reports & Analytics Routes */}
          <Route path="/reports" element={<PrivateRoute><AnalyticsDashboard /></PrivateRoute>} />
          <Route path="/analytics" element={<PrivateRoute><AnalyticsDashboard /></PrivateRoute>} />
          
          {/* 404 Route */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App