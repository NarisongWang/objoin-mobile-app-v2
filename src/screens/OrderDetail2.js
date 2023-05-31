import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView, ScrollView, View, Text, Alert } from 'react-native';
import {
  getInstallationOrder2,
  submitOrder,
} from '../features/installationOrder/installationOrderSlice';
import Spinner from '../components/Spinner';
import FoldBar from '../components/FoldBar';
import OrderInfo from '../components/OrderInfo';
import Button from '../components/Button';
import Attachments from '../components/Attachments';
import * as FileSystem from 'expo-file-system';
import PDFList from '../components/PDFList';
import InstallCheckList from '../components/InstallCheckList';
import InstallationItems from '../components/InstallationItems';
import { StatusBar } from 'expo-status-bar';

const OrderDetail2 = ({ navigation, route }) => {
  const installationOrderId = route.params.installationOrderId;
  const installationOrderNumber = route.params.installationOrderNumber;
  const { installationOrder, files, isLoading, error } = useSelector(
    (state) => state.installationOrder
  );

  // folding bar status
  const [showOrderInfo, setShowOrderInfo] = useState(true);
  const [showPdfFiles, setShowPdfFiles] = useState(true);
  const [showCheckList, setShowCheckList] = useState(true);
  const [showCheckItems, setShowCheckItems] = useState(true);
  const [showAttachments, setShowAttachments] = useState(true);

  // required submission conditions
  const [installationItemsFullfilled, setInstallationItemsFullfilled] =
    useState(false);
  const [attachementsFullfilled, setAttachmentsFullfilled] = useState(false);

  // photo list
  const [photos, setPhotos] = useState([]);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // initialize order detail screen
  useEffect(() => {
    dispatch(getInstallationOrder2(installationOrderId));
    loadPhotos();
  }, []);

  // handle error
  useEffect(() => {
    if (error !== '') {
      alert(error);
      if (!installationOrder.installationOrderNumber) {
        navigation.goBack();
      }
    }
  }, [error]);

  // refresh photos when user turn back from Camera or EditPhoto screen
  useEffect(() => {
    loadPhotos();
  }, [isFocused]);

  const loadPhotos = () => {
    //photos1 for installation user
    const dirUri = `${FileSystem.documentDirectory}${installationOrderNumber}/photos1`;
    FileSystem.getInfoAsync(dirUri).then((fileInfo) => {
      if (fileInfo.isDirectory) {
        FileSystem.readDirectoryAsync(dirUri).then((localPhotos) => {
          localPhotos.sort();
          let newPhotos = [];
          localPhotos.forEach((localPhoto) => {
            newPhotos.push(`${installationOrderNumber}/photos1/${localPhoto}`);
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
    if (installationOrder.checkListSignature.signed === false) {
      alert('Please fill and submit the KITCHEN INSTALL CHECKLIST first.');
      return;
    }
    if (!installationItemsFullfilled) {
      alert('Please check all Installation Items first.');
      return;
    }
    if (photos.length === 0) {
      alert('Please take at least 1 photo for the installation task.');
      return;
    }
    Alert.alert('', 'Are you sure you want to submit this work?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
          const newTimeFrame = {
            workStatus: installationOrder.workStatus + 1,
            time: new Date(),
          };
          const timeFrames = [...installationOrder.timeFrames, newTimeFrame];
          const update = {
            workStatus: installationOrder.workStatus + 1,
            timeFrames: timeFrames,
            photos1: photos,
          };
          const orderInfo = {
            installationOrderId: installationOrder._id,
            installationOrderNumber: installationOrder.installationOrderNumber,
            userType: 1,
            update: update,
          };
          dispatch(submitOrder(orderInfo))
            .unwrap()
            .then(() => {
              alert(
                `You have successfully submitted the installation task! Thank you!`
              );
              navigation.goBack();
            })
            .catch();
        },
      },
    ]);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      {/* Order Details */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="w-11/12 bg-slate-50 my-3 md:my-5 rounded-lg border-gray-200 border md:rounded-3xl"
      >
        {/* Order screen title */}
        <View className="border-gray-200 border-b-2 py-2 md:py-5">
          <Text className="text-center text-gray-700 text-base md:text-xl font-bold">
            {installationOrder.installationOrderNumber} -{' Installation'}
          </Text>
        </View>
        {/* Oreder info */}
        <View className="border border-blue-100 rounded-lg mx-3 mt-3 md:border-2 md:mx-5 md:mt-5">
          <FoldBar
            title="Order Info"
            state={showOrderInfo}
            setState={setShowOrderInfo}
          />
          {showOrderInfo && <OrderInfo installationOrder={installationOrder} />}
        </View>
        {/* PDF file list */}
        <View className="border border-blue-100 rounded-lg mx-3 mt-3 md:border-2 md:mx-5 md:mt-5">
          <FoldBar
            title="PDF Files"
            state={showPdfFiles}
            setState={setShowPdfFiles}
            slideable={true}
          />
          {showPdfFiles && <PDFList dirs={files} navigation={navigation} />}
        </View>
        {/* Install check list */}
        <View className="border border-blue-100 rounded-lg mx-3 mt-3 md:border-2 md:mx-5 md:mt-5">
          <FoldBar
            title="Install Check List"
            state={showCheckList}
            setState={setShowCheckList}
            required={true}
            fullfilled={
              installationOrder.checkListSignature &&
              installationOrder.checkListSignature.signed
                ? true
                : false
            }
          />
          {showCheckList && (
            <InstallCheckList
              installationOrder={installationOrder}
              navigation={navigation}
            />
          )}
        </View>
        {/* Installation Items */}
        <View className="border border-blue-100 rounded-lg mx-3 mt-3 md:border-2 md:mx-5 md:mt-5">
          <FoldBar
            title="Installation Items"
            state={showCheckItems}
            setState={setShowCheckItems}
            required={true}
            fullfilled={installationItemsFullfilled}
          />
          {showCheckItems && (
            <InstallationItems
              installationOrderNumber={
                installationOrder.installationOrderNumber
              }
              installationItems={installationOrder.checkItems}
              setInstallationItemsFullfilled={setInstallationItemsFullfilled}
            />
          )}
        </View>
        {/* Attachements */}
        <View className="border border-blue-100 rounded-lg mx-3 my-3 md:border-2 md:mx-5 md:my-5">
          <FoldBar
            title="Attachments"
            state={showAttachments}
            setState={setShowAttachments}
            required={true}
            fullfilled={attachementsFullfilled}
            slideable={true}
          />
          {showAttachments && (
            <Attachments
              photos={photos}
              installationOrderNumber={installationOrderNumber}
              userType={1}
              navigation={navigation}
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
          disabled={
            attachementsFullfilled &&
            installationOrder.checkListSignature.signed &&
            installationItemsFullfilled
              ? false
              : true
          }
        />
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default OrderDetail2;
