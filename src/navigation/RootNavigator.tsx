import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import * as Keychain from 'react-native-keychain';

import { apiClient } from '../api/apiClient';

export function RootNavigator() {
  const { isAuthenticated, setCredentials, logout } = useAuthStore();
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.password) {
          try {
            const { data } = await apiClient.get('/auth/me');
            await setCredentials(data.user || data, credentials.password);
          } catch (apiError) {
            console.error('Failed to validate token with API:', apiError);
            logout();
          }
        } else {
          logout();
        }
      } catch (e) {
        console.error('Failed to restore token from Keychain:', e);
        logout();
      } finally {
        setIsReady(true);
      }
    };

    bootstrapAsync();
  }, [setCredentials, logout]);

  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />;
}
