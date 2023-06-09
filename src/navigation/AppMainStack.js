import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from '../../firebaseConfig';
import HeaderTitle from '../components/HeaderTitle';
import HeaderRightButton from '../components/HeaderRightButton';
import OrderList from '../screens/OrderList';
import OrderDetail1 from '../screens/OrderDetail1';
import OrderDetail2 from '../screens/OrderDetail2';
import CameraScreen from '../screens/Camera';
import EditPhoto from '../screens/EditPhoto';
import PDFScreen from '../screens/PDFScreen';
import CheckList from '../screens/CheckList';
import ManageAccount from '../screens/ManageAccount';
import HelpScreen from '../screens/HelpScreen';

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
        name="EditPhoto"
        component={EditPhoto}
        options={{
          headerTitle: () => {
            return <HeaderTitle title="OBJOIN - Edit Photo" />;
          },
        }}
      />
      <MainStack.Screen
        name="PDF"
        component={PDFScreen}
        options={{
          headerTitle: () => {
            return <HeaderTitle title="PDF file - " />;
          },
        }}
      />
      <MainStack.Screen
        name="CheckList"
        component={CheckList}
        options={{
          headerTitle: () => {
            return <HeaderTitle title="Install Check List - " />;
          },
        }}
      />
      <MainStack.Screen
        name="ManageAccount"
        component={ManageAccount}
        options={{
          headerTitle: () => {
            return <HeaderTitle title="OBJOIN - Manage Account" />;
          },
          headerRight: () => {
            return <HeaderRightButton user={user} />;
          },
        }}
      />
      <MainStack.Screen
        name="Help"
        component={HelpScreen}
        options={{
          headerTitle: () => {
            return <HeaderTitle title="OBJOIN - Help" />;
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
