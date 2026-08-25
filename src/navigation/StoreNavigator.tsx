import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StoreFrontScreen } from '../screens/store/StoreFrontScreen';
import { CheckoutScreen } from '../screens/store/CheckoutScreen';

const Stack = createNativeStackNavigator();

export function StoreNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="StoreFront" component={StoreFrontScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
