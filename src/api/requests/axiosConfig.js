import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_TOKEN_KEY} from '@constants';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:5122/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosConfig.interceptors.request.use(
  async config => {
    const authToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosConfig;
