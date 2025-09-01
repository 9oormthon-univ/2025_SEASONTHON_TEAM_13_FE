import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './navbar';

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    currentPath: {
      control: 'select',
      options: ['/', '/feed', '/search', '/ranking', '/calendar', '/profile'],
      description: '현재 페이지 경로',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {},
};

export const FeedActive: Story = {
  args: {
    currentPath: '/feed',
  },
};

export const SearchActive: Story = {
  args: {
    currentPath: '/search',
  },
};

export const RankingActive: Story = {
  args: {
    currentPath: '/ranking',
  },
};

export const CalendarActive: Story = {
  args: {
    currentPath: '/calendar',
  },
};

export const ProfileActive: Story = {
  args: {
    currentPath: '/profile',
  },
};
