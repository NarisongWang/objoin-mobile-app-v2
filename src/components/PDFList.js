import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import PDFFile from './PDFFile';

const PDFList = ({ dirs, navigation }) => {
  return (
    <View className="flex mx-2 md:mx-3">
      {dirs.map((dir, index) => (
        <View key={index} className="my-2">
          <View>
            <Text className="text-blue-800 italic text-xs md:text-lg">
              File Directory - {dir.file_dir}
            </Text>
          </View>
          <ScrollView horizontal>
            {dir.files.map((file, index2) => (
              <PDFFile
                key={index2}
                filePath={dir.file_dir}
                fileName={file.file_name}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </View>
      ))}
    </View>
  );
};

export default PDFList;
