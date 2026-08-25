import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { apiClient } from '../../api/apiClient';

export function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setCredentials } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      // Calls the same ssc-api backend we built for the web client
      const response = await apiClient.post('/auth/login', {
        email: email.trim(),
        password,
      });

      const { user, tokens } = response.data.data;
      
      // Store token in keychain via Zustand store
      await setCredentials(user, tokens.accessToken);
      
    } catch (error: any) {
      Alert.alert(
        'Login Failed',
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white dark:bg-slate-900"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <View className="mb-10 items-center">
          <View className="h-16 w-16 rounded-2xl bg-blue-600 items-center justify-center mb-4">
            <Text className="text-white text-3xl font-bold">C</Text>
          </View>
          <Text className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</Text>
          <Text className="text-slate-500 dark:text-slate-400 text-center">
            Login to continue your preparation with Code Zest Academy.
          </Text>
        </View>

        <View className="space-y-4 mb-6">
          <View>
            <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</Text>
            <TextInput
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white"
              placeholder="Enter your email"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</Text>
            <TextInput
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white"
              placeholder="Enter your password"
              placeholderTextColor="#94a3b8"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <TouchableOpacity 
          className="w-full bg-blue-600 rounded-xl py-4 items-center justify-center flex-row mb-6"
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" className="mr-2" />
          ) : null}
          <Text className="text-white font-semibold text-lg">
            {loading ? 'Logging in...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-slate-500 dark:text-slate-400">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-blue-600 font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
