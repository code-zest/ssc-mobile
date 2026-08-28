import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';

export function SubjectsScreen({ navigation }: any) {
  // Use Tanstack Query for caching & offline persistence
  const { data, isLoading } = useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const res = await apiClient.get('/subjects');
      return res.data.data;
    }
  });

  if (isLoading) {
    return <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-900"><Text className="dark:text-white">Loading...</Text></View>;
  }

  const subjects = data || [];

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-900 pt-12">
      <Text className="text-2xl font-bold text-slate-900 dark:text-white px-4 mb-4">Syllabus</Text>
      
      <FlatList
        data={subjects}
        keyExtractor={(item: any) => item.id}
        contentContainerClassName="p-4 gap-4"
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('SubjectDetail', { subjectId: item.id, title: item.title })}
            className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 flex-row items-center justify-between"
          >
            <View>
              <Text className="text-lg font-bold text-slate-900 dark:text-white mb-1">{item.title}</Text>
              <Text className="text-slate-500 dark:text-slate-400">{item.chapters?.length || 0} Chapters</Text>
            </View>
            <View className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-900/20 items-center justify-center">
              <Text className="text-blue-600 dark:text-blue-400">→</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
