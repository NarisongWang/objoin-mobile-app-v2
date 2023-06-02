import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
} from 'react-native';
import Button from '../components/Button';
import ModalBox from '../components/ModalBox';
import * as FileSystem from 'expo-file-system';
import { StatusBar } from 'expo-status-bar';

const EditPhoto = ({ navigation, route }) => {
  const uri = route.params.uri;
  const [editName, setEditName] = useState(
    uri.replace(/^.*[\\\/]/, '').replace('.jpg', '')
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [modalMessage, setModalMessage] = useState('');
  const [pressAndGoBack, setPressAndGoBack] = useState(false);

  const onRename = async () => {
    const dir = uri.replace(uri.replace(/^.*[\\\/]/, ''), '');
    //check duplicated photo name
    if ((await FileSystem.getInfoAsync(dir + '/' + editName + '.jpg')).exists) {
      //show modal warning
      setModalMessage(
        'The photo name already exists, please change another name!'
      );
      setModalType(2);
      setIsModalVisible(true);
      return;
    }
    try {
      await FileSystem.copyAsync({
        from: uri,
        to: dir + '/' + editName + '.jpg',
      });
      await FileSystem.deleteAsync(uri);
      //show modal success and go back
      setModalMessage('The photo has been successfully renamed!');
      setPressAndGoBack(true);
      setModalType(1);
      setIsModalVisible(true);
    } catch (error) {
      //show modal error
      setModalMessage(error.message);
      setModalType(0);
      setIsModalVisible(true);
    }
  };

  const onDelete = () => {
    //show confirm dialog
    setModalMessage('Do you want to delete this photo?');
    setModalType(3);
    setIsModalVisible(true);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleConfirm = async () => {
    try {
      await FileSystem.deleteAsync(uri);
      //show modal success and go back
      setModalMessage('The photo has been successfully deleted!');
      setPressAndGoBack(true);
      setModalType(1);
      setIsModalVisible(true);
    } catch (error) {
      //show modal error
      setModalMessage(error.message);
      setModalType(0);
      setIsModalVisible(true);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <ModalBox
        isModalVisible={isModalVisible}
        modalMessage={modalMessage}
        modalType={modalType}
        setIsModalVisible={setIsModalVisible}
        pressAndGoBack={pressAndGoBack}
        onConfirm={handleConfirm}
        goBack={goBack}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="w-11/12 my-3 md:my-5"
      >
        <Image
          source={{ uri: `${uri}?v=${Math.floor(Math.random() * 10000)}` }}
          className="w-full h-full pb-10"
        />
      </ScrollView>
      {/* Text edit */}
      <View className="flex flex-row w-11/12 items-center justify-start">
        <Text className="font-bold text-sm md:text-xl md:mt-3">
          Photo Name:{' '}
        </Text>
        <TextInput
          className="flex-1 border-gray-300 text-blue-800 border-b md:border-b-2 ml-3 text-sm md:text-xl md:mt-3"
          value={editName}
          onChangeText={(newValue) => setEditName(newValue)}
        />
      </View>
      {/* Buttons */}
      <View className="flex flex-row items-center justify-between h-[70] md:h-[100] w-4/5">
        <Button
          title="RENAME"
          pressEvent={() => {
            onRename();
          }}
        />
        <Button
          title="DELETE"
          pressEvent={() => {
            onDelete();
          }}
        />
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default EditPhoto;
