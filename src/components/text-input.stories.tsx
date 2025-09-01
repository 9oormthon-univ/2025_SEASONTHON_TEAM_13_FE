import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput as TextInputComp } from './text-input';
import { SearchIcon } from '@/icons/search';
import { UserIcon } from '@/icons/user';

const meta: Meta<typeof TextInputComp> = {
  component: TextInputComp
};

export default meta;
type Story = StoryObj<typeof TextInputComp>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  }
};

export const WithRightIcon: Story = {
  args: {
    placeholder: 'Search...',
    icon: <SearchIcon className='size-6 text-primary' />,
    position: 'right'
  }
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: "What's happening?",
    icon: <div className='rounded-full bg-[#FFEBEA]'>
      <UserIcon className='size-6 text-primary rounded-full' />
      {/* eslint-disable-next-line @stylistic/jsx-closing-tag-location */}
    </div>,
    position: 'left'
  }
};
