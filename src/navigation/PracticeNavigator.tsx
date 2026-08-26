import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PracticeListScreen } from '../screens/practice/PracticeListScreen';
import { QuizEngineScreen } from '../screens/practice/QuizEngineScreen';
import { QuizResultScreen } from '../screens/practice/QuizResultScreen';
import type { PracticeParamList } from '../screens/practice/QuizEngineScreen';

const Stack = createNativeStackNavigator<PracticeParamList>();

export function PracticeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PracticeList" component={PracticeListScreen} />
      <Stack.Screen name="QuizEngine" component={QuizEngineScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="QuizResult" component={QuizResultScreen} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}
