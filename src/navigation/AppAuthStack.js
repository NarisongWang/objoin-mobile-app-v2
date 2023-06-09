import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import ResetPassword from '../screens/ResetPassword';
import HeaderTitle from '../components/HeaderTitle';

const AppAuthStack = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerTitle: () => {
            return <HeaderTitle title="OBJOIN - Sign In" />;
          },
        }}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerTitle: () => {
            return <HeaderTitle title="OBJOIN - Reset Password" />;
          },
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AppAuthStack;
