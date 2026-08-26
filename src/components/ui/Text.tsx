import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

export interface TextProps extends RNTextProps {
  variant?: 'sans' | 'display' | 'mono';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

/**
 * Global Text component matching the client design system typography.
 */
export const Text = React.forwardRef<RNText, TextProps>(
  ({ className, variant = 'sans', weight = 'normal', ...props }, ref) => {
    // Determine font family utility class based on variant
    let fontFamilyClass = 'font-sans';
    if (variant === 'mono') fontFamilyClass = 'font-mono';
    if (variant === 'display') fontFamilyClass = 'font-display';
    
    // Determine font weight class
    let fontWeightClass = 'font-normal';
    switch (weight) {
      case 'medium':
        fontWeightClass = 'font-medium';
        break;
      case 'semibold':
        fontWeightClass = 'font-semibold';
        break;
      case 'bold':
        fontWeightClass = 'font-bold';
        break;
    }

    return (
      <RNText
        ref={ref as any}
        className={`text-foreground ${fontFamilyClass} ${fontWeightClass} ${className || ''}`}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';
