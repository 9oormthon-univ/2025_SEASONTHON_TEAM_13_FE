import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tag as TagComp } from './tag';

const meta: Meta<typeof TagComp> = {
  component: TagComp
};

export default meta;

type Story = StoryObj<typeof TagComp>;

export const Tag: Story = {
  args: {
    children: 'Tag',
  },
};
