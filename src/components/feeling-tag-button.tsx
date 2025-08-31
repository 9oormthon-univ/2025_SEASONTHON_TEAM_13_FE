import React from 'react';
import { cn } from '@/lib/utils';

export const FeelingTagButton = ({ className, ...props }: React.ComponentProps<'button'>) => {
  return (
    <button className={cn('inline-flex rounded-full border-1 border-[#E6E6E6] px-3 py-1 text-sm hover:cursor-pointer', className)} {...props} />
  );
};
