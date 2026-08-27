import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { LearnNavigator } from './LearnNavigator';
import { PracticeNavigator } from './PracticeNavigator';
import { StoreNavigator } from './StoreNavigator';

import { Home, BookOpen, PenTool, ShoppingBag } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({ 
      headerShown: false,
      tabBarStyle: {
        backgroundColor: 'oklch(0.99 0.01 250)', // background
        borderTopWidth: 1,
        borderTopColor: 'oklch(0.93 0.005 250)', // border
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
      },
      tabBarActiveTintColor: 'oklch(0.55 0.22 275)', // primary
      tabBarInactiveTintColor: 'oklch(0.53 0.02 250)', // muted-foreground
      tabBarIcon: ({ focused, color }) => {
        let IconComponent;
        
        switch (route.name) {
          case 'Home':
            IconComponent = Home;
            break;
          case 'Learn':
            IconComponent = BookOpen;
            break;
          case 'Practice':
            IconComponent = PenTool;
            break;
          case 'Store':
            IconComponent = ShoppingBag;
            break;
          default:
            IconComponent = Home;
        }

        return <IconComponent size={24} color={color} strokeWidth={focused ? 2.5 : 2} />;
      }
    })}>
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Learn" component={LearnNavigator} />
      <Tab.Screen name="Practice" component={PracticeNavigator} />
      <Tab.Screen name="Store" component={StoreNavigator} />
    </Tab.Navigator>
  );
}
