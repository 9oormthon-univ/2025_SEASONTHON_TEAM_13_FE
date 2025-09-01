import React from 'react';
import { cn } from '@/lib/utils';

export const FeelingTagButton = ({ className, selected = false, ...props }: React.ComponentProps<'button'> & {
  selected?: boolean
}) => {
  return (
    <button
      className={cn(
        'inline-flex rounded-full border-1 border-[#E6E6E6] px-6 py-2 text-sm font-medium hover:cursor-pointer transition-colors',
        selected && 'border-primary bg-[#FFEBEA] text-primary',
        className
      )} {...props}
    />
  );
};
