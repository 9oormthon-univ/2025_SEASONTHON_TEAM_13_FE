import { RemoveTagIcon } from '@/icons/remove-tag';
import { cn } from '@/lib/utils';
import type React from 'react';

export const Tag = ({ className, children, onClickRemove, ...props }: React.ComponentProps<'span'> & {
  onClickRemove?: () => void;
}) => {
  return (
    <div className='inline-flex gap-2 items-center justify-center rounded-md px-3 py-1 body-m font-medium w-fit whitespace-nowrap shrink-0 transition-colors overflow-hidden bg-[#FFEBEA]'>
      <span className={cn('text-primary', className)} {...props}>
        {children}
      </span>
      <RemoveTagIcon className='size-4 hover:cursor-pointer' onClick={onClickRemove} />
    </div>
  );
};
