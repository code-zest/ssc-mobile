import './global.css';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, asyncStoragePersister } from './src/api/queryClient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './src/navigation/RootNavigator';

const linking = {
  prefixes: ['ssc://', 'https://ssc.com'],
  config: {
    screens: {
      Home: 'home',
      Learn: 'learn/:subjectId',
      Practice: 'practice',
      Store: 'store',
    },
  },
};

function App(): React.JSX.Element {
  return (
    <View className="flex-1 bg-background">
      <GestureHandlerRootView className="flex-1">
        <SafeAreaProvider>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: asyncStoragePersister }}
          >
            <NavigationContainer linking={linking}>
              <RootNavigator />
            </NavigationContainer>
          </PersistQueryClientProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </View>
  );
}

export default App;
