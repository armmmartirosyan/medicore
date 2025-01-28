import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_TOKEN_KEY} from '@constants';

export async function getAuthInfo() {
  const value = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  return value || '';
}

export async function setAuthInfo(token) {
  await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
}

export async function removeAuthInfo() {
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
}
