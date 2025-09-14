import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress as ProgressComp } from './progress';

const meta: Meta<typeof ProgressComp> = {
  component: ProgressComp
};

export default meta;
type Story = StoryObj<typeof ProgressComp>;

export const Progress: Story = {
  args: {
    selectedIndex: 1
  }
};
