import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Attachments from '../components/Attachments';

const Component1 = ({ state1 }) => {
  useEffect(() => {
    console.log('Component1 rerendered');
  }, []);
  console.log('---Component1 rerendered');
  return <Text>{state1}</Text>;
};

const Component2 = ({ state2 }) => {
  useEffect(() => {
    console.log('Component2 rerendered');
  }, []);
  console.log('---Component1 rerendered');
  return <Text>{state2}</Text>;
};

const EditProfile = () => {
  const [state1, setState1] = useState('state1');
  const [state2, setState2] = useState('state2');
  const [photos, setPhotos] = useState([
    'S2211051/photos0/last.jpg',
    'S2211051/photos0/onemore.jpg',
    'S2211051/photos0/photo1.jpg',
  ]);
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Component1 state1={state1} />
      <Component2 state2={state2} />
      <View className="border border-blue-100 rounded-lg mx-3 mt-3 md:border-2 md:mx-5 md:mt-5">
        <Attachments photos={photos} />
      </View>

      <Button
        onPress={() => {
          setState1('new state1');
        }}
        title="Change State 1"
      />
      <Button
        onPress={() => {
          setState2('new state2');
        }}
        title="Change State 2"
      />
    </View>
  );
};

export default EditProfile;
