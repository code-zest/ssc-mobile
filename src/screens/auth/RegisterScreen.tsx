import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { apiClient } from '../../api/apiClient';

export function RegisterScreen({ navigation }: any) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      await apiClient.post('/auth/register', {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
      });

      Alert.alert(
        'Success',
        'Registration successful! Please check your email for the verification code.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
      
    } catch (error: any) {
      Alert.alert(
        'Registration Failed',
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
        <View className="mb-8 items-center">
          <Text className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create Account</Text>
          <Text className="text-slate-500 dark:text-slate-400 text-center">
            Join thousands of students cracking the SSC exams with Code Zest Academy.
          </Text>
        </View>

        <View className="space-y-4 mb-6">
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">First Name</Text>
              <TextInput
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white"
                placeholder="John"
                placeholderTextColor="#94a3b8"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View className="w-4" />
            <View className="flex-1">
              <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Name</Text>
              <TextInput
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white"
                placeholder="Doe"
                placeholderTextColor="#94a3b8"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

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
              placeholder="Create a password"
              placeholderTextColor="#94a3b8"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <TouchableOpacity 
          className="w-full bg-blue-600 rounded-xl py-4 items-center justify-center flex-row mb-6"
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" className="mr-2" />
          ) : null}
          <Text className="text-white font-semibold text-lg">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-slate-500 dark:text-slate-400">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-blue-600 font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
