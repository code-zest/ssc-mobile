import React from 'react';
import { ViewProps, Platform } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export interface FloatingCardProps extends ViewProps {
  children: React.ReactNode;
  /**
   * Adjusts the padding inside the card.
   * @default 'p-6'
   */
  padding?: string;
  /**
   * Stagger delay for the entrance animation.
   * @default 0
   */
  delay?: number;
}

/**
 * Standardized Floating Bento card container.
 * - Enforces `bg-card` and `rounded-3xl`
 * - Uses explicitly tuned elevation on Android to match iOS shadow aesthetics
 * - Adds a crisp 1px border for OLED definition
 */
export function FloatingCard({ 
  children, 
  padding = 'p-6',
  delay = 0,
  className = '', 
  style, 
  ...rest 
}: FloatingCardProps) {
  // We use inline styles for the shadow/elevation because NativeWind drop-shadows 
  // sometimes don't translate perfectly to Material elevation defaults on Android.
  const shadowStyle = Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 24,
    },
    android: {
      elevation: 8,
    },
  });

  return (
    <Animated.View 
      entering={FadeInDown.delay(delay).duration(400).springify().damping(18)}
      className={`bg-card rounded-3xl ${padding} ${className}`} 
      style={[shadowStyle, style]}
      {...rest}
    >
      {children}
    </Animated.View>
  );
}
