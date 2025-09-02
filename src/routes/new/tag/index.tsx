import React from 'react';
import { Button } from '@/components/button';
import { TextInput } from '@/components/text-input';
import { UserIcon } from '@/icons/user';
import { Tag } from '@/components/tag';

export const SelectTags = () => {
  const [tagText, setTagText] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);

  return (
    <div className='min-h-screen w-full flex flex-col items-center gap-2 px-4'>
      <div className='flex flex-col items-center gap-2 flex-grow w-full'>
        <h2 className='heading2 pt-24'>당신의 하루를 말해주세요</h2>
        <p className='body-m font-medium text-gray500'>사람들에게 당신의 하루를 태그로 소개해요</p>
        <div className='mt-14' />
        <TextInput
          placeholder='#오늘은 무슨 일이 있으셨나요?'
          icon={
            <div className='rounded-full bg-[#FFEBEA]'>
              <UserIcon className='size-7 text-primary rounded-full' />
            </div>
          }
          value={tagText}
          onChange={(e) => setTagText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && tagText.trim() !== '' && !tags.includes(tagText.trim())) {
              setTags([...tags, tagText.trim()]);
              setTagText('');
            }
          }}
          maxLength={30}
        />
        <div className='ml-auto'>
          <p className='text-xs font-medium text-gray400'>{tagText.length} / 30</p>
        </div>
        {tags.length > 0 && (
          <>
            <div className='bg-[#F8F8F8] w-full h-1 my-6' />
            <div className='flex flex-col w-full gap-4'>
              <p className='body-l font-semibold text-gray700'>입력한 태그</p>
              <div className='flex flex-wrap gap-2'>
                {tags.map((tag, index) => (
                  <Tag key={index}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Button className='mt-4 mb-16' disabled={tags.length === 0}>
        노래 추천 받기
      </Button>
    </div>
  );
};
