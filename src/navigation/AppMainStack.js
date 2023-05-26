import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from '../../firebaseConfig';
import HeaderTitle from '../components/HeaderTitle';
import HeaderRightButton from '../components/HeaderRightButton';
import OrderList from '../screens/InstallationOrderList';
import OrderDetail1 from '../screens/InstallationOrderDetail1';
import OrderDetail2 from '../screens/InstallationOrderDetail2';
import CameraScreen from '../screens/Camera';
import EditProfile from '../screens/EditProfile';

const AppMainStack = () => {
  const MainStack = createNativeStackNavigator();
  const user = auth.currentUser;
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="OrderList"
        component={OrderList}
        options={{
          headerTitle: () => {
            return <HeaderTitle title="OBJOIN - Order List" />;
          },
          headerRight: () => {
            return <HeaderRightButton user={user} />;
          },
        }}
      />
      <MainStack.Screen
        name="Detail1"
        component={OrderDetail1}
        options={{
          headerTitle: () => {
            return <HeaderTitle title="OBJOIN - Order Detail" />;
          },
          headerRight: () => {
            return <HeaderRightButton user={user} />;
          },
        }}
      />
      <MainStack.Screen
        name="Detail2"
        component={OrderDetail2}
        options={{
          headerTitle: () => {
            return <HeaderTitle title="OBJOIN - Order Detail" />;
          },
          headerRight: () => {
            return <HeaderRightButton user={user} />;
          },
        }}
      />
      <MainStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerTitle: () => {
            return <HeaderTitle title="OBJOIN - Camera" />;
          },
        }}
      />
      <MainStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: () => {
            return <HeaderTitle title="OBJOIN - Edit Profile" />;
          },
          headerRight: () => {
            return <HeaderRightButton user={user} />;
          },
        }}
      />
    </MainStack.Navigator>
  );
};

export default AppMainStack;
