import React from 'react';
import type { Feed, Song } from '@/types/feed';
import { useNavigate } from 'react-router-dom';
import heartActive from '@/assets/heart_active.svg';
import heart from '@/assets/heart.svg';
import comment from '@/assets/comment.svg';
import { useLikeFeed, useUnlikeFeed } from '@/hooks/useFeed';
import { getRelativeTime } from '@/lib/dateUtils';
import { DiscIcon } from '@/icons/disc';
import { usePlaySong } from '@/hooks/usePlaySong';

const AlbumButton = ({ song }: { song: Song }) => {
  const playSong = usePlaySong();

  const onClickTrack = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    await playSong(song.trackId);
  };

  return (
    <div
      className='h-21.5 rounded-md bg-cover bg-center hover:cursor-pointer' onClick={onClickTrack} style={{
        backgroundImage: `url(${song.albumArtUrl})`,
      }}
    >
      <div className='w-full h-full flex flex-row p-3 gap-8.5 backdrop-blur-sm bg-black/50 rounded-md'>
        <div className='min-w-0 flex flex-col flex-grow flex-shrink'>
          <p className='text-white text-lg font-bold overflow-ellipsis overflow-hidden whitespace-nowrap'>{song.title}</p>
          <p className='text-gray300 text-sm font-medium overflow-ellipsis overflow-hidden whitespace-nowrap'>{song.artist}</p>
        </div>
        <div className='flex gap-1 flex-grow-0 flex-shrink-0'>
          <DiscIcon className='size-4 text-gray300' />
          <p className='text-xs font-medium text-gray300'>{song.playCount}</p>
        </div>
      </div>
    </div>
  );
};

interface CardProps {
  item: Feed;
  isProfile?: boolean;
}

export default function Card ({
  item,
  isProfile = false,
}: CardProps) {
  const navigate = useNavigate();
  const { mutate: likeFeed } = useLikeFeed();
  const { mutate: unlikeFeed } = useUnlikeFeed();

  return (
    <div
      key={item.id}
      className='p-6 bg-white cursor-pointer'
      onClick={() => {
        navigate(`/feed/${item.id}`);
      }}
    >
      {!isProfile &&
      (
        <div className='flex items-center gap-3 mb-5'>
          <img src={item.userImageUrl} alt='user' className='size-11 rounded-full' />
          <div className='flex flex-col gap-0.5'>
            <p className='text-gray800 text-sm font-semibold leading-[140%]'>{item.user}</p>
            <p className='text-gray400 text-sm leading-[140%]'>{getRelativeTime(item.createdAt)}</p>
          </div>
        </div>
      )}
      <div className='flex gap-2 mb-3'>
        {item.emotionTags.map((tag, index) => (
          <div
            className='border border-primary rounded-[100px] px-4 py-1 text-primary text-sm leading-[140%] font-medium bg-[#FFEBEA]'
            key={index}
          >{tag}
          </div>
        ))}
      </div>
      <div className='w-full h-21.5'>
        <AlbumButton song={item.song} />
      </div>
      <div className='flex gap-1.5 mt-2 mb-3'>
        {item.dailyTags.map((tag, index) => (
          <div
            className='text-gray600 text-sm leading-[140%] font-medium'
            key={index}
          >#{tag}
          </div>
        ))}
      </div>
      <div className='h-[1px] bg-[#E7E7E7] my-5' />
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1'>
          <img
            src={item.likeState ? heartActive : heart} alt='heart' className='cursor-pointer' onClick={(e) => {
              e.stopPropagation();
              if (item.likeState) {
                unlikeFeed(item.id);
              } else {
                likeFeed(item.id);
              }
            }}
          />
          <p className='text-gray700 text-sm leading-[140%] font-medium'>{item.likeCount}</p>
        </div>
        <div className='flex items-center gap-1'>
          <img src={comment} alt='comment' />
          <p className='text-gray700 text-sm leading-[140%] font-medium'>{item.commentCount}</p>
        </div>
      </div>
    </div>
  );
}
