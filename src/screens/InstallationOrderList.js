import { USER_ROLES } from '@env';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Pressable,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getInstallationOrders } from '../features/installationOrder/installationOrderSlice';
import Spinner from '../components/Spinner';
import InstallationOrderItem from '../components/InstallationOrderItem';
import { auth } from '../../firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';

const OrderList = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const { installationOrders, isLoading, error } = useSelector(
    (state) => state.installationOrder
  );
  const [select, setSelect] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInstallationOrders())
      .unwrap()
      .then(() => {
        //dispatch(deleteClosedOrders());
      })
      .catch();
  }, []);

  useEffect(() => {
    if (error !== '') {
      alert(error);
    }
  }, [error]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {installationOrders.length === 0 ? (
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
                <View className="flex flex-row items-center justify-start bg-blue-50">
                  <Text className="w-10">{` `}</Text>
                  <Text className="p-3 text-sm font-bold text-center w-56 md:text-lg md:w-64">
                    Installation Order Number
                  </Text>
                  <Text className="p-3 text-sm font-bold text-center w-40 md:text-lg md:w-60">
                    Customer
                  </Text>
                  <Text className="p-3 text-sm font-bold text-center w-40 md:text-lg md:w-60">
                    Ship Name
                  </Text>
                  <Text className="p-3 text-sm font-bold text-center w-40 md:text-lg md:w-60">
                    Ship Address
                  </Text>
                  <Text className="p-3 text-sm font-bold text-center w-30 md:text-lg md:w-40">
                    Entry Date
                  </Text>
                  <Text className="p-3 text-sm font-bold text-center w-30 md:text-lg md:w-40">
                    Due Date
                  </Text>
                  <Text className="p-3 text-sm font-bold text-center w-20 md:text-lg md:w-40">
                    Deliverer
                  </Text>
                  <Text className="p-3 text-sm font-bold text-center w-20 md:text-lg md:w-40">
                    Installer
                  </Text>
                </View>
                {/* Table Body */}
                {installationOrders.map((installationOrder, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={
                      () => {} //selectInstallationOrder(installationOrder)
                    }
                  >
                    <InstallationOrderItem
                      installationOrder={installationOrder}
                      select={select}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </ScrollView>
          <View className="flex flex-row items-center justify-center">
            <Text className="text-red-600 italic text-xs mr-2 md:text-lg">
              * The table above can be slid left and right.
            </Text>
            <MaterialIcons
              name="swipe"
              size={windowWidth > 599 ? 30 : 24}
              color="#68adde"
            />
          </View>
          <View className="flex flex-row items-center justify-between h-[70] md:h-[100] w-4/5">
            <Pressable
              className="w-[120] md:w-[200] flex justify-center items-center p-2 rounded-lg md:rounded-xl bg-blue-500"
              onPress={() => {
                //refresh();
              }}
            >
              <Text className="text-white font-bold text-md md:text-xl">
                Refresh
              </Text>
            </Pressable>
            <Pressable
              className={`w-[120] md:w-[200] flex justify-center items-center p-2 rounded-lg md:rounded-xl ${
                select ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onPress={() => {
                if (select) {
                  //startInstallationOrder();
                } else {
                }
              }}
            >
              <Text className="text-white font-bold text-md md:text-xl">
                Start
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderList;
