import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const PDFFile = ({ filePath, fileName }) => {
  return (
    <View className="mt-2 md:mt-5">
      <TouchableOpacity
        className="flex flex-col w-30 h-auto items-center md:w-40 md:h-40"
        onPress={() => {}}
      >
        <Image
          className="h-10 w-10 md:h-16 md:w-16"
          source={require('../../assets/pdf.png')}
        ></Image>
        <Text className="w-28 ml-2 text-center text-xs md:w-36 md:text-base">
          {fileName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PDFFile;
