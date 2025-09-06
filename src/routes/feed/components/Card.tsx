import type { Feed } from '@/types/feed';
import { useNavigate } from 'react-router-dom';
import heartActive from '@/assets/heart_active.svg';
import heart from '@/assets/heart.svg';
import comment from '@/assets/comment.svg';
import { useLikeFeed, useUnlikeFeed } from '@/hooks/useFeed';
import { getRelativeTime } from '@/lib/dateUtils';

interface CardProps {
  item: Feed;
  isProfile?: boolean;
}

export default function Card ({ item, isProfile = false }: CardProps) {
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
      <div className='w-full h-20'>
        <iframe
          data-testid='embed-iframe'
          src={`https://open.spotify.com/embed/track/${item.song.trackId}?utm_source=generator&theme=0`}
          width='100%'
          height='100%'
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
          loading='lazy'
        />
      </div>
      <div className='flex gap-1.5 mt-4 mb-3'>
        {item.dailyTags.map((tag, index) => (
          <div
            className='text-gray600 text-sm leading-[140%] font-medium'
            key={index}
          >{tag}
          </div>
        ))}
      </div>
      <div className='flex gap-2'>
        {item.emotionTags.map((tag, index) => (
          <div
            className='border border-primary rounded-[100px] px-4 py-1 text-primary text-sm leading-[140%] font-medium bg-[#FFEBEA]'
            key={index}
          >{tag}
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
