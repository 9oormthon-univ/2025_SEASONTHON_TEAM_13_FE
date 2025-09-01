import type React from 'react';

export const UserIcon = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#clip0_323_350)'>
        <path d='M25 30.5V28C25 26.6739 24.4732 25.4021 23.5355 24.4645C22.5979 23.5268 21.3261 23 20 23H10C8.67392 23 7.40215 23.5268 6.46447 24.4645C5.52678 25.4021 5 26.6739 5 28V30.5' fill='currentColor' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        <path d='M15 18C17.7614 18 20 15.7614 20 13C20 10.2386 17.7614 8 15 8C12.2386 8 10 10.2386 10 13C10 15.7614 12.2386 18 15 18Z' fill='currentColor' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      </g>
      <defs>
        <clipPath id='clip0_323_350'>
          <rect width='30' height='30' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
