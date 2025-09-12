import React, { Suspense } from 'react';
import Lottie from 'lottie-react';
import { useInView } from 'react-intersection-observer';
import { TextInput } from '@/components/text-input';
import { SearchIcon } from '@/icons/search';
import Card from '../feed/components/Card';
import { useTagRankings } from '@/hooks/useTag';
import loading from '@/assets/loading.json';
import { useSearchFeeds } from '@/hooks/useFeed';
// import { useIFrameAPIContext } from '@/providers/iframe-api-provider';

const SearchResult = ({ query, onNotFound }: { query: string, onNotFound: () => void }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchFeeds(query);
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
  });
  const searchResults = data?.pages.flat() || [];

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  React.useEffect(() => {
    if (data?.pages[0]?.length === 0) {
      onNotFound();
    }
  }, [data, onNotFound]);

  return (
    <div className='flex flex-col w-full gap-2.5'>
      <div className='relative w-full h-32 -pt-8 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFE7E7] to-[#FF9C96] gap-2'>
        <div className='absolute top-6 size-60 bg-primary rounded-full blur-[50px]' />
        <p className='text-3xl font-extrabold z-10 text-white'>#{query}</p>
        <p className='text-xs font-medium z-10 text-white text-center'>해당 키워드의 '이음'이에요.<br />
          관련 태그의 모든 글을 볼 수 있어요!
        </p>
      </div>
      {searchResults.map(result => (
        // <Card key={result.id} item={result} iFrameAPI={iFrameAPI} />
        <Card key={result.id} item={result} />
      ))}
      <div ref={loadMoreRef} className='h-10 flex items-center justify-center'>
        {isFetchingNextPage && (
          <Lottie animationData={loading} loop style={{ height: 80, width: '100%' }} />
        )}
      </div>
    </div>
  );
};

export default function Search () {
  const [input, setInput] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [resultEmpty, setResultEmpty] = React.useState(false);

  const { data: tagRankings } = useTagRankings();
  // const iFrameAPI = useIFrameAPIContext();

  React.useEffect(() => {
    setResultEmpty(false);
  }, [searchQuery]);

  return (
    <div className='relative min-h-screen w-full flex flex-col items-center gap-10 pb-31'>
      <div className='px-7 pt-7 w-full'>
        <TextInput
          value={input} onChange={
        (e) => {
          setInput(e.target.value.trim());
          if (e.target.value.trim() === '') {
            setSearchQuery('');
          }
        }
      } placeholder='검색어를 입력하세요...' icon={
        <SearchIcon className='size-6 text-primary' />
      } position='right' onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          setSearchQuery(input);
        }
      }}
        />
      </div>
      {!searchQuery || resultEmpty
        ? (
          <div className='flex flex-col w-full gap-4 px-7'>
            {resultEmpty && (<p className='text-sm font-medium text-gray400 text-center pb-25'>검색 결과가 없습니다.</p>)}
            <p className='text-sm font-medium text-gray500'>실시간 검색 순위</p>
            <div className='flex flex-col w-full gap-8'>
              <div className='flex flex-col w-full gap-5'>
                <p className='text-lg font-bold'>감정 태그</p>
                <div className='grid grid-cols-2 grid-rows-5 grid-flow-col w-full gap-4.5'>
                  {tagRankings.emotionTags.slice(0, 10).map(({ tagName }, index) => (
                    <div
                      className='flex gap-2.5 w-full cursor-pointer' key={tagName} onClick={() => {
                        setSearchQuery(tagName);
                        setInput(tagName);
                      }}
                    >
                      <p className={`size-5 pl-1 text-sm font-semibold ${index < 3 ? 'text-primary' : ''}`}>{index + 1}</p>
                      <p className='text-sm font-medium'>{tagName}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='bg-[#F8F8F8] w-full h-0.5' />
              <div className='flex flex-col w-full gap-5'>
                <p className='text-lg font-bold'>하루 태그</p>
                <div className='grid grid-cols-2 grid-rows-5 grid-flow-col w-full gap-4.5'>
                  {tagRankings.dayTags.slice(0, 10).map(({ tagName }, index) => (
                    <div
                      className='flex gap-2.5 w-full cursor-pointer' key={tagName} onClick={() => {
                        setSearchQuery(tagName);
                        setInput(tagName);
                      }}
                    >
                      <p className={`size-5 pl-1 text-sm font-semibold ${index < 3 ? 'text-primary' : ''}`}>{index + 1}</p>
                      <p className='text-sm font-medium'>{tagName}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          )
        : (
          <Suspense
            fallback={
              <div className='h-full w-full flex justify-center items-center'>
                <Lottie animationData={loading} loop style={{ height: 80, width: '100%' }} />
              </div>
      }
          >
            <SearchResult query={searchQuery} onNotFound={() => setResultEmpty(true)} />
          </Suspense>
          )}
    </div>
  );
}
