import { WORK_STATUS } from '@env';
import React from 'react';
import { View, Text } from 'react-native';
import { parseDate } from '../utils/utils';

const InstallationOrderItem = ({ installationOrder, select }) => {
  return (
    <View
      className={`flex flex-row items-center justify-start border-gray-100 border-b-2 ${
        select &&
        select.installationOrderNumber ===
          installationOrder.installationOrderNumber
          ? 'bg-blue-200'
          : ''
      }`}
    >
      <View className="flex justify-center items-center w-10 h-10">
        <View className="w-[20] h-[20] bg-gray-300 rounded-full flex justify-center items-center">
          <View className="w-[18] h-[18] bg-white rounded-full flex justify-center items-center">
            {select &&
            select.installationOrderNumber ===
              installationOrder.installationOrderNumber ? (
              <View className="w-[15] h-[15] bg-blue-300 rounded-full flex justify-center items-center"></View>
            ) : null}
          </View>
        </View>
      </View>
      <View className="p-4 w-56 text-sm font-normal flex-col items-center justify-center md:w-64">
        <Text className="text-base font-medium text-center w-56 md:text-xl md:64">
          {installationOrder.installationOrderNumber}
        </Text>
        {/*
        environment variable: WORK_STATUS
           Waitting for Setup:gray-500; 
           Waitting for Delivery:red-800
           Waitting for Installation:green-400 
           Installation in Progress:green-600
           Installation Completed:green-800
           Installation Order Closed:black */}
        <View
          className={`font-normal ${
            installationOrder.workStatus === 0
              ? 'bg-gray-500'
              : installationOrder.workStatus === 1
              ? 'bg-red-800'
              : installationOrder.workStatus === 2
              ? 'bg-green-400'
              : installationOrder.workStatus === 3
              ? 'bg-green-600'
              : installationOrder.workStatus === 4
              ? 'bg-green-800'
              : installationOrder.workStatus === 5
              ? 'bg-black'
              : ''
          } px-1 rounded-md text-white w-full`}
        >
          <Text className="text-center text-white text-xs md:text-base">
            {WORK_STATUS.split('|')[installationOrder.workStatus]}
          </Text>
        </View>
      </View>
      <Text className="p-3 text-xs font-medium text-center w-40 md:text-base md:w-60">
        {installationOrder.customer}
      </Text>
      <Text className="p-3 text-xs font-medium text-center w-40 md:text-base md:w-60">
        {installationOrder.shipName}
      </Text>
      <Text className="p-3 text-xs font-medium text-center w-40 md:text-base md:w-60">
        {installationOrder.shipAddress}
      </Text>
      <Text className="p-3 text-xs font-medium text-center w-30 md:text-base md:w-40">
        {parseDate(installationOrder.entryDate)}
      </Text>
      <Text className="p-3 text-xs font-medium text-center w-30 md:text-base md:w-40">
        {parseDate(installationOrder.dueDate)}
      </Text>
      <Text className="p-3 text-xs font-medium text-center w-20 md:text-base md:w-40">
        {installationOrder.deliverers[0].fullName}
      </Text>
      <Text className="p-3 text-xs font-medium text-center w-20 md:text-base md:w-40">
        {installationOrder.installers[0].fullName}
      </Text>
    </View>
  );
};

export default InstallationOrderItem;
