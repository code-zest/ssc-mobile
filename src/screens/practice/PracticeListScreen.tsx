import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';

export function PracticeListScreen({ navigation }: any) {
  const { data, isLoading } = useQuery({
    queryKey: ['practiceSets'],
    queryFn: async () => {
      const res = await apiClient.get('/practice-sets');
      return res.data.data;
    }
  });

  if (isLoading) {
    return <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-900"><Text className="dark:text-white">Loading Practice Sets...</Text></View>;
  }

  const practiceSets = data || [];

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-900 pt-12">
      <Text className="text-2xl font-bold text-slate-900 dark:text-white px-4 mb-4">Practice Sets</Text>
      
      <FlatList
        data={practiceSets}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={{ padding: 16, gap: 16 }}
        ListEmptyComponent={<Text className="text-slate-500 text-center mt-10">No practice sets available right now.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('QuizEngine', { setId: item.id, title: item.title })}
            className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 flex-row items-center justify-between"
          >
            <View className="flex-1 mr-4">
              <Text className="text-lg font-bold text-slate-900 dark:text-white mb-1">{item.title}</Text>
              <Text className="text-slate-500 dark:text-slate-400 text-sm" numberOfLines={2}>{item.description}</Text>
            </View>
            <View className="h-10 w-10 rounded-full bg-blue-600 items-center justify-center">
              <Text className="text-white text-lg font-bold">▶</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
