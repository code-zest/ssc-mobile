import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

export function QuizResultScreen({ route, navigation }: any) {
  // In a real implementation, we would send the answers to the API to calculate the score
  // and then render the result here.
  
  return (
    <SafeAreaView className="flex-1 bg-blue-600 justify-center items-center">
      <View className="bg-white dark:bg-slate-900 p-8 rounded-3xl w-10/12 items-center shadow-xl">
        <Text className="text-5xl mb-4">🏆</Text>
        <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Test Completed!</Text>
        <Text className="text-slate-500 dark:text-slate-400 text-center mb-8">
          Your responses have been saved and analyzed.
        </Text>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('PracticeList')}
          className="w-full bg-slate-900 dark:bg-blue-600 py-4 rounded-xl items-center"
        >
          <Text className="text-white font-bold text-lg">Return to Practice</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
