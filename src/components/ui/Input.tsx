import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useReducedMotion,
} from 'react-native-reanimated';

export interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export function Input({ label, error, className = '', value, onFocus, onBlur, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const progress = useSharedValue(value ? 1 : 0);

  const labelStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: withTiming(progress.value ? -16 : 0, { duration: reducedMotion ? 0 : 150 }) },
      { scale: withTiming(progress.value ? 0.85 : 1, { duration: reducedMotion ? 0 : 150 }) },
    ],
  }));

  return (
    <View className="mb-4">
      <View
        className={`flex-row items-center rounded-2xl px-4 pt-5 pb-2 min-h-[56px] ${
          error 
            ? 'bg-destructive/10 border border-destructive' 
            : focused 
              ? 'bg-muted/50' 
              : 'bg-muted/30'
        }`}
      >
        <View className="flex-1 justify-center relative">
          <Animated.Text 
            style={labelStyle} 
            className="absolute left-0 top-1.5 text-muted-foreground origin-left font-sans text-base"
          >
            {label}
          </Animated.Text>
          <TextInput
            value={value}
            className={`text-foreground font-sans text-base p-0 m-0 pt-3 ${className}`}
            onFocus={(e) => { 
              setFocused(true); 
              progress.value = withTiming(1); 
              onFocus?.(e); 
            }}
            onBlur={(e) => { 
              setFocused(false); 
              if (!value) progress.value = withTiming(0); 
              onBlur?.(e); 
            }}
            {...rest}
          />
        </View>
      </View>
      {error && (
        <Text className="text-sm text-destructive mt-1 font-sans">{error}</Text>
      )}
    </View>
  );
}
