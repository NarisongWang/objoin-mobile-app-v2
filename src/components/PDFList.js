import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import PDFFile from './PDFFile';

const PDFList = ({ dirs }) => {
  return (
    <View className="flex flex-col items-start justify-between m-5 my-2 rounded-lg md:rounded-3xl">
      {dirs.map((dir, index) => (
        <View key={index} className="h-28 md:h-48">
          <View>
            <Text className="text-blue-800 italic text-xs md:text-lg">
              File Directory - {dir.file_dir}
            </Text>
          </View>
          <ScrollView horizontal>
            {dir.files.map((file, index2) => (
              <PDFFile key={index2} filePath={dir} fileName={file.file_name} />
            ))}
          </ScrollView>
        </View>
      ))}
    </View>
  );
};

export default PDFList;
