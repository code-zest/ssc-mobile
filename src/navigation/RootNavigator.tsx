import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { AuthNavigator } from './AuthNavigator';
import * as Keychain from 'react-native-keychain';

function TempMainScreen() {
  const { logout, user } = useAuthStore();
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
      <Text className="text-xl font-bold text-slate-900 dark:text-white mb-4">
        Welcome, {user?.firstName}!
      </Text>
      <Text className="text-blue-600 font-semibold" onPress={logout}>
        Log Out
      </Text>
    </View>
  );
}

export function RootNavigator() {
  const { isAuthenticated, setCredentials } = useAuthStore();
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.password) {
          // Ideally verify the token here with the backend or decode it
          // For now, we'll assume it's valid if it exists. 
          // We'll stub a user object until we hook up the /me endpoint
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

  return isAuthenticated ? <TempMainScreen /> : <AuthNavigator />;
}
