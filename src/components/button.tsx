import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-lg font-bold transition-all cursor-pointer disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary/90 disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300/80'
      },
      size: {
        full: 'w-full p-4'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'full'
    }
  }
);

export const Button = ({ className, variant, size, asChild = false, ...props }: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp className={buttonVariants({ className, variant, size, ...props })} {...props} />
  );
};
