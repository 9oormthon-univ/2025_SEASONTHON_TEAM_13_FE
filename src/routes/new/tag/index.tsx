import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/button';
import { TextInput } from '@/components/text-input';
import { UserIcon } from '@/icons/user';
import { Tag } from '@/components/tag';
import { useNavigate } from 'react-router-dom';
import { useNewPagesProvider } from '@/providers/new-pages-provider';

export const SelectTags = () => {
  const [tagText, setTagText] = React.useState('');
  const { tags, setTags } = useNewPagesProvider();
  const navigate = useNavigate();

  return (
    <div className='min-h-screen w-full flex flex-col items-center gap-2'>
      <div className='flex w-full py-6 px-4'>
        <button className='hover:cursor-pointer' onClick={() => window.history.back()}>
          <ChevronLeft className='size-7 text-gray800' />
        </button>
      </div>
      <div className='flex flex-col items-center gap-2 flex-grow w-full px-4'>
        <h2 className='heading2 pt-8'>당신의 하루를 말해주세요</h2>
        <p className='body-m font-medium text-gray500'>사람들에게 당신의 하루를 태그로 소개해요</p>
        <div className='mt-14' />
        <TextInput
          placeholder='입력 후 스페이스바를 누르세요'
          icon={
            <div className='rounded-full bg-[#FFEBEA]'>
              <UserIcon className='size-7 text-primary rounded-full' />
            </div>
          }
          value={tagText}
          onChange={(e) => {
            if (!e.target.value.endsWith(' ')) {
              setTagText(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === ' ' && tagText.trim() !== '' && !tags.includes(tagText.trim())) {
              setTags([...tags, tagText.trim()]);
              setTagText('');
            }
          }}
          disabled={tags.length >= 3}
          maxLength={30}
        />
        <div className='ml-auto'>
          <p className='text-xs font-medium text-gray400'>{tagText.length} / 30</p>
        </div>
        {tags.length > 0 && (
          <>
            <div className='bg-[#F8F8F8] w-full h-1 my-6' />
            <div className='flex flex-col w-full gap-4'>
              <div className='flex items-center gap-4'>
                <p className='body-l font-semibold text-gray700'>입력한 태그</p>
                <p className='body-s font-medium text-gray500'>최대 3개까지 가능합니다</p>
              </div>
              <div className='flex flex-wrap gap-2'>
                {tags.map((tag, index) => (
                  <Tag
                    key={index} onClickRemove={() => {
                      setTags(tags.filter((t) => t !== tag));
                    }}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className='px-4 w-full'>
        <Button
          className='mt-4 mb-16' disabled={tags.length === 0} onClick={() => {
            navigate('/new/music');
          }}
        >
          노래 추천 받기
        </Button>
      </div>
    </div>
  );
};
