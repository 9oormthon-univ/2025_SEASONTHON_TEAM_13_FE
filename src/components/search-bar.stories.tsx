import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchBar as SearchBarComp } from './search-bar';

const meta: Meta<typeof SearchBarComp> = {
  component: SearchBarComp
};

export default meta;
type Story = StoryObj<typeof SearchBarComp>;

export const SearchBar: Story = {
  args: {
    placeholder: 'Search...',
  },
  argTypes: {
    value: {
      control: { type: 'text' }
    }
  }
};
