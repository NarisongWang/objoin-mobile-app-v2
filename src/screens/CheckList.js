import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInstallationOrder } from '../features/installationOrder/installationOrderSlice';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import CheckListItem from '../components/CheckListItem';
import HeaderTitle from '../components/HeaderTitle';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import ModalBox from '../components/ModalBox';
import { parseDateAndTime } from '../utils/utils';
import { StatusBar } from 'expo-status-bar';

const CheckList = ({ navigation }) => {
  const [pageLoading, setPageLoading] = useState(true);
  const { installationOrder, isLoading } = useSelector(
    (state) => state.installationOrder
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [modalMessage, setModalMessage] = useState('');
  const [pressAndGoBack, setPressAndGoBack] = useState(false);

  const dispatch = useDispatch();

  //initialize
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HeaderTitle
          title={`Install Check List - ${installationOrder.installationOrderNumber}`}
        />
      ),
    });
    setTimeout(() => setPageLoading(false), 100);
  }, []);

  // Create an array of refs
  const listItemRefs = installationOrder.checkList.map(() => useRef(null));

  const saveCheckList = async () => {
    setPageLoading(true);
    const newCheckList = [];
    await listItemRefs.forEach((itemRef) => {
      const checkItem = itemRef.current.getCheckItem();
      newCheckList.push(checkItem);
    });

    dispatch(
      updateInstallationOrder({
        installationOrderId: installationOrder._id,
        update: { checkList: newCheckList },
      })
    )
      .unwrap()
      .then(() => {
        navigation.goBack();
      })
      .catch();
  };

  const wait = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  const submitCheckList = async () => {
    setModalLoading(true);
    setIsModalVisible(true);
    await wait();
    const newCheckList = [];
    await listItemRefs.forEach((itemRef) => {
      const checkItem = itemRef.current.getCheckItem();
      newCheckList.push(checkItem);
    });

    for (let i = 0; i < newCheckList.length; i++) {
      if (newCheckList[i].status === 0) {
        //show modal warning
        setModalMessage(
          "You haven't completed the check item on line " +
            newCheckList[i].index +
            ', please complete it before submit.'
        );
        setModalType(2);
        setModalLoading(false);
        return;
      }
    }
    setModalLoading(false);
    //show confirm dialog
    setModalMessage(
      'After submitting this form, the content cannot be changed anymore, continue?'
    );
    setModalType(3);
    setIsModalVisible(true);
    setModalLoading(false);
  };

  const handleConfirm = async () => {
    const newCheckList = [];
    await listItemRefs.forEach((itemRef) => {
      const checkItem = itemRef.current.getCheckItem();
      newCheckList.push(checkItem);
    });
    const update = {
      checkList: newCheckList,
      checkListSignature: {
        signed: true,
        time: new Date(),
      },
    };
    dispatch(
      updateInstallationOrder({
        installationOrderId: installationOrder._id,
        update: update,
      })
    )
      .unwrap()
      .then(() => {
        //show modal success and go back
        setModalMessage('Install checklist has been completed!');
        setPressAndGoBack(true);
        setModalType(1);
        setIsModalVisible(true);
      })
      .catch((error) => {
        setPageLoading(false);
        //show modal error
        setModalMessage(error.message);
        setModalType(0);
        setIsModalVisible(true);
      });
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (pageLoading || isLoading) {
    return <Spinner />;
  }
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <ModalBox
        isModalVisible={isModalVisible}
        modalMessage={modalMessage}
        modalType={modalType}
        setIsModalVisible={setIsModalVisible}
        isLoading={modalLoading}
        pressAndGoBack={pressAndGoBack}
        onConfirm={handleConfirm}
        goBack={goBack}
      />
      {installationOrder.checkListSignature.signed && (
        <View className="flex-row items-center justify-center">
          <Text className="mt-3 font-bold text-xs md:mt-5 md:text-lg">
            This{' '}
          </Text>
          <Text className="mt-3 text-green-800 italic font-bold text-xs md:mt-5 md:text-lg">
            Check List Form{' '}
          </Text>
          <Text className="mt-3 font-bold text-xs md:mt-5 md:text-lg">
            has been completed on{' '}
            {parseDateAndTime(installationOrder.checkListSignature.time)}
          </Text>
        </View>
      )}
      {/* Check List Content */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="w-11/12 bg-slate-50 mt-3 md:mt-5 rounded-sm border-gray-200 border py-2"
      >
        {installationOrder.checkList.map((checkItem, index) => (
          <CheckListItem
            key={index}
            checkItem={checkItem}
            disabled={installationOrder.checkListSignature.signed}
            ref={listItemRefs[index]}
          />
        ))}
      </ScrollView>
      {/* Buttons */}
      <View className="flex flex-row items-center justify-between h-[70] md:h-[100] w-4/5">
        <Button
          title="SAVE & BACK"
          pressEvent={() => {
            saveCheckList();
          }}
          disabled={installationOrder.checkListSignature.signed}
        />
        <Button
          title="SUBMIT"
          pressEvent={() => {
            submitCheckList();
          }}
          disabled={installationOrder.checkListSignature.signed}
        />
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default CheckList;
