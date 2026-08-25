import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SubjectsScreen } from '../screens/learn/SubjectsScreen';
import { SubjectDetailScreen } from '../screens/learn/SubjectDetailScreen';
import { LessonViewerScreen } from '../screens/learn/LessonViewerScreen';

const Stack = createNativeStackNavigator();

export function LearnNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SubjectsList" component={SubjectsScreen} />
      <Stack.Screen name="SubjectDetail" component={SubjectDetailScreen} />
      <Stack.Screen name="LessonViewer" component={LessonViewerScreen} />
    </Stack.Navigator>
  );
}
