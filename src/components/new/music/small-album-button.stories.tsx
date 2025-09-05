import type { Meta, StoryObj } from '@storybook/react-vite';

import { SmallMusicAlbum as SmallMusicAlbumComp } from './album-buttons';

const meta: Meta<typeof SmallMusicAlbumComp> = {
  component: SmallMusicAlbumComp
};

export default meta;
type Story = StoryObj<typeof SmallMusicAlbumComp>;

export const SmallMusicAlbum: Story = {
  args: {
    title: 'Album Title',
    albumURL: 'https://i.scdn.co/image/ab67616d0000b2734dcb6c5df15cf74596ab25a4',
  },
};
