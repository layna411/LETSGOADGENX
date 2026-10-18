import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { recordPageView } from '../../services/analyticsService';

export const PageTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    recordPageView(location.pathname);
  }, [location.pathname]);

  return null;
};
