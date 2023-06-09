import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import {
  LayoutAnimation,
  UIManager,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';
import {
  getInstallationOrder1,
  submitOrder,
} from '../features/installationOrder/installationOrderSlice';
import Spinner from '../components/Spinner';
import FoldBar from '../components/FoldBar';
import OrderInfo from '../components/OrderInfo';
import Button from '../components/Button';
import Attachments from '../components/Attachments';
import ModalBox from '../components/ModalBox';
import * as FileSystem from 'expo-file-system';
import { StatusBar } from 'expo-status-bar';

UIManager.setLayoutAnimationEnabledExperimental(true);

const OrderDetail1 = ({ navigation, route }) => {
  const installationOrderId = route.params.installationOrderId;
  const installationOrderNumber = route.params.installationOrderNumber;
  const { installationOrder, isLoading, error } = useSelector(
    (state) => state.installationOrder
  );

  // folding bar status
  const [showOrderInfo, setShowOrderInfo] = useState(true);
  const [showAttachments, setShowAttachments] = useState(true);
  const [showComments, setShowComments] = useState(true);

  // required submit conditions
  const [attachementsFullfilled, setAttachmentsFullfilled] = useState(false);

  // comment
  const [noteInput, setNoteInput] = useState('');

  // photo list
  const [photos, setPhotos] = useState([]);

  //modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [modalMessage, setModalMessage] = useState('');
  const [pressAndGoBack, setPressAndGoBack] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // initialize order detail screen
  useEffect(() => {
    dispatch(getInstallationOrder1(installationOrderId));
    loadPhotos();
  }, []);

  // handle error
  useEffect(() => {
    if (error !== '') {
      //show modal error
      setModalMessage(error.message);
      setModalType(0);
      setIsModalVisible(true);
    }
  }, [error]);

  // refresh photos when user turn back from Camera or EditPhoto screen
  useEffect(() => {
    loadPhotos();
  }, [isFocused]);

  const loadPhotos = () => {
    //photos0 for delivery user
    const dirUri = `${FileSystem.documentDirectory}${installationOrderNumber}/photos0`;
    FileSystem.getInfoAsync(dirUri).then((fileInfo) => {
      if (fileInfo.isDirectory) {
        FileSystem.readDirectoryAsync(dirUri).then((localPhotos) => {
          localPhotos.sort();
          let newPhotos = [];
          localPhotos.forEach((localPhoto) => {
            newPhotos.push(`${installationOrderNumber}/photos0/${localPhoto}`);
          });
          setPhotos(newPhotos);
          if (newPhotos.length > 0) {
            setAttachmentsFullfilled(true);
          } else {
            setAttachmentsFullfilled(false);
          }
        });
      }
    });
  };

  // submit delivery work
  const onSubmit = () => {
    if (photos.length === 0) {
      //show modal warning
      setModalMessage('Please take at least 1 photo for your installation.');
      setModalType(2);
      setIsModalVisible(true);
      return;
    }

    //show confirm dialog
    setModalMessage('Do you want to submit this work?');
    setModalType(3);
    setIsModalVisible(true);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleConfirm = async () => {
    const newTimeFrame = {
      workStatus: installationOrder.workStatus + 1,
      time: new Date(),
    };
    const timeFrames = [...installationOrder.timeFrames, newTimeFrame];
    const update = {
      workStatus: installationOrder.workStatus + 1,
      timeFrames: timeFrames,
      photos0: photos,
      deliveryComment: noteInput,
    };
    const orderInfo = {
      installationOrderId: installationOrder._id,
      installationOrderNumber: installationOrder.installationOrderNumber,
      userType: 0,
      update: update,
    };
    dispatch(submitOrder(orderInfo))
      .unwrap()
      .then(() => {
        //show modal success and go back
        setModalMessage(
          'You have successfully submitted the delivery task! Thank you!!'
        );
        setPressAndGoBack(true);
        setModalType(1);
        setIsModalVisible(true);
      })
      .catch((error) => {
        //show modal error
        setModalMessage(error.message);
        setModalType(0);
        setIsModalVisible(true);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      {/* Modal box */}
      <ModalBox
        isModalVisible={isModalVisible}
        modalMessage={modalMessage}
        modalType={modalType}
        setIsModalVisible={setIsModalVisible}
        pressAndGoBack={pressAndGoBack}
        onConfirm={handleConfirm}
        goBack={goBack}
      />
      {/* Order Details */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="w-11/12 bg-slate-50 my-3 md:my-5 rounded-lg border-gray-200 border md:rounded-3xl"
      >
        {/* Order screen title */}
        <View className="border-gray-200 border-b-2 py-2 md:py-5">
          <Text className="text-center text-gray-700 text-base md:text-xl font-bold">
            {installationOrder.installationOrderNumber} -{' Delivery'}
          </Text>
        </View>
        {/* Oreder info */}
        <View className="border border-blue-100 rounded-lg mx-3 mt-3 md:border-2 md:mx-5 md:mt-5">
          <FoldBar
            title="Order Info"
            state={showOrderInfo}
            setState={setShowOrderInfo}
            LayoutAnimation={LayoutAnimation}
          />
          {showOrderInfo && <OrderInfo installationOrder={installationOrder} />}
        </View>
        {/* Attachements */}
        <View className="border border-blue-100 rounded-lg mx-3 mt-3 md:border-2 md:mx-5 md:mt-5">
          <FoldBar
            title="Attachments"
            state={showAttachments}
            setState={setShowAttachments}
            required={true}
            fullfilled={attachementsFullfilled}
            slideable={true}
            LayoutAnimation={LayoutAnimation}
          />
          {showAttachments && (
            <Attachments
              photos={photos}
              installationOrderNumber={installationOrderNumber}
              userType={0}
              navigation={navigation}
            />
          )}
        </View>
        {/* Comment */}
        <View className="border border-blue-100 rounded-lg mx-3 my-3 md:border-2 md:mx-5 md:my-5">
          <FoldBar
            title="Comment"
            state={showComments}
            setState={setShowComments}
            LayoutAnimation={LayoutAnimation}
          />
          {showComments && (
            <TextInput
              className="border border-blue-100 m-2 md:border-2"
              value={noteInput}
              multiline={true}
              numberOfLines={4}
              onChangeText={(newValue) => {
                setNoteInput(newValue);
              }}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
            />
          )}
        </View>
      </ScrollView>
      {/* Buttons */}
      <View className="flex flex-row items-center justify-between h-[70] md:h-[100] w-4/5">
        <Button
          title="TIMEOUT"
          pressEvent={() => {
            navigation.goBack();
          }}
        />
        <Button
          title="COMPLETE"
          pressEvent={() => {
            onSubmit();
          }}
          disabled={attachementsFullfilled ? false : true}
        />
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default OrderDetail1;
