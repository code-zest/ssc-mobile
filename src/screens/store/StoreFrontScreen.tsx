import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';

export function StoreFrontScreen({ navigation }: any) {
  const { data: storeItems, isLoading } = useQuery({
    queryKey: ['storeItems'],
    queryFn: async () => {
      const res = await apiClient.get('/store/items');
      return res.data.data;
    }
  });

  if (isLoading) {
    return <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-900"><Text className="dark:text-white">Loading Rewards...</Text></View>;
  }

  // Bento Grid Layout Helper
  const renderStoreItem = ({ item, index }: any) => {
    const isLarge = index % 3 === 0; // Make every 3rd item span full width
    return (
      <TouchableOpacity 
        onPress={() => navigation.navigate('Checkout', { item })}
        className={`bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-100 dark:border-slate-700 m-2 flex-grow ${isLarge ? 'w-[90%]' : 'w-[43%]'}`}
      >
        <View className="h-24 bg-slate-100 dark:bg-slate-700 rounded-2xl mb-4 items-center justify-center overflow-hidden">
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} className="w-full h-full" resizeMode="cover" />
          ) : (
            <Text className="text-4xl">{item.category === 'THEME' ? '🎨' : item.category === 'AVATAR' ? '👤' : '💎'}</Text>
          )}
        </View>
        <Text className="font-bold text-slate-900 dark:text-white text-lg mb-1">{item.name}</Text>
        <View className="flex-row items-center mt-auto">
          <Text className="text-amber-500 font-bold mr-1">⭐</Text>
          <Text className="font-bold text-slate-700 dark:text-slate-300">{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-900 pt-12">
      <View className="flex-row items-center justify-between px-4 mb-6">
        <Text className="text-2xl font-bold text-slate-900 dark:text-white">Rewards Store</Text>
        <View className="bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full flex-row items-center">
          <Text className="text-amber-600 font-bold mr-1">⭐</Text>
          <Text className="text-amber-600 font-bold">1,250</Text>
        </View>
      </View>

      <FlatList
        data={storeItems || []}
        numColumns={2}
        keyExtractor={(item: any) => item.id}
        contentContainerClassName="px-2 pb-6"
        renderItem={renderStoreItem}
      />
    </View>
  );
}
