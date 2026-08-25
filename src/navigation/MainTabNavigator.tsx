import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { LearnNavigator } from './LearnNavigator';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const PracticeStub = () => <View className="flex-1 justify-center items-center bg-slate-50 dark:bg-slate-900"><Text className="dark:text-white">Practice Engine (Phase 4)</Text></View>;
const StoreStub = () => <View className="flex-1 justify-center items-center bg-slate-50 dark:bg-slate-900"><Text className="dark:text-white">Gamification Store (Phase 5)</Text></View>;

export function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ 
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        height: 60,
        paddingBottom: 8,
      },
      tabBarActiveTintColor: '#2563eb',
      tabBarInactiveTintColor: '#64748b'
    }}>
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Learn" component={LearnNavigator} />
      <Tab.Screen name="Practice" component={PracticeStub} />
      <Tab.Screen name="Store" component={StoreStub} />
    </Tab.Navigator>
  );
}
