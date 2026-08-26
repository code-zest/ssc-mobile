import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Text } from './Text';

const buttonVariants = cva(
  'flex flex-row items-center justify-center rounded-xl min-h-[48px] px-4 py-3 transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary border border-primary',
        secondary: 'bg-secondary border border-secondary',
        outline: 'border-2 border-border bg-card',
        ghost: 'bg-transparent',
        destructive: 'bg-destructive border border-destructive',
      },
      size: {
        default: 'min-h-[48px]',
        sm: 'min-h-[44px] px-3 py-2 rounded-lg',
        lg: 'min-h-[56px] px-6 py-4 rounded-2xl',
        icon: 'min-h-[48px] w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const textVariants = cva('font-semibold text-center', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      outline: 'text-foreground',
      ghost: 'text-foreground',
      destructive: 'text-destructive-foreground',
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-lg',
      icon: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  title?: string;
  children?: React.ReactNode;
}

const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      title,
      disabled,
      children,
      activeOpacity = 0.8,
      ...props
    },
    ref
  ) => {
    return (
      <TouchableOpacity
        ref={ref as any}
        className={cn(buttonVariants({ variant, size, className }), disabled && 'opacity-50')}
        disabled={disabled}
        activeOpacity={activeOpacity}
        {...props}
      >
        {title ? (
          <Text className={cn(textVariants({ variant, size }))}>{title}</Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
