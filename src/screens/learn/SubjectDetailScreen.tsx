import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../api/apiClient';

export function SubjectDetailScreen({ route, navigation }: any) {
  const { subjectId, title } = route.params;

  const { data: chapters, isLoading } = useQuery({
    queryKey: ['chapters', subjectId],
    queryFn: async () => {
      const res = await apiClient.get(`/chapters?subjectId=${subjectId}`);
      return res.data.data;
    }
  });

  if (isLoading) {
    return <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-900"><Text className="dark:text-white">Loading Chapters...</Text></View>;
  }

  return (
    <View className="flex-1 bg-slate-50 dark:bg-slate-900 pt-12">
      <View className="flex-row items-center px-4 mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Text className="text-blue-600 text-lg">← Back</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-900 dark:text-white">{title}</Text>
      </View>

      <FlatList
        data={chapters || []}
        keyExtractor={(item: any) => item.id}
        contentContainerClassName="p-4 gap-3"
        renderItem={({ item, index }) => (
          <View className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
            <Text className="text-sm font-semibold text-blue-600 mb-1">CHAPTER {index + 1}</Text>
            <Text className="text-lg font-bold text-slate-900 dark:text-white mb-3">{item.title}</Text>
            
            {item.lessons?.map((lesson: any) => (
              <TouchableOpacity 
                key={lesson.id}
                onPress={() => navigation.navigate('LessonViewer', { lessonId: lesson.id })}
                className="flex-row items-center py-2 border-t border-slate-100 dark:border-slate-700 mt-2"
              >
                <View className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-700 items-center justify-center mr-3">
                  <Text className="text-xs text-slate-500">▶</Text>
                </View>
                <Text className="text-slate-700 dark:text-slate-300 flex-1">{lesson.title}</Text>
                <Text className="text-xs text-slate-400">{lesson.type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
}
