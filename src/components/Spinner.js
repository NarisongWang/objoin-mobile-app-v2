import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator color="#3B82F6" size="large" />
    </View>
  );
};

export default Spinner;
