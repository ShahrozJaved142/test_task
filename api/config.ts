import axios, { InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showErrorMsg } from '../utils/appMessages';

const ROOT_URL = `https://dummyjson.com/products`;

const BASE_URL = `${ROOT_URL}`;


const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
  timeout: 20 * 1000,
});

client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const authToken = await AsyncStorage.getItem(
      'authToken',
    );
    if (authToken) {
      config.headers.set('Authorization', `Bearer ${authToken}`)
    }
    return config;
  },
  (err) => {
    showErrorMsg(err);
    return Promise.reject(err);
  },
);

export {
  client,
};
