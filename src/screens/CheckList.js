import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInstallationOrder } from '../features/installationOrder/installationOrderSlice';
import { SafeAreaView, ScrollView, View, Text, Alert } from 'react-native';
import CheckListItem from '../components/CheckListItem';
import HeaderTitle from '../components/HeaderTitle';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import { parseDateAndTime } from '../utils/utils';

const CheckList = ({ navigation, route }) => {
  const installationOrder = route.params.installationOrder;
  const [pageLoading, setPageLoading] = useState(true);
  const { isLoading } = useSelector((state) => state.installationOrder);

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

  const submitCheckList = async () => {
    const newCheckList = [];
    await listItemRefs.forEach((itemRef) => {
      const checkItem = itemRef.current.getCheckItem();
      newCheckList.push(checkItem);
    });

    for (let i = 0; i < newCheckList.length; i++) {
      if (newCheckList[i].status === 0) {
        alert(
          "You haven't completed the check item on line " +
            newCheckList[i].index +
            ', please complete it before signing.'
        );
        return;
      }
    }
    Alert.alert(
      'Submit the check list?',
      'After submitting this form, the content cannot be changed anymore, continue?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: async () => {
            setPageLoading(true);
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
                alert('Install checklist has been completed!');
                navigation.goBack();
              })
              .catch();
          },
        },
      ]
    );
  };

  if (pageLoading || isLoading) {
    return <Spinner />;
  }
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
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
    </SafeAreaView>
  );
};

export default CheckList;
