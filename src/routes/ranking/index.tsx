import React from 'react';
import { EmotionCategoryButton } from '@/components/emotion-category-button';
import { ScrollArea, ScrollBar } from '@/components/scroll-area';
import { FEELINGS } from '@/constants/feelings';
import { BigMusicAlbum } from '@/components/new/music/album-buttons';
import { useSongRankPerTag } from '@/hooks/useTag';
import { usePlayerShown } from '@/hooks/usePlayerShown';
import { usePlaySong } from '@/hooks/usePlaySong';

export default function Ranking () {
  const [selectedEmotion, setSelectedEmotion] = React.useState<typeof FEELINGS[number]>(FEELINGS[0]);
  const currentDate = new Date();
  const { data: rankings } = useSongRankPerTag(selectedEmotion.name);
  const isPlayerShown = usePlayerShown();
  const playSong = usePlaySong();

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center gap-2 overflow-hidden ${isPlayerShown ? 'pb-51' : 'pb-31'}`}>
      <div
        className='absolute z-10 -top-[6.5rem] -left-[2rem] w-[calc(100%+4rem)] h-[12.7rem] rounded-[100%]'
        style={{
          background: 'linear-gradient(360deg, #EB5149 0%, #FF9F9A 50%)'
        }}
      />
      <div className='flex flex-col w-full h-48 bg-[#F8F8F8] justify-center items-center gap-2'>
        <img src={rankings[0]?.tracks[0]?.albumImageUrl} alt='1st music' className='size-24 rounded-sm z-20' />
        <p className='body-xl'>{rankings[0]?.tracks[0]?.trackTitle}</p>
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
            <p className='text-xs font-medium text-gray500'>이음: {rankings[0]?.tracks.length}</p>
            <p className='text-xs font-medium text-gray500'>{currentDate.getHours().toString().padStart(2, '0')}:{currentDate.getMinutes().toString().padStart(2, '0')} 기준</p>
          </div>
          <div className='flex flex-col gap-5'>
            {rankings[0]?.tracks.map((music, index) => (
              <div className='flex items-center' key={music.trackId}>
                <p className='w-7 font-semibold'>{index + 1}</p>
                <BigMusicAlbum title={music.trackTitle} albumURL={music.albumImageUrl} artist={music.artist} playCount={music.playCount} onClick={() => playSong(music.trackId)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
