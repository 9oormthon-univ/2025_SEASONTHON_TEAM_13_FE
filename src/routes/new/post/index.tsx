import React from 'react';
import { Button } from '@/components/button';
import { FEELINGS } from '@/constants/feelings';
import { useGetUser } from '@/hooks/useUser';
import { useNewPagesProvider } from '@/providers/new-pages-provider';
import { useNavigate } from 'react-router-dom';
import { postFeed } from '@/apis/feed';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

export const CreateNewPost = () => {
  const { feelings, tags, music } = useNewPagesProvider();
  const { data: user } = useGetUser();
  const [posting, setPosting] = React.useState(false);
  const navigate = useNavigate();

  if (!feelings || feelings.length === 0 || !tags || tags.length === 0 || !music) {
    return (
      <div className='min-h-screen w-full flex flex-col items-center gap-2 px-4'>
        <div className='flex flex-col items-center gap-2 flex-grow'>
          <h2 className='heading2 pt-24'>잘못된 접근이에요!</h2>
          <p className='body-m font-medium text-gray500'>처음으로 돌아가서 다시 시도해주세요.</p>
        </div>
        <Button
          className='mt-4 mb-16' onClick={() => {
            navigate('/');
          }}
        >
          돌아가기
        </Button>
      </div>
    );
  }

  const postThePost = async () => {
    setPosting(true);
    try {
      await postFeed(feelings, tags, music.trackId);
      navigate('/feed');
    } catch (error) {
      toast.error('게시물 작성에 실패했어요. 잠시 후 다시 시도해주세요.');
      console.error(error);
    }
    setPosting(false);
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-center gap-2 px-4'>
      <div className='flex w-full py-6'>
        <button className='hover:cursor-pointer' onClick={() => window.history.back()}>
          <ChevronLeft className='size-7 text-gray800' />
        </button>
      </div>
      <div className='flex flex-col items-center gap-2 flex-grow'>
        <h2 className='heading2 pt-8'>오늘의 게시물이 완성됐어요!</h2>
        <p className='body-m font-medium text-gray500'>이제 오늘의 하루와 노래를 사람들과 공유해보세요</p>
      </div>
      <div
        className='p-6 bg-white w-full'
      >
        <div className='flex items-center gap-3 mb-5'>
          <img src={user.profileUrl} alt='user' className='size-11 rounded-full' />
          <div className='flex flex-col gap-0.5'>
            <p className='text-gray800 text-sm font-semibold leading-[140%]'>{user.username}</p>
            <p className='text-gray400 text-sm leading-[140%]'>방금</p>
          </div>
        </div>
        <div className='w-full h-20'>
          <iframe
            data-testid='embed-iframe'
            src={`https://open.spotify.com/embed/track/${music.trackId}?utm_source=generator&theme=0`}
            width='100%'
            height='100%'
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            loading='lazy'
          />
        </div>
        <div className='flex gap-1.5 mt-4 mb-3'>
          {tags.map((tag, index) => (
            <div
              className='text-gray600 text-sm leading-[140%] font-medium'
              key={index}
            >#{tag}
            </div>
          ))}
        </div>
        <div className='flex gap-2'>
          {feelings.map((tag, index) => (
            <div
              className='border border-primary rounded-[100px] px-4 py-1 text-primary text-sm leading-[140%] font-medium bg-[#FFEBEA]'
              key={index}
            >{FEELINGS.find((feeling) => feeling.name === tag)?.name ?? '알 수 없음'}
            </div>
          ))}
        </div>
      </div>
      <div className='flex w-full flex-grow flex-col justify-end'>
        <Button className='mt-4 mb-16' onClick={postThePost} disabled={posting}>
          {posting ? '게시 중...' : '시작하기'}
        </Button>
      </div>
    </div>
  );
};
