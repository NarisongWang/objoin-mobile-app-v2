import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import CheckBox from './CheckBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InstallationItems = ({
  installationOrderNumber,
  installationItems,
  setInstallationItemsFullfilled,
}) => {
  const [checkState, setCheckState] = useState([]);
  //componentDidMount
  useEffect(() => {
    const loadStateFromAsyncStorage = async () => {
      const storedState = JSON.parse(
        await AsyncStorage.getItem(installationOrderNumber)
      );
      const initialState =
        storedState && storedState.length > 0
          ? storedState
          : Array(installationItems.length).fill(false);
      setCheckState(initialState);
    };
    loadStateFromAsyncStorage();
  }, []);

  //componentWillUnmount
  useEffect(() => {
    return () => {
      AsyncStorage.setItem(
        installationOrderNumber,
        JSON.stringify(checkState)
      ).catch((error) => {
        console.log('Error saving check state:', error);
      });
    };
  }, [checkState]);

  const onCheck = (index) => {
    const newCheck = [...checkState];
    newCheck[index] = !newCheck[index];
    setCheckState(newCheck);
  };
  useEffect(() => {
    if (checkState.length > 0) {
      for (const state of checkState) {
        if (!state) {
          setInstallationItemsFullfilled(false);
          return;
        }
      }
      setInstallationItemsFullfilled(true);
    }
  }, [checkState]);

  return (
    <View>
      {installationItems.map((item, index) => {
        return (
          <CheckBox
            key={index}
            title={item}
            checked={checkState[index]}
            onCheck={onCheck}
            index={index}
          ></CheckBox>
        );
      })}
    </View>
  );
};

export default InstallationItems;
