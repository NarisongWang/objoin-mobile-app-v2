import React from 'react';
import { Text } from 'react-native';

const HeaderTitle = ({ title }) => {
  return <Text className="md:text-lg font-bold">{title}</Text>;
};

export default HeaderTitle;
