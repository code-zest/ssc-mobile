import axios from 'axios';
import * as Keychain from 'react-native-keychain';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Update based on environment
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials && credentials.password) {
      config.headers.Authorization = `Bearer ${credentials.password}`;
    }
  } catch (error) {
    console.error('Error fetching token from keychain', error);
  }
  return config;
});

// Optionally handle 401s for refresh tokens here
