import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import CheckBox from './CheckBox';

const CheckListItem = ({ checkItem, handleChange, disabled }) => {
  const [check1, setCheck1] = useState(checkItem.status === 1 ? true : false);
  const [check2, setCheck2] = useState(checkItem.status === 2 ? true : false);
  const [check3, setCheck3] = useState(checkItem.status === 3 ? true : false);
  const [noteInput, setNoteInput] = useState(checkItem.note);

  useEffect(() => {
    changeInput();
  }, [noteInput]);

  const setCheck = (i) => {
    setCheck1(false);
    setCheck2(false);
    setCheck3(false);
    switch (i) {
      case 1:
        setCheck1(true);
        break;
      case 2:
        setCheck2(true);
        break;
      case 3:
        setCheck3(true);
        break;
      default:
        break;
    }
    const checkStatus = i;
    handleChange(
      {
        title: checkItem.title,
        index: checkItem.index,
        status: checkStatus,
        note: noteInput,
      },
      checkItem.index
    );
  };

  const changeInput = () => {
    let checkStatus = 0;
    if (check1) checkStatus = 1;
    if (check2) checkStatus = 2;
    if (check3) checkStatus = 3;
    handleChange(
      {
        title: checkItem.title,
        index: checkItem.index,
        status: checkStatus,
        note: noteInput,
      },
      checkItem.index
    );
  };

  return checkItem.title !== 'Other notes' ? (
    <View className="flex-row border-b border-gray-300 py-1">
      {/* Check Item Title */}
      <View className=" items-start justify-center ml-3 my-1 w-[100] md:w-[200]">
        <Text className="text-xxs md:text-sm">
          {checkItem.index} - {checkItem.title}
        </Text>
      </View>
      {/* Check boxes */}
      <View className="flex-row items-center mx-3">
        <CheckBox
          title="YES"
          checked={check1}
          onCheck={() => {
            if (!disabled) {
              setCheck(1);
            }
          }}
        ></CheckBox>
        <CheckBox
          title="NO"
          checked={check2}
          onCheck={() => {
            if (!disabled) {
              setCheck(2);
            }
          }}
        ></CheckBox>
        <CheckBox
          title="N/A"
          checked={check3}
          onCheck={() => {
            if (!disabled) {
              setCheck(3);
            }
          }}
        ></CheckBox>
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
          className="border border-gray-300 m-2 md:border-2 w-full mr-2"
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
};

export default CheckListItem;
