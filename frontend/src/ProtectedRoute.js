import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import MyAccountScreen from './Screens/MyAccountScreen';

// Context

const ProtectedRoute = () => {
  // redirects
  const history = useHistory();

  // -- side effects
  useEffect(() => {
    // If user does not exists
    if (!localStorage.getItem('user')) history.push('/login');
  });
  return <MyAccountScreen />;
};

export default ProtectedRoute;
