import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Image, Pressable, Text } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import AppMainStack from './AppMainStack';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

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
      <View className="flex flex-col items-center justify-center mt-3 pb-3 border-gray-200 border-b">
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
      <View className="flex flex-col items-center justify-center">
        <Pressable
          className="w-11/12 flex flex-row justify-between p-2 items-center m-2 mt-5"
          onPress={() => {
            navigation.navigate('ManageAccount');
          }}
        >
          <Text className="text-gray-600 font-bold text-sm md:text-base ml-2">
            Manage Account
          </Text>
          <View className="mr-2">
            <FontAwesome5 name="user-edit" size={15} color="rgb(55,65,81)" />
          </View>
        </Pressable>
        <Pressable
          className="w-11/12 flex flex-row justify-between p-2 items-center m-2"
          onPress={() => {}}
        >
          <Text className="text-gray-600 font-bold text-sm md:text-base ml-2">
            User Manual
          </Text>
          <View className="mr-2">
            <FontAwesome
              name="question-circle"
              size={15}
              color="rgb(55,65,81)"
            />
          </View>
        </Pressable>
        <Pressable
          className="w-11/12 flex flex-row justify-between p-2 items-center m-2"
          onPress={() => {
            handleSignOut();
          }}
        >
          <Text className="text-gray-600 font-bold text-sm md:text-base ml-2">
            Signout
          </Text>
          <View className="mr-2">
            <FontAwesome5 name="sign-out-alt" size={17} color="rgb(55,65,81)" />
          </View>
        </Pressable>
      </View>
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
