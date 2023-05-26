import { API_URL } from '@env';
import axios from 'axios';
import { getConfig } from '../../utils/utils';
import * as FileSystem from 'expo-file-system';

const API_URL_LIST = API_URL + '/installationorders/';

axios.defaults.timeout = 30000;
axios.defaults.timeoutErrorMessage =
  'Requset time out, please check your internet connection and try again later!';

const getInstallationOrders = async (token, thunkAPI) => {
  try {
    const config = getConfig(token);
    const response = await axios.get(API_URL_LIST, config);
    //delete closed order directories
    const root = FileSystem.documentDirectory;
    FileSystem.readDirectoryAsync(root).then((orders) => {
      orders.forEach((order) => {
        if (!isCurrentFolderInOrderList(order, response.data)) {
          FileSystem.deleteAsync(root + order);
        }
      });
    });
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};

const getInstallationOrder = async (installationOrderId, token) => {
  try {
    const config = getConfig(token);
    const response = await axios.get(
      API_URL_LIST + installationOrderId,
      config
    );
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};

const updateInstallationOrder = async (update, token) => {
  try {
    const config = getConfig(token);
    const response = await axios.put(
      API_URL_LIST + update.installationOrderId,
      update.update,
      config
    );
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};

const isCurrentFolderInOrderList = (order, installationOrders) => {
  for (let i = 0; i < installationOrders.length; i++) {
    const installationOrder = installationOrders[i];
    if (order == installationOrder.installationOrderNumber) {
      return true;
    }
  }
  return false;
};

const installationOrderAPI = {
  getInstallationOrders,
  getInstallationOrder,
  updateInstallationOrder,
};

export default installationOrderAPI;
