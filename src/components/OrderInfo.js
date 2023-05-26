import React from 'react';
import { View, Text } from 'react-native';
import { parseDate } from '../utils/utils';

const OrderInfo = ({ installationOrder }) => {
  return (
    <View className="flex flex-col items-center justify-between m-5 my-2 rounded-lg md:rounded-3xl">
      <View className="w-full flex-col items-left justify-center">
        <Text className="text-left text-xs text-blue-800 italic md:text-base">
          Customer :{' '}
        </Text>
        <Text className="text-left text-sm md:text-lg ml-3">
          {installationOrder.customer}
        </Text>
      </View>
      <View className="w-full flex-col items-left justify-center">
        <Text className="text-left text-xs text-blue-800 italic md:text-base">
          Ship Name :{' '}
        </Text>
        <Text className="text-left text-sm md:text-lg ml-3">
          {installationOrder.shipName}
        </Text>
      </View>
      <View className="w-full flex-col items-left justify-center">
        <Text className="text-left text-xs text-blue-800 italic md:text-base">
          Ship Address :{' '}
        </Text>
        <Text className="text-left text-sm md:text-lg ml-3">
          {installationOrder.shipAddress}
        </Text>
      </View>
      <View className="w-full flex-col items-left justify-center">
        <Text className="text-left text-xs text-blue-800 italic md:text-base">
          Entry Date :{' '}
        </Text>
        <Text className="text-left text-sm md:text-lg ml-3">
          {parseDate(installationOrder.entryDate)}
        </Text>
      </View>
      <View className="w-full flex-col items-left justify-center">
        <Text className="text-left text-xs text-blue-800 italic md:text-base">
          Due Date :{' '}
        </Text>
        <Text className="text-left text-sm md:text-lg ml-3">
          {parseDate(installationOrder.dueDate)}
        </Text>
      </View>
      <View className="w-full flex-col items-left justify-center">
        <Text className="text-left text-xs text-blue-800 italic md:text-base">
          Deliverer :{' '}
        </Text>
        <Text className="text-left text-sm md:text-lg ml-3">
          {installationOrder.deliverers
            ? installationOrder.deliverers[0].fullName
            : null}
        </Text>
      </View>
      <View className="w-full flex-col items-left justify-center">
        <Text className="text-left text-xs text-blue-800 italic md:text-base">
          Installer :{' '}
        </Text>
        <Text className="text-left text-sm md:text-lg ml-3">
          {installationOrder.installers
            ? installationOrder.installers[0].fullName
            : null}
        </Text>
      </View>
    </View>
  );
};

export default OrderInfo;
