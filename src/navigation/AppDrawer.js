import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Image, Text } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import AppMainStack from './AppMainStack';

const CustomDrawerContent = ({ navigation }) => {
  const user = auth.currentUser;
  const handleSignOut = () => {
    navigation.toggleDrawer();
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  return (
    <DrawerContentScrollView>
      <View className="flex flex-col items-center justify-center my-3 pb-3 border-gray-200 border-b">
        <Image
          className="h-16 w-16 md:h-20 md:w-20 rounded-full"
          source={
            user.photoURL
              ? { uri: user.photoURL }
              : require('../../assets/default-profile.jpg')
          }
        />
        <Text className="mt-5 mb-2 md:text-lg">Hi {user.displayName},</Text>
        <Text className="text-xs md:text-sm">{user.email}</Text>
      </View>
      <DrawerItem
        className="bg-slate-400"
        label="Edit Profile"
        onPress={() => navigation.navigate('EditProfile')}
      />
      <DrawerItem label="Signout" onPress={handleSignOut} />
    </DrawerContentScrollView>
  );
};

const AppDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{ drawerPosition: 'right', headerShown: false }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen name="Installation Orders" component={AppMainStack} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
