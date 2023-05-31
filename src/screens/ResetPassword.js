import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Input, Icon } from '@rneui/themed';
import Spinner from '../components/Spinner';
import { validateEmail } from '../utils/utils';
import { StatusBar } from 'expo-status-bar';

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onResetPassword = () => {
    if (!validateEmail(email)) {
      alert('This is not a valid email address!');
      return;
    }
    if (password === '') {
      alert('Please enter password!');
      return;
    }
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Reset password success
        setIsLoading(false);
        Alert('Password Reset Email has been sent to ' + email);
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error.message);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <ScrollView>
        {/* Reset Password form */}
        <View className="items-center mx-5 md:mx-10">
          <Image
            className="my-5 w-[175] h-[75] md:my-10 md:w-[300] md:h-[120]"
            source={require('../../assets/logo.png')}
          />
          <Input
            label="Email"
            value={email}
            onChangeText={(newValue) => setEmail(newValue.trim())}
            autoCapitalize="none"
            autoCorrect={false}
            rightIcon={<Icon name="email" type="MaterialIcons" />}
          />

          <Pressable
            className="w-full flex justify-center items-center mt-5 p-2 rounded-lg md:rounded-2xl bg-blue-500"
            onPress={() => onResetPassword()}
          >
            <Text className="text-white font-bold text-md md:text-xl">
              Reset Password
            </Text>
          </Pressable>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="mt-3 text-sm md:text-lg text-center text-blue-600">
              Sign in here!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default ResetPassword;
