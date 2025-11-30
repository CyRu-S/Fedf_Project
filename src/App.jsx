import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import AccessPage from './AccessPage';
import LoginPage from './components/LoginPage.jsx';
import UserLoginPage from './components/UserLoginPage.jsx';
import SignUpPage from './SignUpPage';
import DashboardPage from './DashboardPage';
import DailyProgressLogPage from './DailyProgressLogPage';
import NotificationSettings from './NotificationSettings';
import NutritionistCommunication from './NutritionistCommunication';
import UserDietPlanPage from './UserDietPlan.jsx';
import UserProfile from './UserProfile.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import { NutritionProvider } from './contexts/NutritionContext';
import NotificationContainer from './components/NotificationContainer';
import { AuthProvider, useAuth } from './contexts/AuthContext';

/**
 * Main App Component
 * This is the entry point of the application
 * It handles routing between different pages
 *
 * Routes:
 * - / (root) -> AccessPage (Professional/User access selection)
 * - /signup -> SignUpPage (Registration form)
 * - /dashboard -> DashboardPage (User dashboard)
 */

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log('ProtectedRoute - Auth state:', { user, loading });

  // Show loading state while checking auth
  if (loading) {
    console.log('ProtectedRoute - Loading auth state, showing spinner');
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress />
        <Typography>Loading your dashboard...</Typography>
      </Box>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    console.log('ProtectedRoute - No user, redirecting to login');
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  console.log('ProtectedRoute - User authenticated, rendering children');

  // If authenticated, render the children
  return children;
};


function App() {
  return (
    <AuthProvider>
      <NutritionProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<AccessPage />} />
            <Route path="/login/pro" element={<LoginPage />} />
            <Route path="/login/user" element={<UserLoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Navigate to="/dashboard" replace />
              </ProtectedRoute>
            } />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />

            <Route path="/daily-log" element={
              <ProtectedRoute>
                <DailyProgressLogPage />
              </ProtectedRoute>
            } />

            <Route path="/diet-plan" element={
              <ProtectedRoute>
                <UserDietPlanPage />
              </ProtectedRoute>
            } />

            <Route path="/notifications" element={
              <ProtectedRoute>
                <NotificationSettings />
              </ProtectedRoute>
            } />

            <Route path="/communication" element={
              <ProtectedRoute>
                <NutritionistCommunication />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />

            {/* Redirect any unknown routes to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          <NotificationContainer />
        </Router>
      </NutritionProvider>
    </AuthProvider>
  );
}

export default App;
