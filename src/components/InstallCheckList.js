import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const InstallCheckList = ({ navigation, installationOrder }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CheckList', {
          installationOrder: installationOrder,
        })
      }
    >
      <Text className="font-bold italic text-sm md:text-lg my-3 mx-5 text-blue-600">
        KITCHEN INSTALL CHECKLIST
      </Text>
    </TouchableOpacity>
  );
};

export default InstallCheckList;
