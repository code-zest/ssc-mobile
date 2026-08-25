import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';

export function DashboardScreen({ navigation }: any) {
  const { user, logout } = useAuthStore();

  return (
    <ScrollView className="flex-1 bg-slate-50 dark:bg-slate-900 p-4">
      <View className="mb-6 flex-row justify-between items-center mt-8">
        <View>
          <Text className="text-slate-500 dark:text-slate-400 font-medium text-sm">Welcome back,</Text>
          <Text className="text-2xl font-bold text-slate-900 dark:text-white">{user?.firstName}</Text>
        </View>
        <TouchableOpacity onPress={logout} className="bg-slate-200 dark:bg-slate-800 px-4 py-2 rounded-full">
          <Text className="text-slate-700 dark:text-slate-300 font-semibold text-sm">Log Out</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
        <Text className="text-lg font-bold text-slate-900 dark:text-white mb-2">Today's Goal</Text>
        <Text className="text-slate-500 dark:text-slate-400 mb-4">You have 2 lessons left to complete your daily streak.</Text>
        <View className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <View className="h-full bg-blue-600 w-1/3 rounded-full" />
        </View>
      </View>

      <View className="flex-row justify-between mb-4">
        <Text className="text-xl font-bold text-slate-900 dark:text-white">Recent Subjects</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Learn')}>
          <Text className="text-blue-600 font-semibold">View All</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row space-x-4 mb-6">
        {/* Placeholder cards */}
        <View className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 w-40">
          <View className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl mb-3" />
          <Text className="font-bold text-slate-900 dark:text-white mb-1">Mathematics</Text>
          <Text className="text-xs text-slate-500 dark:text-slate-400">4 Chapters left</Text>
        </View>
        <View className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 w-40">
          <View className="h-10 w-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl mb-3" />
          <Text className="font-bold text-slate-900 dark:text-white mb-1">Reasoning</Text>
          <Text className="text-xs text-slate-500 dark:text-slate-400">1 Chapter left</Text>
        </View>
      </View>

    </ScrollView>
  );
}
