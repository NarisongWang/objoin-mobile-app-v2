import React from 'react';
import { Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HeaderRightButton = ({ user }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      className="h-10 w-10 md:h-12 md:w-12 md:my-2"
      onPress={() => {
        navigation.toggleDrawer();
      }}
    >
      <Image
        className="w-10 h-10 md:h-12 md:w-12 rounded-full"
        source={
          user.photoURL
            ? { uri: user.photoURL }
            : require('../../assets/default-profile.jpg')
        }
      ></Image>
    </Pressable>
  );
};

export default HeaderRightButton;
