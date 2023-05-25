import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import AppDrawer from './AppDrawer';
import AppAuthStack from './AppAuthStack';
import Spinner from '../components/Spinner';

const AppRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setChecking(false);
    });
  }, []);

  if (checking) {
    return <Spinner />;
  }

  return (
    <NavigationContainer>
      {loggedIn ? <AppDrawer /> : <AppAuthStack />}
    </NavigationContainer>
  );
};

export default AppRoutes;
