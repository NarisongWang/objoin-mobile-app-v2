import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Pressable,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
import { auth } from '../../firebaseConfig';
import {
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import ModalBox from '../components/ModalBox';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

const ManageAccount = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;

  const user = auth.currentUser;
  const [isLoading, setIsLoading] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false);
  const [showChangePassForm, setShowChangePassForm] = useState(false);

  const [dispName, setDispName] = useState(user ? user.displayName : '');
  const [photo, setPhoto] = useState(user ? user.photoURL : '');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [modalMessage, setModalMessage] = useState('');

  const onUpdate = () => {
    setIsLoading(true);
    updateProfile(user, {
      displayName: dispName,
      photoURL: photo,
    })
      .then(() => {
        setIsLoading(false);
        setShowEditForm(false);
        //show modal success
        setModalMessage('You have successfully updated your profile.');
        setModalType(1);
        setIsModalVisible(true);
      })
      .catch((error) => {
        setIsLoading(false);
        setShowEditForm(false);
        //show modal error
        setModalMessage(error.message);
        setModalType(0);
        setIsModalVisible(true);
      });
  };

  const onChangePass = () => {
    setIsLoading(true);
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword).then(() => {
          setIsLoading(false);
          setShowChangePassForm(false);
          //show modal success
          setModalMessage('You have successfully updated your password.');
          setModalType(1);
          setIsModalVisible(true);
        });
      })
      .catch((error) => {
        setIsLoading(false);
        //show modal error
        setModalMessage(error.message);
        setModalType(0);
        setIsModalVisible(true);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <ModalBox
        isModalVisible={isModalVisible}
        modalMessage={modalMessage}
        modalType={modalType}
        setIsModalVisible={setIsModalVisible}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="w-11/12 my-3 md:my-5 rounded-lg border-gray-200 border md:rounded-3xl"
      >
        {/*Profile Info */}
        <View className="flex items-center justify-center">
          <View className="flex flex-col items-center justify-center mt-5 bg-gray-100 rounded-lg w-11/12">
            <Image
              source={
                user.photoURL
                  ? { uri: user.photoURL }
                  : require('../../assets/default-profile.jpg')
              }
              className="w-24 h-24 rounded-full mt-5"
            ></Image>
            <View>
              <Text className="text-sm md:text-lg m-3">
                Email: {user.email}
              </Text>
              <Text className="text-sm md:text-lg m-3 pb-5">
                Display Name: {user.displayName}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col items-center justify-center">
          <Pressable
            className="w-11/12 flex flex-row justify-between items-center mt-5 p-2 rounded-lg bg-gray-100"
            onPress={() => {
              setShowEditForm(true);
            }}
          >
            <Text className="text-gray-600 font-bold text-md md:text-lg ml-2">
              Edit Profile
            </Text>
            <View className="mr-2">
              <FontAwesome5
                name="arrow-right"
                size={15}
                color="rgb(55,65,81)"
              />
            </View>
          </Pressable>
          <Pressable
            className="w-11/12 flex flex-row justify-between items-center mt-5 p-2 rounded-lg bg-gray-100"
            onPress={() => {
              setShowChangePassForm(true);
            }}
          >
            <Text className="text-gray-600 font-bold text-md md:text-lg ml-2">
              Change Password
            </Text>
            <View className="mr-2">
              <FontAwesome5
                name="arrow-right"
                size={15}
                color="rgb(55,65,81)"
              />
            </View>
          </Pressable>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
      {showEditForm && (
        <View className="w-full h-full justify-center items-center">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className="w-full"
          >
            {/* Edit Profile Form */}
            <View className="mx-5 justify-center">
              <View className="flex flex-row items-center justify-between pb-2 border-b">
                <Text className="text-lg md:text-2xl pb-1 text-black">
                  Edit Profile
                </Text>
                <Pressable
                  className="flex items-center justify-center"
                  onPress={() => setShowEditForm(false)}
                >
                  <AntDesign
                    name="close"
                    size={windowWidth > 599 ? 24 : 16}
                    color="rgb(55,65,81)"
                  />
                </Pressable>
              </View>
              <View className="p-4">
                <View className="mb-4">
                  <Text className="block text-gray-700 mb-2">Display Name</Text>
                  <TextInput
                    className="w-full border border-gray-400 md:p-2 rounded-md"
                    value={dispName}
                    onChangeText={(newValue) => setDispName(newValue)}
                  />
                </View>
                <View className="mb-4">
                  <Text className="block text-gray-700 mb-2">Photo URL</Text>
                  <TextInput
                    className="w-full border border-gray-400 md:p-2 rounded-md"
                    value={photo}
                    onChangeText={(newValue) => setPhoto(newValue)}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="flex flex-row items-center justify-center mb-10 h-[70] md:h-[100] w-4/5">
            <Button
              title={'Save'}
              pressEvent={() => {
                onUpdate();
              }}
            ></Button>
          </View>
        </View>
      )}
      {showChangePassForm && (
        <View className="w-full h-full justify-center items-center">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className="w-full"
          >
            {/* Change Password Form */}
            <View className="mx-5 justify-center">
              <View className="flex flex-row items-center justify-between pb-2 border-b">
                <Text className="text-lg md:text-2xl pb-1 text-black">
                  Change Password
                </Text>
                <Pressable
                  className="flex items-center justify-center"
                  onPress={() => setShowChangePassForm(false)}
                >
                  <AntDesign
                    name="close"
                    size={windowWidth > 599 ? 24 : 16}
                    color="rgb(55,65,81)"
                  />
                </Pressable>
              </View>
              <View className="p-4">
                <View className="mb-4">
                  <View className="flex-row">
                    <Text className="block text-gray-700 mb-2">Type your </Text>
                    <Text className="block text-red-600 mb-2">current </Text>
                    <Text className="block text-gray-700 mb-2">password</Text>
                  </View>
                  <TextInput
                    secureTextEntry={true}
                    className="w-full border border-gray-400 md:p-2 rounded-md"
                    value={oldPassword}
                    onChangeText={(newValue) => setOldPassword(newValue)}
                  />
                </View>
                <View className="mb-4">
                  <View className="flex-row">
                    <Text className="block text-gray-700 mb-2">Type your </Text>
                    <Text className="block text-red-600 mb-2">new </Text>
                    <Text className="block text-gray-700 mb-2">password</Text>
                  </View>
                  <TextInput
                    secureTextEntry={true}
                    className="w-full border border-gray-400 md:p-2 rounded-md"
                    value={newPassword}
                    onChangeText={(newValue) => setNewPassword(newValue)}
                  />
                </View>
                <View className="mb-4">
                  <View className="flex-row">
                    <Text className="block text-gray-700 mb-2">
                      Retype your{' '}
                    </Text>
                    <Text className="block text-red-600 mb-2">new </Text>
                    <Text className="block text-gray-700 mb-2">password</Text>
                  </View>
                  <TextInput
                    secureTextEntry={true}
                    className="w-full border border-gray-400 md:p-2 rounded-md"
                    value={newPassword2}
                    onChangeText={(newValue) => setNewPassword2(newValue)}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="flex flex-row items-center justify-center mb-10 h-[70] md:h-[100] w-4/5">
            <Pressable
              className={`w-[150] md:w-[200] flex justify-center items-center p-2 rounded-lg md:rounded-xl ${
                oldPassword !== '' &&
                newPassword !== '' &&
                newPassword === newPassword2
                  ? 'bg-blue-500'
                  : 'bg-gray-300'
              }`}
              onPress={() => {
                if (
                  oldPassword !== '' &&
                  newPassword !== '' &&
                  newPassword === newPassword2
                ) {
                  onChangePass();
                }
              }}
            >
              <Text className="text-white font-bold text-md md:text-xl">
                Change Password
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ManageAccount;
