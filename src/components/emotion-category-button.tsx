import React from 'react';
import { cn } from '@/lib/utils';

export const EmotionCategoryButton = ({ className, selected = false, ...props }: React.ComponentProps<'button'> & {
  selected?: boolean
}) => {
  return (
    <button
      className={cn(
        'inline-flex justify-center rounded-full border border-gray100 bg-gray100 text-gray400 px-3 py-1 text-sm font-medium hover:cursor-pointer transition-colors disabled:cursor-not-allowed disabled:bg-gray300 disabled:text-gray500',
        selected && 'border-primary bg-[#FFEBEA] text-primary',
        className
      )} {...props}
    />
  );
};
