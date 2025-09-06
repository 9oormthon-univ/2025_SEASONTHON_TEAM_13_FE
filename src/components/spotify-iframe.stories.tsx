import type { Meta, StoryObj } from '@storybook/react-vite';

import { SpotifyIframe as SpotifyIframeComp } from './spotify-iframe';

const meta: Meta<typeof SpotifyIframeComp> = {
  component: SpotifyIframeComp
};

export default meta;
type Story = StoryObj<typeof SpotifyIframeComp>;

export const SpotifyIframe: Story = {
  args: {
    id: '3rzVcHw0hwVgDEq5udhUJS'
  }
};
