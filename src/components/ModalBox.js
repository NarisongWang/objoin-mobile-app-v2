import React from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';

const ModalBox = ({
  isModalVisible,
  modalMessage,
  modalType,
  setIsModalVisible,
  isLoading,
  onConfirm,
}) => {
  return (
    <Modal isVisible={isModalVisible}>
      <View className="flex-1 items-center justify-center">
        {isLoading ? (
          <ActivityIndicator color="#3B82F6" size="large" />
        ) : (
          <View
            className={`w-[200] md:w-[300] ${
              modalType === 0
                ? 'bg-red-400'
                : modalType === 1
                ? 'bg-green-500'
                : modalType === 2
                ? 'bg-yellow-400'
                : 'bg-blue-400'
            } rounded-lg`}
          >
            {/* modalType options 
          0:error, 1:success, 2:warning, 3:dialog box */}
            {modalType === 0 ? (
              <View className="items-center justify-center m-5">
                <Entypo name="emoji-sad" size={35} color="rgb(255,255,255)" />
                <Text className="text-white mt-3 md:text-lg">Error</Text>
              </View>
            ) : modalType === 1 ? (
              <View className="items-center justify-center m-5">
                <Entypo name="emoji-happy" size={35} color="rgb(255,255,255)" />
                <Text className="text-white mt-3 md:text-lg">Success</Text>
              </View>
            ) : modalType === 2 ? (
              <View className="items-center justify-center m-5">
                <AntDesign name="warning" size={35} color="rgb(255,255,255)" />
                <Text className="text-white mt-3 md:text-lg">Warning</Text>
              </View>
            ) : (
              <View className="items-center justify-center m-5">
                <FontAwesome5
                  name="flag-checkered"
                  size={35}
                  color="rgb(255,255,255)"
                />
                <Text className="text-white mt-3 md:text-lg">Confirm</Text>
              </View>
            )}
            <View className="w-[200] md:w-[300] bg-white rounded-b-lg">
              <Text className="text-center text-xs p-2 md:text-base md:p-3">
                {modalMessage}
              </Text>
              {modalType === 3 ? (
                <View className="flex flex-row justify-between">
                  <Pressable onPress={onConfirm}>
                    <Text className="text-center w-[100] md:w-[150] text-blue-600 p-2 border-t border-r border-gray-300 text-base md:text-lg">
                      Yes
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setIsModalVisible(false);
                    }}
                  >
                    <Text className="text-center w-[100] md:w-[150] text-blue-600 p-2 border-t border-gray-300 text-base md:text-lg">
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={() => {
                    setIsModalVisible(false);
                  }}
                >
                  <Text className="text-center text-blue-600 p-2 border-t border-gray-300 text-base md:text-lg">
                    Close
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default ModalBox;
