import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import Button from '../components/Button';
import * as FileSystem from 'expo-file-system';
import { StatusBar } from 'expo-status-bar';

const EditPhoto = ({ navigation, route }) => {
  const uri = route.params.uri;
  const [editName, setEditName] = useState(
    uri.replace(/^.*[\\\/]/, '').replace('.jpg', '')
  );

  const onRename = async () => {
    const dir = uri.replace(uri.replace(/^.*[\\\/]/, ''), '');
    //check duplicated photo name
    if ((await FileSystem.getInfoAsync(dir + '/' + editName + '.jpg')).exists) {
      alert('The photo name already exists, please change another name!');
      return;
    }
    await FileSystem.copyAsync({
      from: uri,
      to: dir + '/' + editName + '.jpg',
    });
    await FileSystem.deleteAsync(uri);
    alert('Successfully renamed!');
    navigation.goBack();
  };

  const onDelete = () => {
    Alert.alert('Delete this photo?', '', [
      {
        text: 'Delete',
        onPress: async () => {
          await FileSystem.deleteAsync(uri);
          alert('Successfully deleted!');
          navigation.goBack();
        },
      },
      { text: 'Cancel' },
    ]);
  };
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
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
