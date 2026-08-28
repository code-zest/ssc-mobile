import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { apiClient } from '../../api/apiClient';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Screen } from '../../components/layout/Screen';
import { FloatingCard } from '../../components/layout/FloatingCard';

import Animated, { FadeInDown } from 'react-native-reanimated';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setLoading(true);
      await apiClient.post('/auth/register', {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        password: data.password,
      });

      Alert.alert(
        'Success', 
        'Account created successfully. Please login.',
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
    <Screen scrollable safeAreaTop>
      <Animated.View 
        entering={FadeInDown.duration(500).springify().damping(18)}
        className="px-6 pt-8 pb-4"
      >
        <Text className="text-4xl font-bold text-foreground leading-tight tracking-tighter">
          Start your{'\n'}journey,{'\n'}
          <Text className="text-primary">aspirant.</Text>
        </Text>
        <Text className="text-base text-muted-foreground mt-3 leading-normal">
          Join 1,240 others building their{'\n'}streak today.
        </Text>
      </Animated.View>

      <View className="flex-1 justify-end px-4 pb-8 pt-4">
        <FloatingCard delay={100}>
          <View className="flex-row space-x-3">
            <View className="flex-1">
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="First Name"
                    autoCapitalize="words"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.firstName?.message}
                  />
                )}
              />
            </View>
            <View className="flex-1">
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Last Name"
                    autoCapitalize="words"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.lastName?.message}
                  />
                )}
              />
            </View>
          </View>

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
              label="Create Account" 
              onPress={() => handleSubmit(onSubmit)()} 
              loading={loading}
              consequential={true}
              size="lg"
            />
          </View>

          <View className="flex-row justify-center mt-6 items-center">
            <Text className="text-muted-foreground text-sm">Already have an account? </Text>
            <Button 
              label="Sign in" 
              variant="ghost" 
              size="sm"
              onPress={() => navigation.navigate('Login')}
              className="px-0 py-0 h-auto"
              textClassName="font-semibold text-sm"
            />
          </View>
        </FloatingCard>
      </View>
    </Screen>
  );
}
