import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';

export function LessonViewerScreen({ route, navigation }: any) {
  const { lessonId } = route.params;

  const { data: lesson, isLoading } = useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: async () => {
      const res = await apiClient.get(`/lessons/${lessonId}`);
      return res.data.data;
    }
  });

  if (isLoading) {
    return <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-900"><Text className="dark:text-white">Loading Lesson...</Text></View>;
  }

  return (
    <View className="flex-1 bg-white dark:bg-slate-900 pt-12">
      <View className="flex-row items-center px-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Text className="text-blue-600 text-lg">✕ Close</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-slate-900 dark:text-white" numberOfLines={1}>{lesson?.title}</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{lesson?.title}</Text>
        
        {/* We would use a native Markdown renderer here like react-native-markdown-display */}
        <Text className="text-slate-700 dark:text-slate-300 leading-6">
          {lesson?.content || "No content available for this lesson yet."}
        </Text>
      </ScrollView>

      <View className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <TouchableOpacity className="w-full bg-blue-600 py-4 rounded-xl items-center">
          <Text className="text-white font-bold text-lg">Mark as Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
