import type { Meta, StoryObj } from '@storybook/react-vite';

import { ScrollArea, ScrollBar } from './scroll-area';

const meta: Meta<typeof ScrollArea> = {
  component: ScrollArea,
  subcomponents: { ScrollBar },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const TestTexts = Array.from({ length: 100 }, (_, i) => (<p key={i}>{`Test ${i + 1}`}</p>));

export const Vertical: Story = {
  render: () => (
    <ScrollArea className='h-24 mt-2'>
      {TestTexts}
    </ScrollArea>
  )
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className='w-24 mt-2'>
      <div className='flex w-max space-x-4'>
        {TestTexts}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
};
