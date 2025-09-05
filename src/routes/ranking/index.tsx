import React from 'react';
import { EmotionCategoryButton } from '@/components/emotion-category-button';
import { ScrollArea, ScrollBar } from '@/components/scroll-area';
import { FEELINGS } from '@/constants/feelings';
import type { Music } from '@/types/music';
import { BigMusicAlbum } from '@/components/new/music/album-buttons';

const rankings: Music[] = [
  {
    id: '4kXdx4vRJnbkLqq9vmOytw',
    name: '귀로',
    artist: '정미조',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b2739af040c0d3ccb2cb673bf579',
    spotifyUrl: 'https://open.spotify.com/track/4kXdx4vRJnbkLqq9vmOytw',
    valence: 0,
    energy: 0,
    playCount: 0
  },
  {
    id: '17YfT1Iqp3g8ilIqsHuChm',
    name: '1024',
    artist: 'KOYOTE',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b2732ab38356d063ff626dd2da5f',
    spotifyUrl: 'https://open.spotify.com/track/17YfT1Iqp3g8ilIqsHuChm',
    valence: 0,
    energy: 0,
    playCount: 0
  },
  {
    id: '06JMCvJpXO8ITrJdkoyXsN',
    name: '2018 (이천십팔)',
    artist: 'Choi Seong',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b273b5a36a6b06f0908fe54261d1',
    spotifyUrl: 'https://open.spotify.com/track/06JMCvJpXO8ITrJdkoyXsN',
    valence: 0,
    energy: 0,
    playCount: 0
  },
  {
    id: '3rzVcHw0hwVgDEq5udhUJS',
    name: 'Young Girl A - one day After Another Remix',
    artist: 'Siinamota',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b2732b8ad0729c8d7a6570642ad5',
    spotifyUrl: 'https://open.spotify.com/track/3rzVcHw0hwVgDEq5udhUJS',
    valence: 0,
    energy: 0,
    playCount: 0
  }
];

export default function Ranking () {
  const [selectedEmotion, setSelectedEmotion] = React.useState<typeof FEELINGS[number]>(FEELINGS[0]);
  const currentDate = new Date();

  return (
    <div className='relative min-h-screen w-full flex flex-col items-center gap-2'>
      <div
        className='absolute z-10 -top-[6.5rem] -left-[2rem] w-[calc(100%+4rem)] h-[12.7rem] rounded-[100%]'
        style={{
          background: 'linear-gradient(360deg, #EB5149 0%, #FF9F9A 50%)'
        }}
      />
      <div className='flex flex-col w-full h-48 bg-[#F8F8F8] justify-center items-center gap-2'>
        <img src='/vite.svg' alt='1st music' className='size-24 rounded-sm z-20' />
        <p className='body-xl'>1st music title</p>
      </div>
      <div className='px-6 py-5 flex flex-col gap-6 w-full'>
        <div className='flex flex-col gap-2 w-full'>
          <p className='body-m font-medium text-gray500'>원하는 감정 태그를 선택해 인기차트를 확인해보세요</p>
          <ScrollArea className='max-w-full'>
            <div className='flex space-x-2 w-max py-1'>
              {FEELINGS.map(({ id, name }) => (
                <EmotionCategoryButton key={id} selected={selectedEmotion.id === id} onClick={() => setSelectedEmotion(FEELINGS.find(feeling => feeling.id === id)!)}>
                  {name}
                </EmotionCategoryButton>
              ))}
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex justify-between'>
            <p className='text-xs font-medium text-gray500'>이음: {rankings.length}</p>
            <p className='text-xs font-medium text-gray500'>{currentDate.getHours().toString().padStart(2, '0')}:{currentDate.getMinutes().toString().padStart(2, '0')} 기준</p>
          </div>
          <div className='flex flex-col gap-5'>
            {rankings.map((music, index) => (
              <div className='flex items-center' key={music.id}>
                <p className='w-7 font-semibold'>{index + 1}</p>
                <BigMusicAlbum title={music.name} albumURL={music.imageUrl} artist={music.artist} playCount={music.playCount} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
