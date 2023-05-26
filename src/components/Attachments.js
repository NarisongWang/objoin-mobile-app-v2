import React from 'react';
import { View, Pressable, ScrollView, Text, Dimensions } from 'react-native';
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
    <View className="flex-col items-center justify-start">
      <View className="flex-row items-start justify-start">
        <Pressable
          className="w-10 h-10 my-2 ml-2 md:w-20 md:h-20"
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
        <ScrollView className="mr-2 h-[250] w-full" horizontal={true}>
          {photos.map((photo, index) => (
            <Photo
              key={index}
              uri={FileSystem.documentDirectory + photo}
              navigation={navigation}
            ></Photo>
          ))}
        </ScrollView>
      </View>
      {/* Notice message */}
      {photos.length > 0 ? (
        <Text className="text-red-600 italic text-xs mb-2 md:text-lg">
          * Click on photo to rename or delete.
        </Text>
      ) : null}
    </View>
  );
};

export default Attachments;
