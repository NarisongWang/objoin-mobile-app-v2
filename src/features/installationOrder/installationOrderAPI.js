import { API_URL } from '@env';
import axios from 'axios';
import { getConfig } from '../../utils/utils';

const API_URL_LIST = API_URL + '/installationorders/';

axios.defaults.timeout = 30000;
axios.defaults.timeoutErrorMessage =
  'Requset time out, please check your internet connection and try again later!';

const getInstallationOrders = async (token, thunkAPI) => {
  try {
    const config = getConfig(token);
    const response = await axios.get(API_URL_LIST, config);
    return response.data;
  } catch (error) {
    alert(error.message);
  }
};

const installationOrderAPI = {
  getInstallationOrders,
};

export default installationOrderAPI;
