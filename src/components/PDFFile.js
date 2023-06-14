import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const PDFFile = ({ filePath, fileName, navigation }) => {
  return (
    <View className="my-2">
      <TouchableOpacity
        className="flex flex-col w-22 md:w-30 h-auto items-center"
        onPress={() => {
          navigation.navigate('PDF', {
            filePath,
            fileName,
          });
        }}
      >
        <Image
          className="h-10 w-10 md:h-14 md:w-14"
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
