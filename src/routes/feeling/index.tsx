import { Button } from '@/components/button';
import { FeelingTagButton } from '@/components/feeling-tag-button';
import { FEELINGS } from '@/constants/feelings';
import React from 'react';

export const SelectFeelings = () => {
  const [selectedFeelings, setSelectedFeelings] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (selectedFeelings.length > 3) {
      setSelectedFeelings((prev) => prev.slice(0, 3));
    }
  }, [selectedFeelings]);

  return (
    <div className='min-h-screen w-full flex flex-col items-center gap-2 px-4'>
      <div className='flex flex-col items-center gap-2 flex-grow'>
        <h2 className='heading2 pt-24'>오늘, 당신의 하루는 어땠나요?</h2>
        <p className='body-m font-medium text-gray500'>오늘의 감정과 맞는 태그를 3개 선택해보세요</p>
        <div className='grid grid-cols-3 gap-2 mt-12'>
          {Object.entries(FEELINGS).map(([key, value]) => (
            <FeelingTagButton
              key={key}
              onClick={() => {
                if (selectedFeelings.includes(key)) {
                  setSelectedFeelings((prev) => prev.filter((item) => item !== key));
                } else {
                  setSelectedFeelings((prev) => [...prev, key]);
                }
              }}
              selected={selectedFeelings.includes(key)}
            >
              {value}
            </FeelingTagButton>
          ))}
        </div>
      </div>
      <Button className='mt-4 mb-16' disabled={selectedFeelings.length === 0}>
        다음으로
      </Button>
    </div>
  );
};
