import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Photo = ({ uri, navigation }) => {
  return (
    <View className="m-3">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditPhoto', { uri });
        }}
      >
        <Image
          source={{ uri: `${uri}?v=${Math.floor(Math.random() * 10000)}` }}
          className="w-[150] h-[200]"
        />
        <Text className="w-[150] text-center md:text-lg">
          {uri.replace(/^.*[\\\/]/, '')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Photo;
