import React from 'react';
import { View, ViewProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Text } from './Text';

const badgeVariants = cva(
  'flex flex-row items-center justify-center rounded-full px-2.5 py-0.5',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 border border-primary/20',
        secondary: 'bg-secondary border border-border',
        outline: 'border border-border text-foreground',
        
        /* Subjects */
        quant: 'bg-subject-quant/10 border border-subject-quant/20',
        english: 'bg-subject-english/10 border border-subject-english/20',
        ga: 'bg-subject-ga/10 border border-subject-ga/20',
        reason: 'bg-subject-reason/10 border border-subject-reason/20',
        science: 'bg-subject-science/10 border border-subject-science/20',
        
        /* Exams */
        cgl: 'bg-exam-cgl/10 border border-exam-cgl/20',
        chsl: 'bg-exam-chsl/10 border border-exam-chsl/20',
        mts: 'bg-exam-mts/10 border border-exam-mts/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const badgeTextVariants = cva('text-xs font-semibold', {
  variants: {
    variant: {
      default: 'text-primary',
      secondary: 'text-secondary-foreground',
      outline: 'text-foreground',
      
      quant: 'text-subject-quant',
      english: 'text-subject-english',
      ga: 'text-subject-ga',
      reason: 'text-subject-reason',
      science: 'text-subject-science',
      
      cgl: 'text-exam-cgl',
      chsl: 'text-exam-chsl',
      mts: 'text-exam-mts',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface BadgeProps
  extends ViewProps,
    VariantProps<typeof badgeVariants> {
  label: string;
}

function Badge({ className, variant, label, ...props }: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
      <Text className={cn(badgeTextVariants({ variant }))}>{label}</Text>
    </View>
  );
}

export { Badge, badgeVariants };
