import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { LearnNavigator } from './LearnNavigator';
import { PracticeNavigator } from './PracticeNavigator';
import { StoreNavigator } from './StoreNavigator';

const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="Practice" component={PracticeNavigator} />
      <Tab.Screen name="Store" component={StoreNavigator} />
    </Tab.Navigator>
  );
}
