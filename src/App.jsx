import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Calculator from './pages/Calculator';
import Tracker from './pages/Tracker';
import Community from './pages/Community';
import Profile from './pages/Profile';
import AuthOverlay from './components/AuthOverlay';
import { useAuth } from './context/AuthContext';
import './App.css';

function AppShell({ children }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}

function CalculatorRoute() {
  const { user } = useAuth();

  return (
    <>
      <Navigation />
      <Calculator />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthOverlay />
        <Routes>
          <Route path="/login" element={<Navigate to="/calculator" replace />} />
          <Route path="/signup" element={<Navigate to="/calculator" replace />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppShell>
                  <Dashboard />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <AppShell>
                  <Profile />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/calculator"
            element={<CalculatorRoute />}
          />
          <Route
            path="/tracker"
            element={
              <ProtectedRoute>
                <AppShell>
                  <Tracker />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <AppShell>
                  <Community />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/calculator" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
