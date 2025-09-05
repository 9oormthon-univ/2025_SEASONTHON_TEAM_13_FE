import type { Feed } from '@/types/feed';
import { useNavigate } from 'react-router-dom';
import heartActive from '@/assets/heart_active.svg';
import heart from '@/assets/heart.svg';
import comment from '@/assets/comment.svg';
import { useLikeFeed, useUnlikeFeed } from '@/hooks/useFeed';

export default function Card ({ item }: { item: Feed }) {
  const navigate = useNavigate();
  const { mutate: likeFeed } = useLikeFeed();
  const { mutate: unlikeFeed } = useUnlikeFeed();
  return (
    <div
      key={item.id}
      className='p-[25px] bg-white cursor-pointer'
      onClick={() => {
        navigate(`/feed/${item.id}`);
      }}
    >
      <div className='flex items-center gap-[12px] mb-[20px]'>
        <img src={item.userImageUrl} alt='user' className='w-[44px] h-[44px] rounded-full' />
        <div className='flex flex-col gap-[2px]'>
          <p className='text-gray800 text-[14px] font-semibold leading-[140%]'>{item.user}</p>
          <p className='text-gray400 text-[14px] leading-[140%]'>{item.createdAt}</p>
        </div>
      </div>
      <div className='w-full h-[80px]'>
        <iframe
          data-testid='embed-iframe'
          src={`https://open.spotify.com/embed/track/${item.trackId}?utm_source=generator&theme=0`}
          width='100%'
          height='100%'
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
          loading='lazy'
        />
      </div>
      <div className='flex gap-[6px] mt-[16px] mb-[12px] '>
        {item.dailyTags.map((tag, index) => (
          <div
            className='text-gray600 text-[14px] leading-[140%] font-medium'
            key={index}
          >{tag}
          </div>
        ))}
      </div>
      <div className='flex gap-[8px]'>
        {item.emotionTags.map((tag, index) => (
          <div
            className='border border-primary rounded-[100px] px-[16px] py-[4px] text-primary text-[14px] leading-[140%] font-medium bg-[#FFEBEA]'
            key={index}
          >{tag}
          </div>
        ))}
      </div>
      <div className='h-[1px] bg-[#E7E7E7] my-[20px]' />
      <div className='flex items-center gap-[16px]'>
        <div className='flex items-center gap-[4px]'>
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
          <p className='text-gray700 text-[15px] leading-[140%] font-medium'>{item.likeCount}</p>
        </div>
        <div className='flex items-center gap-[4px]'>
          <img src={comment} alt='comment' />
          <p className='text-gray700 text-[15px] leading-[140%] font-medium'>{item.commentCount}</p>
        </div>
      </div>
    </div>
  );
}
