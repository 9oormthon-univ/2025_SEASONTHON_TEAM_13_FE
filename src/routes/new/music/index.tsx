import React from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { TextInput } from '@/components/text-input';
import { SearchIcon } from '@/icons/search';
import { DiscIcon } from '@/icons/disc';

// Dummy musics
const musics: {
  title: string;
  albumURL: string;
  artist: string;
  playCount: number;
}[] = [
  {
    title: 'Album 1',
    albumURL: '/vite.svg',
    artist: 'Artist 1',
    playCount: 100
  },
  {
    title: 'Album 2',
    albumURL: '/vite.svg',
    artist: 'Artist 2',
    playCount: 200
  },
  {
    title: 'Album 3',
    albumURL: '/vite.svg',
    artist: 'Artist 3',
    playCount: 300
  },
  {
    title: 'Album 4',
    albumURL: '/vite.svg',
    artist: 'Artist 4',
    playCount: 400
  },
  {
    title: 'Album 1',
    albumURL: '/vite.svg',
    artist: 'Artist 1',
    playCount: 100
  },
  {
    title: 'Album 2',
    albumURL: '/vite.svg',
    artist: 'Artist 2',
    playCount: 200
  },
  {
    title: 'Album 3',
    albumURL: '/vite.svg',
    artist: 'Artist 3',
    playCount: 300
  },
  {
    title: 'Album 4',
    albumURL: '/vite.svg',
    artist: 'Artist 4',
    playCount: 400
  },
  {
    title: 'Album 1',
    albumURL: '/vite.svg',
    artist: 'Artist 1',
    playCount: 100
  },
  {
    title: 'Album 2',
    albumURL: '/vite.svg',
    artist: 'Artist 2',
    playCount: 200
  },
  {
    title: 'Album 3',
    albumURL: '/vite.svg',
    artist: 'Artist 3',
    playCount: 300
  },
  {
    title: 'Album 4',
    albumURL: '/vite.svg',
    artist: 'Artist 4',
    playCount: 400
  },
  {
    title: 'Album 1',
    albumURL: '/vite.svg',
    artist: 'Artist 1',
    playCount: 100
  },
  {
    title: 'Album 2',
    albumURL: '/vite.svg',
    artist: 'Artist 2',
    playCount: 200
  },
  {
    title: 'Album 3',
    albumURL: '/vite.svg',
    artist: 'Artist 3',
    playCount: 300
  },
  {
    title: 'Album 4',
    albumURL: '/vite.svg',
    artist: 'Artist 4',
    playCount: 400
  },
  {
    title: 'Album 1',
    albumURL: '/vite.svg',
    artist: 'Artist 1',
    playCount: 100
  },
  {
    title: 'Album 2',
    albumURL: '/vite.svg',
    artist: 'Artist 2',
    playCount: 200
  },
  {
    title: 'Album 3',
    albumURL: '/vite.svg',
    artist: 'Artist 3',
    playCount: 300
  },
  {
    title: 'Album 4',
    albumURL: '/vite.svg',
    artist: 'Artist 4',
    playCount: 400
  },
];

const SmallMusicAlbum = ({ title, albumURL }: { title: string; albumURL: string }) => {
  return (
    <div className='flex flex-col justify-center gap-2'>
      <img src={albumURL} alt={title} className='w-full h-auto rounded' />
      <p className='text-sm font-medium text-center'>{title}</p>
    </div>
  );
};

const BigMusicAlbum = ({ title, albumURL, artist, playCount }: {
  title: string;
  albumURL: string;
  artist: string;
  playCount: number;
}) => {
  return (
    <div className='flex justify-center items-center gap-4 w-full'>
      <img src={albumURL} alt={title} className='w-16 h-auto rounded' />
      <div className='flex flex-grow flex-col'>
        <p className='font-medium'>{title}</p>
        <p className='text-xs font-medium text-gray500'>{artist}</p>
        <div className='flex items-center gap-1'>
          <DiscIcon className='size-4 text-gray500' />
          <p className='text-xs font-medium text-gray500'>{playCount}</p>
        </div>
      </div>
      <MoreHorizontal className='size-6 text-[#777777] hover:cursor-pointer' />
    </div>
  );
};

export const SelectMusic = () => {
  const [musicSearchQuery, setMusicSearchQuery] = React.useState('');

  return (
    <div className='min-h-screen w-full flex flex-col items-center gap-2'>
      <div className='flex w-full py-6 px-4'>
        <button className='hover:cursor-pointer' onClick={() => window.history.back()}>
          <ChevronLeft className='size-7 text-gray800' />
        </button>
      </div>
      <div className='flex flex-col items-center gap-2 flex-grow w-full px-6'>
        <h2 className='heading2 pt-8'>오늘의 기분은 이런 것 같아요</h2>
        <p className='body-m font-medium text-gray500'>마음에 드는 곡이 없다면, 어울리는 음악을 직접 찾아보세요</p>
        <div className='mt-14' />
        <TextInput
          placeholder='마음에 드는 곡이 없나요? 직접 검색해보세요'
          icon={
            <SearchIcon className='size-6 text-primary' />
          }
          value={musicSearchQuery}
          onChange={(e) => setMusicSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && musicSearchQuery.trim() !== '') {
              // Block default behavior(submit)
              e.preventDefault();
              // TODO: Search for music based on the query
              // This requires backend to implement search functionality
            }
          }}
        />
        {
          musicSearchQuery === ''
            ? (
              <div className='grid grid-cols-4 gap-4 mt-12 w-full'>
                {musics
                  .map((music) => (
                    <SmallMusicAlbum key={music.title} {...music} />
                  ))}
              </div>
              )
            : (
              <div className='flex flex-col gap-4 mt-12 w-full'>
                {musics.map((music) => (
                  <BigMusicAlbum key={music.title} {...music} />
                ))}
              </div>
              )
        }
      </div>
    </div>
  );
};
