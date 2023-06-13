import React from 'react';
import { Pressable, View, Text, Dimensions } from 'react-native';
import {
  Entypo,
  MaterialIcons,
  Foundation,
  AntDesign,
} from '@expo/vector-icons';

const FoldBar = ({
  title,
  state,
  setState,
  required,
  fullfilled,
  slideable,
  LayoutAnimation,
}) => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <Pressable
      className="flex-row items-center justify-between rounded-lg bg-slate-200 h-9 md:h-12 m-1"
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setState(!state);
      }}
    >
      <View className="flex-row items-center">
        <Text className="text-sm md:text-xl font-bold text-gray-700 ml-3">
          {title}
        </Text>
        {required && (
          <Text className="text-base md:text-2xl font-bold text-red-600 ml-2 mt-1">
            *
          </Text>
        )}
        {slideable && (
          <View className="ml-2">
            <MaterialIcons
              name="swipe"
              size={windowWidth > 599 ? 24 : 18}
              color="#68adde"
            />
          </View>
        )}
      </View>
      <View className="flex flex-row mr-3 items-center justify-center">
        {required && !fullfilled && (
          <View className="mr-3">
            <Foundation
              name="alert"
              size={windowWidth > 599 ? 22 : 16}
              color="orange"
            />
          </View>
        )}
        {required && fullfilled && (
          <View className="mr-3">
            <AntDesign
              name="checkcircle"
              size={windowWidth > 599 ? 22 : 16}
              color="green"
            />
          </View>
        )}
        {state ? (
          <Entypo name="chevron-thin-up" size={15} color="rgb(55,65,81)" />
        ) : (
          <Entypo name="chevron-thin-down" size={15} color="rgb(55,65,81)" />
        )}
      </View>
    </Pressable>
  );
};

export default FoldBar;
