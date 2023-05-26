import { API_URL } from '@env';
import axios from 'axios';
import { getConfig } from '../../utils/utils';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

const API_URL_LIST = API_URL + '/installationorders/';
const API_URL_UPLOAD = API_URL + '/uploadPhotos';
const API_URL_DOWNLOAD = API_URL + '/download';

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

const submitOrder = async (orderInfo, token) => {
  try {
    const config = getConfig(token);
    const config2 = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const photoDir = `${FileSystem.documentDirectory}${orderInfo.installationOrderNumber}/photos${orderInfo.userType}`;
    const checkDir = (await FileSystem.getInfoAsync(photoDir)).isDirectory;
    if (!checkDir) {
      throw new Error('Photo directory not found!');
    }
    let photos = await FileSystem.readDirectoryAsync(photoDir);

    //step1: upload photos
    for (const photo of photos) {
      //compress photo
      const resizedPhoto = await ImageManipulator.manipulateAsync(
        `${photoDir}/${photo}`,
        [{ resize: { width: 1200 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );
      const formData = new FormData();
      formData.append(
        'installationOrderNumber',
        orderInfo.installationOrderNumber
      );
      formData.append('userType', orderInfo.userType);
      formData.append('image', {
        uri: `${resizedPhoto.uri}`,
        name: photo,
        type: 'image/jpg',
      });
      try {
        await axios.post(API_URL_UPLOAD, formData, config2);
      } catch (error) {
        throw new Error('Photo upload failed: ' + error);
      }
      try {
        await FileSystem.deleteAsync(resizedPhoto.uri);
      } catch (error) {}
    }
    //step2: update installation order
    try {
      await axios.put(
        API_URL_LIST + orderInfo.installationOrderId,
        orderInfo.update,
        config
      );
    } catch (error) {
      throw new Error('Update installation order failed: ' + error);
    }

    //step3: return updated installation order list
    const response = await axios.get(API_URL_LIST, config);
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
  submitOrder,
};

export default installationOrderAPI;
