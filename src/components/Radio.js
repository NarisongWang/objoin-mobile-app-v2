import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Radio = ({ title, checked, onCheck }) => {
  return (
    <TouchableOpacity onPress={onCheck}>
      <View className="flex flex-row justify-center items-center w-8 h-8 mx-1 md:mx-2">
        <View className="w-[15] h-[15] bg-gray-300 rounded-full flex justify-center items-center">
          <View className="w-[13] h-[13] bg-white rounded-full flex justify-center items-center">
            {checked ? (
              <View className="w-[10] h-[10] bg-blue-300 rounded-full flex justify-center items-center"></View>
            ) : null}
          </View>
        </View>
        <Text
          className={`text-xxs md:text-xs ml-1 md:ml-1 ${
            checked ? 'text-blue-700 font-bold' : 'text-gray-500'
          }`}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Radio;
