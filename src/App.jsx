import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Calculator from './pages/Calculator';
import Tracker from './pages/Tracker';
import Fertility from './pages/Fertility';
import Community from './pages/Community';
import Profile from './pages/Profile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import About from './pages/About';
import Contact from './pages/Contact';
import PlaceholderPage from './pages/PlaceholderPage';
import AuthOverlay from './components/AuthOverlay';
import ChristmasAnimation from './components/ChristmasAnimation';
import { useAuth } from './context/AuthContext';
import './App.css';

function AppShell({ children }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
    <AuthProvider>
      <Router>
          <AuthOverlay />
          <ChristmasAnimation />
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
            element={
              <AppShell>
                  <Calculator />
              </AppShell>
            }
          />
          <Route
            path="/fertility"
            element={
              <AppShell>
                <Fertility />
              </AppShell>
            }
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
          <Route
            path="/privacy-policy"
            element={
              <AppShell>
                <PrivacyPolicy />
              </AppShell>
            }
          />
          <Route
            path="/terms-of-service"
            element={
              <AppShell>
                <TermsOfService />
              </AppShell>
            }
          />
          <Route
            path="/cookie-policy"
            element={
              <AppShell>
                <CookiePolicy />
              </AppShell>
            }
          />
          <Route
            path="/about"
            element={
              <AppShell>
                <About />
              </AppShell>
            }
          />
          <Route
            path="/contact"
            element={
              <AppShell>
                <Contact />
              </AppShell>
            }
          />
          <Route
            path="/blog"
            element={
              <AppShell>
                <PlaceholderPage 
                  title="Blog" 
                  description="Stay tuned for expert articles, pregnancy tips, community stories, and helpful guides to support you through your journey."
                />
              </AppShell>
            }
          />
          <Route
            path="/careers"
            element={
              <AppShell>
                <PlaceholderPage 
                  title="Careers" 
                  description="Join our team! We're always looking for passionate individuals who want to make a difference in the lives of expecting parents. Check back soon for open positions."
                />
              </AppShell>
            }
          />
          <Route
            path="/press"
            element={
              <AppShell>
                <PlaceholderPage 
                  title="Press Kit" 
                  description="Media inquiries and press resources will be available here. For immediate press inquiries, please contact us through our contact page."
                />
              </AppShell>
            }
          />
          <Route
            path="/help"
            element={
              <AppShell>
                <PlaceholderPage 
                  title="Help Center" 
                  description="Find answers to common questions, troubleshooting guides, and step-by-step tutorials. Our comprehensive help center is coming soon!"
                />
              </AppShell>
            }
          />
          <Route
            path="/faq"
            element={
              <AppShell>
                <PlaceholderPage 
                  title="Frequently Asked Questions" 
                  description="Have questions? We're compiling the most frequently asked questions and detailed answers. Check back soon or contact us directly."
                />
              </AppShell>
            }
          />
          <Route
            path="/safety"
            element={
              <AppShell>
                <PlaceholderPage 
                  title="Safety Guidelines" 
                  description="Your safety and privacy are our top priorities. Our comprehensive safety guidelines and best practices will be available here soon."
                />
              </AppShell>
            }
          />
          <Route
            path="/community-guidelines"
            element={
              <AppShell>
                <PlaceholderPage 
                  title="Community Guidelines" 
                  description="Our community guidelines help ensure a safe, supportive, and respectful environment for all members. Full guidelines coming soon!"
                />
              </AppShell>
            }
          />
          <Route
            path="/report"
            element={
              <AppShell>
                <PlaceholderPage 
                  title="Report an Issue" 
                  description="If you encounter any issues, inappropriate content, or have concerns, please contact us through our contact page. A dedicated reporting system is coming soon."
                />
              </AppShell>
            }
          />
          <Route
            path="/refund-policy"
            element={
              <AppShell>
                <PlaceholderPage 
                  title="Refund Policy" 
                  description="Our refund policy will be available here. Currently, BlessedBump is free to use. For any billing inquiries, please contact us."
                  comingSoon={false}
                />
              </AppShell>
            }
          />
          <Route
            path="/accessibility"
            element={
              <AppShell>
                <PlaceholderPage 
                  title="Accessibility Statement" 
                  description="We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying relevant accessibility standards. Full accessibility statement coming soon."
                />
              </AppShell>
            }
          />
          <Route path="/" element={<Navigate to="/calculator" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
