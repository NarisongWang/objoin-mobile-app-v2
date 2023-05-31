import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

const CheckBox = ({ title, checked, onCheck, index }) => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <TouchableOpacity onPress={() => onCheck(index)}>
      <View className="flex flex-row justify-start items-center mx-3 my-1 md:mx-5 md:my-2">
        <View className="w-[22] h-[22] md:w-[28] md:h-[28] bg-gray-300 rounded-full flex justify-center items-center">
          <View className="w-[20] h-[20] md:w-[26] md:h-[26] bg-white rounded-full flex justify-center items-center">
            {checked ? (
              <Feather
                name="check-circle"
                size={windowWidth > 599 ? 22 : 16}
                color="green"
              />
            ) : null}
          </View>
        </View>
        <Text
          className={`text-xs md:text-base ml-2 md:ml-3 ${
            checked ? 'text-blue-700 font-bold' : 'text-gray-500'
          }`}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CheckBox;
