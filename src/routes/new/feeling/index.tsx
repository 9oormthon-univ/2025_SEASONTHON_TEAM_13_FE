import { Button } from '@/components/button';
import { FeelingTagButton } from '@/components/feeling-tag-button';
import { FEELINGS } from '@/constants/feelings';
import { useNewPagesProvider } from '@/providers/new-pages-provider';
import { useNavigate } from 'react-router-dom';

export const SelectFeelings = () => {
  const { feelings, setFeelings } = useNewPagesProvider();
  const navigate = useNavigate();

  return (
    <div className='min-h-screen w-full flex flex-col items-center gap-2 px-4'>
      <div className='flex flex-col items-center gap-2 flex-grow'>
        <h2 className='heading2 pt-24'>오늘, 당신의 하루는 어땠나요?</h2>
        <p className='body-m font-medium text-gray500'>오늘의 감정과 맞는 태그를 3개 선택해보세요</p>
        <div className='grid grid-cols-3 gap-2 mt-12'>
          {FEELINGS.map(({ id, emoji, name }) => (
            <FeelingTagButton
              key={id}
              onClick={() => {
                setFeelings((prev) => {
                  if (prev.includes(id)) {
                    return prev.filter((item) => item !== id);
                  }
                  if (prev.length < 3) {
                    return [...prev, id];
                  } else {
                    return prev;
                  }
                });
              }}
              disabled={!feelings.includes(id) && feelings.length >= 3}
              selected={feelings.includes(id)}
            >
              {emoji} {name}
            </FeelingTagButton>
          ))}
        </div>
      </div>
      <Button className='mt-4 mb-16' disabled={feelings.length === 0} onClick={() => navigate('/new/tag')}>
        다음으로
      </Button>
    </div>
  );
};
