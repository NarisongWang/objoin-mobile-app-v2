import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
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

const Component = ({ prop1, prop2 }) => {
  useEffect(() => {
    console.log('Initialize children');
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>{prop1}</Text>
      <Text>{prop2}</Text>
    </View>
  );
};

const EditProfile = ({ navigation, route }) => {
  const installationOrderId = route.params.installationOrderId;
  installationOrderNumber = '2211072';
  const { installationOrder, files, isLoading, error } = useSelector(
    (state) => state.installationOrder
  );
  dispatch = useDispatch();

  // folding bar status
  const [showOrderInfo, setShowOrderInfo] = useState(true);
  const [showPdfFiles, setShowPdfFiles] = useState(true);
  const [showCheckList, setShowCheckList] = useState(true);
  const [showCheckItems, setShowCheckItems] = useState(true);
  const [showAttachments, setShowAttachments] = useState(true);

  // required submission conditions
  const [checkItemsFullfilled, setCheckItemsFullfilled] = useState(false);
  const [attachementsFullfilled, setAttachmentsFullfilled] = useState(false);

  // initialize order detail screen
  useEffect(() => {
    console.log('Initialize parent');
    dispatch(getInstallationOrder2(installationOrderId));
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
        {/* Installation Items */}
        <View className="border border-blue-100 rounded-lg mx-3 mt-3 md:border-2 md:mx-5 md:mt-5">
          <FoldBar
            title="Installation Items"
            state={showCheckItems}
            setState={setShowCheckItems}
            required={true}
            fullfilled={checkItemsFullfilled}
          />
          {showCheckItems && (
            <InstallationItems
              installationOrderNumber={
                installationOrder.installationOrderNumber
              }
              installationItems={installationOrder.checkItems}
              setCheckItemsFullfilled={setCheckItemsFullfilled}
            />
          )}
        </View>
      </ScrollView>
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
            checkItemsFullfilled
              ? false
              : true
          }
        />
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default EditProfile;
