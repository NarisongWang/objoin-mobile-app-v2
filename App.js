import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import SignIn from './src/screens/SignIn';
import OrderList from './src/screens/InstallationOrderList';
import EditProfile from './src/screens/EditProfile';
import Spinner from './src/components/Spinner';
import { Text, Pressable, Image, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Authentication stack
const AppAuthStack = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerTitle: () => {
            return (
              <Text className="md:text-lg font-bold">OBJOIN - Sign In</Text>
            );
          },
        }}
      />
    </AuthStack.Navigator>
  );
};

// Main application stack
const AppMainStack = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="OrderList"
        component={OrderList}
        options={{
          headerTitle: () => {
            return (
              <Text className="md:text-lg font-bold">OBJOIN - Order List</Text>
            );
          },
          headerRight: () => {
            return (
              <Pressable
                className="h-10 w-10 md:h-14 md:w-14 md:my-2"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              >
                <Image
                  className="w-10 h-10 md:h-14 md:w-14 rounded-full"
                  source={
                    user.photoURL
                      ? { uri: user.photoURL }
                      : require('./assets/default-profile.jpg')
                  }
                ></Image>
              </Pressable>
            );
          },
        }}
      />
      <MainStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: () => {
            return (
              <Text className="md:text-lg font-bold">
                OBJOIN - Edit Profile
              </Text>
            );
          },
          headerRight: () => {
            return (
              <Pressable
                className="h-10 w-10 md:h-14 md:w-14 md:my-2"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              >
                <Image
                  className="w-10 h-10 md:h-14 md:w-14 rounded-full"
                  source={
                    user.photoURL
                      ? { uri: user.photoURL }
                      : require('./assets/default-profile.jpg')
                  }
                ></Image>
              </Pressable>
            );
          },
        }}
      />
    </MainStack.Navigator>
  );
};

// Drawer menu part
const CustomDrawerContent = ({ navigation }) => {
  const user = auth.currentUser;
  const handleSignOut = () => {
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
              : require('./assets/default-profile.jpg')
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
  return (
    <Drawer.Navigator
      screenOptions={{ drawerPosition: 'right', headerShown: false }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen name="Installation Orders" component={AppMainStack} />
    </Drawer.Navigator>
  );
};

// App routes
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

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}
