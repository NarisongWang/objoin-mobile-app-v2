import { USER_ROLES } from '@env';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getInstallationOrders,
  updateInstallationOrder,
  setLoading,
} from '../features/installationOrder/installationOrderSlice';
import Spinner from '../components/Spinner';
import OrderItem from '../components/OrderItem';
import { auth } from '../../firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';
import OrderTableHead from '../components/OrderTableHead';
import Button from '../components/Button';
import { StatusBar } from 'expo-status-bar';

const OrderList = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const { installationOrders, isLoading, error } = useSelector(
    (state) => state.installationOrder
  );
  const [select, setSelect] = useState(null);

  const dispatch = useDispatch();

  // initial order list screen
  useEffect(() => {
    dispatch(getInstallationOrders())
      .unwrap()
      .then(() => {})
      .catch();
  }, []);

  // handle error
  useEffect(() => {
    if (error !== '') {
      alert(error);
    }
  }, [error]);

  // refresh order list
  const refresh = () => {
    setSelect(null);
    dispatch(getInstallationOrders())
      .unwrap()
      .then(() => {})
      .catch();
  };

  //Check user role and work status, and then set selected order
  const selectInstallationOrder = async (installationOrder) => {
    const idTokenResult = await auth.currentUser.getIdTokenResult();
    const role = idTokenResult.claims.role;
    const deliverer = USER_ROLES.split('|')[2];
    const installer = USER_ROLES.split('|')[3];
    if (
      // judge wether it is delivery staff
      (role === deliverer && installationOrder.workStatus === 1) ||
      // judge wether it is installation staff
      (role === installer &&
        (installationOrder.workStatus === 2 ||
          installationOrder.workStatus === 3))
    ) {
      setSelect(installationOrder);
    }
  };

  // navigate to the corresponding order detail screen
  const startInstallationOrder = async () => {
    const idTokenResult = await auth.currentUser.getIdTokenResult();
    const role = idTokenResult.claims.role;
    const deliverer = USER_ROLES.split('|')[2];
    const installer = USER_ROLES.split('|')[3];
    if (!select) {
      alert('Please select an installation order first.');
      return;
    }
    //set isLoading state to true before navigating to detail page,
    //this will avoid rendering the detial page for a very small amount of time before dispatching fetch data function
    dispatch(setLoading());
    if (role === deliverer) {
      navigation.navigate('Detail1', {
        installationOrderId: select._id,
        installationOrderNumber: select.installationOrderNumber,
      });
    } else if (role === installer) {
      if (select.workStatus === 2) {
        const update = {
          installationOrderId: select._id,
          update: {
            workStatus: 3,
            timeFrames: [
              ...select.timeFrames,
              { workStatus: 3, time: new Date() },
            ],
          },
        };
        dispatch(updateInstallationOrder(update))
          .unwrap()
          .then(() => {
            navigation.navigate('Detail2', {
              installationOrderId: select._id,
              installationOrderNumber: select.installationOrderNumber,
            });
          })
          .catch();
      } else {
        navigation.navigate('Detail2', {
          installationOrderId: select._id,
          installationOrderNumber: select.installationOrderNumber,
        });
      }
    }
    setSelect(null);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {installationOrders && installationOrders.length === 0 ? (
        <Text className="text-blue-600 italic text-xl text-center m-10">
          *No available installation orders found.
        </Text>
      ) : (
        <View className="flex-1 items-center justify-center">
          <ScrollView className="border-gray-400 shadow">
            <ScrollView horizontal>
              {/* Installation Order List Table */}
              <View>
                {/* Table Header */}
                <OrderTableHead />
                {/* Table Body */}
                {installationOrders && installationOrders.length > 0
                  ? installationOrders.map((installationOrder, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() =>
                          selectInstallationOrder(installationOrder)
                        }
                      >
                        <OrderItem
                          installationOrder={installationOrder}
                          select={select}
                        />
                      </TouchableOpacity>
                    ))
                  : null}
              </View>
            </ScrollView>
          </ScrollView>
          {/* Notice message */}
          <View className="flex flex-row items-center justify-center mt-2">
            <Text className="text-red-600 italic text-xs mr-2 md:text-lg">
              * The table above can be slid left and right.
            </Text>
            <MaterialIcons
              name="swipe"
              size={windowWidth > 599 ? 30 : 24}
              color="#68adde"
            />
          </View>
          {/* Buttons */}
          <View className="flex flex-row items-center justify-between h-[70] md:h-[100] w-4/5">
            <Button
              title="REFRESH"
              pressEvent={() => {
                refresh();
              }}
            />

            <Button
              title="START"
              disabled={select ? false : true}
              pressEvent={() => {
                if (select) {
                  startInstallationOrder();
                } else {
                }
              }}
            />
          </View>
        </View>
      )}
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default OrderList;
