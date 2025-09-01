import { Search } from '@/icons/search';
import { cn } from '@/lib/utils';
import type React from 'react';

export const SearchBar = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return (
    <div className='flex w-full rounded-md bg-[#F6F6F6] px-4 py-3.5 gap-3 border border-gray200 focus-within:border-primary transition-colors'>
      <input
        type='text'
        className={cn(
          'flex-grow border-0 bg-transparent border-none caret-primary placeholder:text-[#A0A0A0] focus:outline-none focus:ring-0',
          className
        )}
        placeholder='Search...'
        {...props}
      />
      <Search className='size-6 text-primary' />
    </div>
  );
};
