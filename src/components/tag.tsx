import { cn } from '@/lib/utils';
import type React from 'react';

export const Tag = ({ className, children, ...props }: React.ComponentProps<'span'>) => {
  return (
    <span className={cn('inline-flex items-center justify-center rounded-md px-3 py-1 body-m font-medium w-fit whitespace-nowrap shrink-0 transition-colors overflow-hidden bg-[#FFEBEA] text-primary', className)} {...props}>
      # {children}
    </span>
  );
};
