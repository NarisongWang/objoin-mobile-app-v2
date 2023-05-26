import React from 'react';
import { View, Text } from 'react-native';

const OrderTableHead = () => {
  return (
    <View className="flex flex-row items-center justify-start bg-blue-50">
      <Text className="w-10">{` `}</Text>
      <Text className="p-3 text-sm font-bold text-center w-56 md:text-lg md:w-64">
        Installation Order Number
      </Text>
      <Text className="p-3 text-sm font-bold text-center w-40 md:text-lg md:w-60">
        Customer
      </Text>
      <Text className="p-3 text-sm font-bold text-center w-40 md:text-lg md:w-60">
        Ship Name
      </Text>
      <Text className="p-3 text-sm font-bold text-center w-40 md:text-lg md:w-60">
        Ship Address
      </Text>
      <Text className="p-3 text-sm font-bold text-center w-30 md:text-lg md:w-40">
        Entry Date
      </Text>
      <Text className="p-3 text-sm font-bold text-center w-30 md:text-lg md:w-40">
        Due Date
      </Text>
      <Text className="p-3 text-sm font-bold text-center w-20 md:text-lg md:w-40">
        Deliverer
      </Text>
      <Text className="p-3 text-sm font-bold text-center w-20 md:text-lg md:w-40">
        Installer
      </Text>
    </View>
  );
};

export default OrderTableHead;
