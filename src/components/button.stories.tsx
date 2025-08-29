import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'full',
  },
  argTypes: {
    variant: {
      options: ['primary'],
      control: { type: 'select' }
    },
    size: {
      options: ['full'],
      control: { type: 'select' }
    },
  }
};
