import React from 'react';
import { Pressable, Text, ActivityIndicator, PressableProps } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  useReducedMotion 
} from 'react-native-reanimated';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  consequential?: boolean;
  children?: React.ReactNode;
  className?: string;
  textClassName?: string;
}

export function Button({ 
  label, 
  variant = 'primary', 
  size = 'md',
  loading = false, 
  consequential = false,
  className = '', 
  textClassName = '',
  disabled, 
  children,
  onPress,
  ...props 
}: ButtonProps) {
  
  const reducedMotion = useReducedMotion();
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ 
    transform: [{ scale: scale.value }] 
  }));

  const pressIn = () => { 
    if (!reducedMotion && !disabled && !loading) {
      scale.value = withSpring(0.96); 
    }
  };
  
  const pressOut = () => { 
    if (!reducedMotion) {
      scale.value = withSpring(1); 
    }
  };

  const handlePress = (e: any) => {
    if (disabled || loading) return;
    
    if (consequential) {
      ReactNativeHapticFeedback.trigger("impactLight", {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    }
    
    if (onPress) {
      onPress(e);
    }
  };

  const getContainerClass = () => {
    let base = "items-center justify-center flex-row min-h-[44px]";
    
    // Size variants
    if (size === 'sm') base += " h-10 px-4 rounded-lg";
    else if (size === 'lg') base += " h-14 px-6 rounded-2xl";
    else base += " h-12 px-5 rounded-xl";

    if (disabled || loading) {
      base += " opacity-50";
    }

    // Color variants
    switch (variant) {
      case 'primary': return `${base} bg-primary`;
      case 'secondary': return `${base} bg-secondary`;
      case 'outline': return `${base} border border-border bg-transparent`;
      case 'ghost': return `${base} bg-transparent py-2`;
      default: return `${base} bg-primary`;
    }
  };

  const getTextClass = () => {
    let base = "font-sans font-semibold";
    
    if (size === 'sm') base += " text-sm";
    else if (size === 'lg') base += " text-lg";
    else base += " text-base";

    switch (variant) {
      case 'primary': return `${base} text-primary-foreground ${textClassName}`.trim();
      case 'secondary': return `${base} text-secondary-foreground ${textClassName}`.trim();
      case 'outline': return `${base} text-foreground ${textClassName}`.trim();
      case 'ghost': return `${base} text-primary ${textClassName}`.trim();
      default: return `${base} text-primary-foreground ${textClassName}`.trim();
    }
  };

  const getSpinnerColor = () => {
    switch (variant) {
      case 'primary': return "white";
      case 'secondary': return "white";
      default: return "black";
    }
  };

  return (
    <Animated.View style={style} className={className}>
      <Pressable
        onPressIn={pressIn}
        onPressOut={pressOut}
        onPress={handlePress}
        disabled={disabled || loading}
        className={getContainerClass()}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color={getSpinnerColor()} className="mr-2" />
        ) : null}
        {children ? children : (
          <Text className={getTextClass()}>
            {label}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
}
