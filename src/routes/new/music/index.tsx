import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TextInput } from '@/components/text-input';
import { SmallMusicAlbum, BigMusicAlbum } from '@/components/new/music/album-buttons';
import { SearchIcon } from '@/icons/search';
// import { useNavigate } from 'react-router-dom';

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

export const SelectMusic = () => {
  const [musicSearchQuery, setMusicSearchQuery] = React.useState('');
  const [searchedMusics, setSearchedMusics] = React.useState<{
    title: string;
    albumURL: string;
    artist: string;
    playCount: number;
  }[]>([]);
  // const navigate = useNavigate();

  const onClickMusic = (music: { title: string; albumURL: string; artist: string; playCount: number }) => {
    // TODO: Handle music selection
    console.log(music);
    // navigate('/new/result');
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-center gap-2'>
      <div className='flex w-full py-6 px-4'>
        <button className='hover:cursor-pointer' onClick={() => window.history.back()}>
          <ChevronLeft className='size-7 text-gray800' />
        </button>
      </div>
      <div className='flex flex-col items-center gap-4 flex-grow w-full px-6'>
        <h2 className='heading2 text-3xl pt-8'>오늘의 하루와</h2>
        <h2 className='heading2 text-3xl -mt-4 text-primary'>어울리는 노래를 찾았어요</h2>
        <div className='mt-2' />
        <p className='body-m font-medium text-gray500'>마음에 드는 곡이 없다면, 음악을 직접 검색해보세요!</p>
        <TextInput
          placeholder='마음에 드는 곡이 없나요? 직접 검색해보세요'
          icon={
            <SearchIcon className='size-6 text-primary' />
          }
          value={musicSearchQuery}
          onChange={(e) => {
            setMusicSearchQuery(e.target.value);
            if (e.target.value === '') {
              setSearchedMusics([]);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && musicSearchQuery.trim() !== '') {
              // Block default behavior(submit)
              e.preventDefault();
              // TODO: Search for music based on the query
              // This requires backend to implement search functionality
              setSearchedMusics(musics);
            }
          }}
        />
        {
          searchedMusics.length === 0
            ? (
              <div className='grid grid-cols-4 gap-4 mt-12 w-full'>
                {musics
                  .map((music, index) => (
                    <SmallMusicAlbum
                      key={index} onClick={() => {
                        onClickMusic(music);
                      }} {...music}
                    />
                  ))}
              </div>
              )
            : (
              <div className='flex flex-col gap-4 mt-12 w-full'>
                {searchedMusics.map((music, index) => (
                  <BigMusicAlbum
                    key={index} onClick={() => {
                      onClickMusic(music);
                    }} {...music}
                  />
                ))}
              </div>
              )
        }
      </div>
    </div>
  );
};
