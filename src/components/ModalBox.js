import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { Entypo } from '@expo/vector-icons';

const ModalBox = ({
  isModalVisible,
  modalMessage,
  isError,
  setIsModalVisible,
}) => {
  return (
    <Modal isVisible={isModalVisible}>
      <View className="flex-1 items-center justify-center">
        <View
          className={`w-[200] md:w-[300] ${
            isError ? 'bg-red-400' : 'bg-green-500'
          } rounded-lg`}
        >
          {isError ? (
            <View className="items-center justify-center m-5">
              <Entypo name="emoji-sad" size={35} color="rgb(255,255,255)" />
              <Text className="text-white mt-3 md:text-lg">
                There is an error.
              </Text>
            </View>
          ) : (
            <View className="items-center justify-center m-5">
              <Entypo name="emoji-happy" size={35} color="rgb(255,255,255)" />
              <Text className="text-white mt-3 md:text-lg">Success!</Text>
            </View>
          )}
          <View className="w-[200] md:w-[300] bg-white rounded-b-lg">
            <Text className="text-center text-xs p-2 md:text-base md:p-3">
              {modalMessage}
            </Text>
            <Pressable onPress={() => setIsModalVisible(false)}>
              <Text className="text-center text-blue-600 p-2 border-t border-gray-300 text-base md:text-lg">
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalBox;
