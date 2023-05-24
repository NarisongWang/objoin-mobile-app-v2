import React from 'react';
import { View, Text } from 'react-native';

const Home = ({ navigation, showDropdownMenu, setShowDropdownMenu }) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      {showDropdownMenu && (
        <View className="absolute top-0 right-0 w-40 h-[100] bg-slate-400"></View>
      )}
      <Text>This is temp home page.</Text>
    </View>
  );
};

export default Home;
