import { Camera } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Button, Input } from '@rneui/themed';
import * as FileSystem from 'expo-file-system';

const CameraScreen = ({ navigation, route }) => {
  const installationOrderNumber = route.params.installationOrderNumber;
  const userType = route.params.userType;
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();
  const [photoName, setPhotoName] = useState('');

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      autoFocus: true,
      base64: true,
      exif: false,
      skipProcessing: true,
    };
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let savePhoto = async () => {
      if (photoName === '') {
        alert('Please enter a photo name first!');
        return;
      }
      //check work order directory
      const workUri = `${FileSystem.documentDirectory}${installationOrderNumber}`;
      if (!(await FileSystem.getInfoAsync(workUri)).isDirectory) {
        await FileSystem.makeDirectoryAsync(workUri, { intermediates: true });
      }
      //check sub-directory
      const dirUri = `${FileSystem.documentDirectory}${installationOrderNumber}/photos${userType}`;
      if (!(await FileSystem.getInfoAsync(dirUri)).isDirectory) {
        await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
      }
      //check duplicated photo name
      if (
        (
          await FileSystem.getInfoAsync(
            dirUri + '/' + photoName.trim() + '.jpg'
          )
        ).exists
      ) {
        alert('The photo name already exists, please change another name!');
        return;
      }

      try {
        await FileSystem.writeAsStringAsync(
          `${dirUri}/${photoName.trim()}.jpg`,
          photo.base64,
          { encoding: FileSystem.EncodingType.Base64 }
        );
        alert(`${photoName.trim()}.jpg has been successfully saved!`);
      } catch (error) {
        alert('Error: ' + error);
      }
      setPhotoName('');
      setPhoto(undefined);
    };
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Image
          style={cameraStyles.preview}
          source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
        ></Image>
        <View className="flex flex-row items-center justify-between h-[100] mx-2">
          <View className="w-2/5">
            <Input
              label="Photo name"
              value={photoName}
              onChangeText={(newValue) => setPhotoName(newValue)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <Pressable
            className="w-1/5 flex justify-center items-center py-2 md:py-1 px-2 rounded-lg md:rounded-2xl bg-blue-500"
            onPress={() => setPhoto(undefined)}
          >
            <Text className="text-white font-bold text-xs md:text-xl">
              Discard
            </Text>
          </Pressable>
          <Pressable
            className="w-1/5 flex justify-center items-center mr-5 py-2 md:py-1 px-2 rounded-lg md:rounded-2xl bg-blue-500"
            onPress={() => savePhoto()}
          >
            <Text className="text-white font-bold text-xs md:text-xl">
              Save
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Camera className="flex-1" ref={cameraRef}></Camera>

      <View className="bg-black p-3 w-full flex items-center justify-center border-t border-white">
        <TouchableOpacity onPress={takePic}>
          <View className="flex justify-center items-center">
            <View className="w-[40] h-[40] bg-white rounded-full flex justify-center items-center md:w-[80] md:h-[80]">
              <View className="w-[38] h-[38] bg-black rounded-full flex justify-center items-center md:w-[76] md:h-[76]">
                <View className="w-[36] h-[36] bg-white rounded-full flex justify-center items-center md:w-[72] md:h-[72]"></View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CameraScreen;

const cameraStyles = StyleSheet.create({
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
});
