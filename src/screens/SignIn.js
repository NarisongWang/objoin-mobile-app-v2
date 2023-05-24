import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
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

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passVisible, setPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSignIn = () => {
    if (!validateEmail(email)) {
      alert('This is not a valid email address!');
      return;
    }
    if (password === '') {
      alert('Please enter password!');
      return;
    }
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setIsLoading(false);
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
        {/* Sign in form */}
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
          <Input
            secureTextEntry={!passVisible}
            label="Password"
            value={password}
            defaultValue="password"
            onChangeText={(newValue) => setPassword(newValue)}
            autoCapitalize="none"
            autoCorrect={false}
            rightIcon={
              passVisible ? (
                <Icon
                  name="visibility"
                  type="MaterialIcons"
                  onPress={() => setPassVisible(false)}
                />
              ) : (
                <Icon
                  name="visibility-off"
                  type="MaterialIcons"
                  onPress={() => setPassVisible(true)}
                />
              )
            }
          />

          <Pressable
            className="w-full flex justify-center items-center mt-5 p-2 rounded-lg md:rounded-2xl bg-blue-500"
            onPress={() => onSignIn()}
          >
            <Text className="text-white font-bold text-md md:text-xl">
              Sign In
            </Text>
          </Pressable>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPassword')}
          >
            <Text className="mt-3 text-sm md:text-lg text-center text-blue-600">
              Forgot password? Click here to reset!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
