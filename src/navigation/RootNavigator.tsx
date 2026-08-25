import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import * as Keychain from 'react-native-keychain';

export function RootNavigator() {
  const { isAuthenticated, setCredentials } = useAuthStore();
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.password) {
          // Stub user until /me endpoint
          const user = {
            id: '1',
            email: 'student@example.com',
            firstName: 'Student',
            lastName: '',
            role: 'STUDENT',
            isOnboarded: true,
          } as any;
          await setCredentials(user, credentials.password);
        }
      } catch (e) {
        console.error('Failed to restore token:', e);
      } finally {
        setIsReady(true);
      }
    };

    bootstrapAsync();
  }, [setCredentials]);

  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />;
}
