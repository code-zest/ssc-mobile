import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { apiClient } from '../../api/apiClient';

export type PracticeParamList = {
  PracticeList: undefined;
  QuizEngine: { setId: string; title: string };
  QuizResult: { setId: string; title: string; answers: Record<string, string> };
};

type QuizScreenProps = NativeStackScreenProps<PracticeParamList, 'QuizEngine'>;

interface QuizOption {
  id: string;
  text: string;
}

export function QuizEngineScreen({ route, navigation }: QuizScreenProps) {
  const { setId, title } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);

  // In a real app, we'd use Zustand for the active test state 
  // (to prevent data loss if the app closes)
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const { data: practiceSet, isLoading } = useQuery({
    queryKey: ['practiceSet', setId],
    queryFn: async () => {
      const res = await apiClient.get(`/practice-sets/${setId}`);
      return res.data.data;
    }
  });

  if (isLoading) {
    return <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-900"><Text className="dark:text-white">Loading Engine...</Text></View>;
  }

  const questions = practiceSet?.questions || [];
  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      Alert.alert(
        'Submit Test',
        'Are you sure you want to submit your answers?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Submit', style: 'destructive', onPress: () => navigation.replace('QuizResult', { setId, title, answers }) }
        ]
      );
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (questions.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
        <Text className="text-slate-500 mb-4">No questions found in this set.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="bg-blue-600 px-6 py-3 rounded-xl">
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-blue-600 font-semibold">Exit</Text>
        </TouchableOpacity>
        <Text className="text-slate-900 dark:text-white font-bold">{title}</Text>
        <Text className="text-slate-500 font-mono">
          {currentIndex + 1} / {questions.length}
        </Text>
      </View>

      <View className="flex-1 p-6">
        <Text className="text-xl text-slate-900 dark:text-white leading-8 font-medium mb-8">
          {currentQuestion.text}
        </Text>

        <View className="space-y-3">
          {currentQuestion.options?.map((option: QuizOption) => {
            const isSelected = answers[currentQuestion.id] === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleSelectOption(option.id)}
                className={`p-4 rounded-xl border ${
                  isSelected 
                    ? 'bg-blue-50 border-blue-600 dark:bg-blue-900/30' 
                    : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700'
                }`}
              >
                <View className="flex-row items-center">
                  <View className={`h-6 w-6 rounded-full border items-center justify-center mr-3 ${
                    isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {isSelected && <View className="h-2 w-2 rounded-full bg-white" />}
                  </View>
                  <Text className={`text-base ${isSelected ? 'text-blue-900 dark:text-blue-100 font-medium' : 'text-slate-700 dark:text-slate-300'}`}>
                    {option.text}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View className="flex-row items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <TouchableOpacity 
          onPress={handlePrev}
          disabled={currentIndex === 0}
          className={`px-6 py-3 rounded-xl ${currentIndex === 0 ? 'opacity-50' : ''}`}
        >
          <Text className="text-slate-500 dark:text-slate-400 font-semibold">Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleNext}
          className="bg-blue-600 px-8 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">
            {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
