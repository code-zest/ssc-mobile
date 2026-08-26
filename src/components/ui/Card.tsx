import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '../../utils/cn';
import { Text, TextProps } from './Text';

export interface CardProps extends ViewProps {}

const Card = React.forwardRef<View, CardProps>(({ className, ...props }, ref) => (
  <View
    ref={ref as any}
    className={cn(
      'rounded-2xl border border-border bg-card shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

export interface CardHeaderProps extends ViewProps {}

const CardHeader = React.forwardRef<View, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref as any}
      className={cn('flex flex-col space-y-1.5 p-5', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends TextProps {}

const CardTitle = React.forwardRef<any, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn('font-semibold text-lg leading-none tracking-tight text-card-foreground', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends TextProps {}

const CardDescription = React.forwardRef<any, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

export interface CardContentProps extends ViewProps {}

const CardContent = React.forwardRef<View, CardContentProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref as any} className={cn('p-5 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export interface CardFooterProps extends ViewProps {}

const CardFooter = React.forwardRef<View, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref as any}
      className={cn('flex flex-row items-center p-5 pt-0', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
