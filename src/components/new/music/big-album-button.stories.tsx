import type { Meta, StoryObj } from '@storybook/react-vite';

import { BigMusicAlbum as BigMusicAlbumComp } from './album-buttons';

const meta: Meta<typeof BigMusicAlbumComp> = {
  component: BigMusicAlbumComp
};

export default meta;
type Story = StoryObj<typeof BigMusicAlbumComp>;

export const BigMusicAlbum: Story = {
  args: {
    title: 'Album Title',
    albumURL: 'https://i.scdn.co/image/ab67616d0000b2734dcb6c5df15cf74596ab25a4',
    artist: 'Album Artist',
    playCount: 100,
  },
};
