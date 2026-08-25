import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { apiClient } from '../../api/apiClient';

export function CheckoutScreen({ route, navigation }: any) {
  const { item } = route.params;
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    try {
      setLoading(true);
      await apiClient.post('/store/purchase', { itemId: item.id });
      Alert.alert(
        'Purchase Successful! 🎉',
        `You have successfully unlocked ${item.name}.`,
        [{ text: 'Awesome', onPress: () => navigation.goBack() }]
      );
    } catch (error: any) {
      Alert.alert(
        'Purchase Failed',
        error.response?.data?.message || 'Not enough Zest Points or item unavailable.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-900 p-6 pt-12">
      <View className="items-center mb-8">
        <View className="w-12 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mb-8" />
        
        <View className="h-40 w-40 bg-white dark:bg-slate-800 rounded-full mb-6 items-center justify-center shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} className="w-full h-full" resizeMode="cover" />
          ) : (
            <Text className="text-6xl">{item.category === 'THEME' ? '🎨' : item.category === 'AVATAR' ? '👤' : '💎'}</Text>
          )}
        </View>
        
        <Text className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-2">{item.name}</Text>
        <Text className="text-lg text-slate-500 dark:text-slate-400 text-center px-4">{item.description}</Text>
      </View>

      <View className="bg-white dark:bg-slate-800 rounded-3xl p-6 mb-8 border border-slate-100 dark:border-slate-700">
        <View className="flex-row justify-between mb-4">
          <Text className="text-slate-500 dark:text-slate-400">Current Balance</Text>
          <Text className="font-bold text-slate-900 dark:text-white">⭐ 1,250</Text>
        </View>
        <View className="flex-row justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-700">
          <Text className="text-slate-500 dark:text-slate-400">Item Cost</Text>
          <Text className="font-bold text-amber-500">- ⭐ {item.price}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-slate-700 dark:text-slate-300 font-bold text-lg">Remaining Balance</Text>
          <Text className="font-bold text-slate-900 dark:text-white text-lg">⭐ {1250 - item.price}</Text>
        </View>
      </View>

      <View className="mt-auto space-y-4">
        <TouchableOpacity 
          onPress={handlePurchase}
          disabled={loading}
          className="w-full bg-blue-600 py-4 rounded-2xl items-center flex-row justify-center"
        >
          {loading ? <ActivityIndicator color="white" className="mr-2" /> : null}
          <Text className="text-white font-bold text-xl">Confirm Purchase</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-full py-4 items-center"
        >
          <Text className="text-slate-500 font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
