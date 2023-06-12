import React, { useState, useEffect, useImperativeHandle } from 'react';
import { View, Text, TextInput } from 'react-native';
import Radio from './Radio';

const CheckListItem = React.forwardRef(({ checkItem, disabled }, ref) => {
  const [noteInput, setNoteInput] = useState(checkItem.note);
  const [item, setItem] = useState(checkItem);
  useImperativeHandle(
    ref,
    () => ({
      getCheckItem: () => {
        return item;
      },
    }),
    [item]
  );

  useEffect(() => {
    const newItem = {
      title: item.title,
      index: item.index,
      status: item.status,
      note: noteInput,
    };
    setItem(newItem);
  }, [noteInput]);

  const handleChange = (status) => {
    const newItem = {
      title: item.title,
      index: item.index,
      status: status,
      note: noteInput,
    };
    setItem(newItem);
  };

  return item.title !== 'Other notes' ? (
    <View className="flex-row border-b border-gray-300 py-1">
      {/* Check Item Title */}
      <View className="flex-row items-center ml-3 my-1 w-[100] md:w-[200]">
        <Text
          className={`text-xxs md:text-sm ${
            item.status === 0 ? 'text-red-500' : 'text-green-600'
          }  mr-2`}
        >
          *
        </Text>
        <Text className="text-xxs md:text-sm">
          {item.index} - {item.title}
        </Text>
      </View>
      {/* Check boxes */}
      <View className="flex-row items-center mx-3">
        <Radio
          title="YES"
          checked={item.status === 1 ? true : false}
          onCheck={() => {
            if (!disabled) {
              handleChange(1);
            }
          }}
        ></Radio>
        <Radio
          title="NO"
          checked={item.status === 2 ? true : false}
          onCheck={() => {
            if (!disabled) {
              handleChange(2);
            }
          }}
        ></Radio>
        <Radio
          title="N/A"
          checked={item.status === 3 ? true : false}
          onCheck={() => {
            if (!disabled) {
              handleChange(3);
            }
          }}
        ></Radio>
      </View>
      {/* Text Notes */}
      <View className="flex-1 items-start justify-center mr-2">
        <TextInput
          className="flex w-full border-gray-300 border-b text-xs md:text-sm"
          value={noteInput}
          onChangeText={(newValue) => {
            setNoteInput(newValue);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!disabled}
          selectTextOnFocus={!disabled}
        />
      </View>
    </View>
  ) : (
    <View className="flex-row mb-2">
      <View className=" items-start justify-center ml-3 my-1 w-[80] md:w-[100]">
        <Text className="text-xxs md:text-sm">
          {checkItem.index} - {checkItem.title}
        </Text>
      </View>
      <View className="flex-1 items-start justify-center pr-5">
        <TextInput
          className="border p-2 border-gray-300 m-2 md:border-2 w-full mr-2"
          value={noteInput}
          multiline={true}
          numberOfLines={4}
          onChangeText={(newValue) => {
            setNoteInput(newValue);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          editable={!disabled}
          selectTextOnFocus={!disabled}
        />
      </View>
    </View>
  );
});

export default CheckListItem;
