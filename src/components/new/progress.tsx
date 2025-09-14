import type React from 'react';
import { cn } from '@/lib/utils';

const STEPS = 4 as const;

export const Progress = ({ selectedIndex = 0, className, ...props }: React.ComponentProps<'div'> & { selectedIndex: 0 | 1 | 2 | 3 }) => {
  return (
    <div className={cn('flex flex-row gap-1.5', className)} role='list' aria-label={`단계 ${selectedIndex + 1} / ${STEPS}`} {...props}>
      {Array.from({ length: STEPS }, (_, i) => i).map((i) => (
        <div key={i} className={`h-2 rounded-full ${i === selectedIndex ? 'bg-primary w-7' : 'bg-gray300 w-2'}`} role='listitem' aria-current={i === selectedIndex ? 'step' : undefined} aria-label={`단계 ${i + 1}`} />
      ))}
    </div>
  );
};
