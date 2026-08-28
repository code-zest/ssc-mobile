import React from 'react';
import { 
  View, 
  KeyboardAvoidingView, 
  ScrollView, 
  ViewProps
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ScreenProps extends ViewProps {
  children: React.ReactNode;
  /**
   * If true, wraps the content in a ScrollView.
   * Use true for forms or dynamic content that might exceed screen height.
   * Use false for fixed full-screen flex layouts (e.g. maps).
   * @default true
   */
  scrollable?: boolean;
  /**
   * If true, adds padding to the top to avoid the notch/status bar.
   * @default true
   */
  safeAreaTop?: boolean;
  /**
   * If true, adds padding to the bottom to avoid the home indicator.
   * @default false
   */
  safeAreaBottom?: boolean;
}

/**
 * A foundational layout component that standardizes screen-level behavior:
 * - Dark mode background canvas (`bg-background`)
 * - Modern SDK 35 edge-to-edge keyboard management (`behavior="padding"` universally)
 * - Safe area handling
 * - Optional scrolling
 */
export function Screen({ 
  children, 
  scrollable = true, 
  safeAreaTop = true,
  safeAreaBottom = false,
  className = '',
  style,
  ...rest 
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  const containerStyle = {
    paddingTop: safeAreaTop ? insets.top : 0,
    paddingBottom: safeAreaBottom ? insets.bottom : 0,
  };

  const content = scrollable ? (
    <ScrollView 
      contentContainerClassName="flex-grow"
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <View className={`flex-1 bg-background ${className}`} style={[containerStyle, style]} {...rest}>
      <KeyboardAvoidingView 
        behavior="padding"
        className="flex-1"
      >
        {content}
      </KeyboardAvoidingView>
    </View>
  );
}
