import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '../../store/useAuthStore';
import { apiClient } from '../../api/apiClient';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Screen } from '../../components/layout/Screen';
import { FloatingCard } from '../../components/layout/FloatingCard';

import Animated, { FadeInDown } from 'react-native-reanimated';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const { setCredentials } = useAuthStore();

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      const response = await apiClient.post('/auth/login', {
        email: data.email.trim(),
        password: data.password,
      });

      const { user, tokens } = response.data.data;
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
    <Screen scrollable safeAreaTop>
      <Animated.View 
        entering={FadeInDown.duration(500).springify().damping(18)}
        className="px-6 pt-10 pb-4"
      >
        <Text className="text-5xl font-bold text-foreground leading-tight tracking-tighter">
          Welcome{'\n'}back,{'\n'}
          <Text className="text-primary">aspirant.</Text>
        </Text>
        <Text className="text-base text-muted-foreground mt-4 leading-normal">
          Day 14 of your CGL prep streak.{'\n'}Pick up where you left off.
        </Text>

        <View className="flex-row mt-8 items-start">
          <View className="w-4 h-4 rounded-sm border-2 border-primary/50 items-center justify-center mr-3 mt-1 bg-primary/10" />
          <Text className="text-muted-foreground text-sm font-medium leading-tight">
            <Text className="text-foreground">1,240</Text> aspirants studied{'\n'}today
          </Text>
        </View>
      </Animated.View>

      <View className="flex-1 justify-end px-4 pb-8 pt-6">
        <FloatingCard delay={100}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.password?.message}
              />
            )}
          />

          <View className="mt-2">
            <Button 
              label="Sign in" 
              onPress={() => handleSubmit(onSubmit)()} 
              loading={loading}
              consequential={true}
              size="lg"
            />
          </View>

          <View className="flex-row justify-center mt-6 items-center">
            <Text className="text-muted-foreground text-sm">New here? </Text>
            <Button 
              label="Create account" 
              variant="ghost" 
              size="sm"
              onPress={() => navigation.navigate('Register')}
              className="px-0 py-0 h-auto"
              textClassName="font-semibold text-sm"
            />
          </View>
        </FloatingCard>
      </View>
    </Screen>
  );
}
