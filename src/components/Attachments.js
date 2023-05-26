import React from 'react';
import { View, Pressable, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Photo from './Photo';
import * as FileSystem from 'expo-file-system';

const Attachments = ({
  photos,
  installationOrderNumber,
  userType,
  navigation,
}) => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <View className="flex-row items-center justify-start">
      <Pressable
        className="w-10 h-10 m-3 md:w-20 md:h-20"
        onPress={() =>
          navigation.navigate('Camera', {
            installationOrderNumber: installationOrderNumber,
            userType: userType,
          })
        }
      >
        <MaterialIcons
          name="add-a-photo"
          size={windowWidth > 599 ? 46 : 36}
          color="#3b82f6"
        />
      </Pressable>
      <ScrollView className="m-2 h-[250] w-full" horizontal={true}>
        {photos.map((photo, index) => (
          <Photo
            key={index}
            uri={FileSystem.documentDirectory + photo}
            navigation={navigation}
          ></Photo>
        ))}
      </ScrollView>
    </View>
  );
};

export default Attachments;
