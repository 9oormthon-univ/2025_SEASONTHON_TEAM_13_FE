import type React from 'react';
import { cn } from '@/lib/utils';

export const Progress = ({ selectedIndex = 0, className, ...props }: React.ComponentProps<'div'> & { selectedIndex: 0 | 1 | 2 | 3 }) => {
  return (
    <div className={cn('flex flex-row gap-1.5', className)} {...props}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={`h-2 rounded-full ${i === selectedIndex ? 'bg-primary w-7' : 'bg-gray300 w-2'}`} />
      ))}
    </div>
  );
};
