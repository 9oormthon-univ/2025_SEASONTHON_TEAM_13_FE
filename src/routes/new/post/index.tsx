import { Button } from '@/components/button';
import { useNewPagesProvider } from '@/providers/new-pages-provider';
import { useNavigate } from 'react-router-dom';

export const CreateNewPost = () => {
  const { feelings, tags, music } = useNewPagesProvider();
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

  return (
    <div className='min-h-screen w-full flex flex-col items-center gap-2 px-4'>
      <div className='flex flex-col items-center gap-2 flex-grow'>
        <h2 className='heading2 pt-24'>오늘의 게시물이 완성됐어요!</h2>
        <p className='body-m font-medium text-gray500'>이제 오늘의 하루와 노래를 사람들과 공유해보세요</p>
      </div>
      {/* TODO: Use(or even make) post preview component here */}
      <div className='flex w-full flex-grow flex-col justify-end'>
        <Button className='mt-4 mb-16'>
          시작하기
        </Button>
      </div>
    </div>
  );
};
