import React from 'react';
import { Pressable, Text } from 'react-native';

const Button = ({ title, pressEvent, disabled }) => {
  return (
    <Pressable
      className={`w-[120] md:w-[200] flex justify-center items-center p-2 rounded-lg md:rounded-xl ${
        disabled ? 'bg-gray-300' : 'bg-blue-500'
      }`}
      onPress={() => {
        if (!disabled) pressEvent();
      }}
    >
      <Text className="text-white font-bold text-md md:text-xl">{title}</Text>
    </Pressable>
  );
};

export default Button;
