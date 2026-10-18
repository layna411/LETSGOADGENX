import React, { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { isAdminAuthenticated, logoutAdmin } from '../../services/adminAuthService';

export const AdminPortal: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAdminAuthenticated());

  useEffect(() => {
    document.title = isAuthenticated
      ? 'Admin Command Center | LetsGo AdGenX'
      : 'Admin Login | LetsGo AdGenX';
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
};

export default AdminPortal;
