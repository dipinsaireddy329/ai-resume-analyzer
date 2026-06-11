import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout.jsx';
import { AdminPage } from '../pages/AdminPage.jsx';
import { DashboardPage } from '../pages/DashboardPage.jsx';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { RegisterPage } from '../pages/RegisterPage.jsx';
import { ResumeDetailPage } from '../pages/ResumeDetailPage.jsx';
import { UploadPage } from '../pages/UploadPage.jsx';
import { ProtectedRoute } from './ProtectedRoute.jsx';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/dashboard" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  {
    element: <ProtectedRoute />,
    children: [{
      element: <AppLayout />,
      children: [
        { path: '/dashboard', element: <DashboardPage /> },
        { path: '/upload', element: <UploadPage /> },
        { path: '/resumes/:id', element: <ResumeDetailPage /> }
      ]
    }]
  },
  {
    element: <ProtectedRoute adminOnly />,
    children: [{ path: '/admin', element: <AppLayout />, children: [{ index: true, element: <AdminPage /> }] }]
  }
]);
