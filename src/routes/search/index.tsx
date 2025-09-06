import React from 'react';
import { TextInput } from '@/components/text-input';
import { SearchIcon } from '@/icons/search';
import type { Feed } from '@/types/feed';
import Card from '../feed/components/Card';
import { useTagRankings } from '@/hooks/useTag';
import { searchFeedsByTag } from '@/apis/feed';
import { useNearScreenBottom } from '@/hooks/useNearScreenBottom';

export default function Search () {
  const [input, setInput] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Feed[] | null>(null);
  const [page, setPage] = React.useState(0);
  const isNearBottom = useNearScreenBottom();
  const { data: tagRankings } = useTagRankings();

  const onSearch = React.useCallback(async () => {
    try {
      const posts = await searchFeedsByTag(searchQuery);
      setSearchResults(posts);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  }, [searchQuery]);

  React.useEffect(() => {
    setSearchResults(null);
    setPage(0);
    if (searchQuery !== '') {
      onSearch();
    }
  }, [onSearch, searchQuery]);

  React.useEffect(() => {
    if (isNearBottom && searchResults && searchResults.length >= (page + 1) * 10) {
      const fetchMore = async () => {
        try {
          const morePosts = await searchFeedsByTag(searchQuery, page + 1);
          setSearchResults(prev => prev ? [...prev, ...morePosts] : morePosts);
          setPage(prev => prev + 1);
        } catch (error) {
          console.error('Error fetching more search results:', error);
        }
      };
      fetchMore();
    }
  }, [isNearBottom, searchResults, page, searchQuery]);

  return (
    <div className='relative min-h-screen w-full flex flex-col items-center gap-10 pb-31'>
      <div className='px-7 pt-7 w-full'>
        <TextInput
          value={input} onChange={
        (e) => {
          setInput(e.target.value.trim());
          if (e.target.value.trim() === '') {
            setSearchResults(null);
            setSearchQuery('');
            setPage(0);
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
      {!searchResults || searchResults.length === 0
        ? (
          <div className='flex flex-col w-full gap-4 px-7'>
            {searchResults?.length === 0 && (<p className='text-sm font-medium text-gray400 text-center pb-25'>검색 결과가 없습니다.</p>)}
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
          <div className='flex flex-col w-full gap-2.5'>
            <div className='relative w-full h-32 -pt-8 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFE7E7] to-[#FF9C96] gap-2'>
              <div className='absolute top-6 size-60 bg-primary rounded-full blur-[50px]' />
              <p className='text-3xl font-extrabold z-10 text-white'>#{searchQuery}</p>
              <p className='text-xs font-medium z-10 text-white text-center'>해당 키워드의 '이음'이에요.<br />
                관련 태그의 모든 글을 볼 수 있어요!
              </p>
            </div>
            {searchResults.map(result => (
              <Card key={result.id} item={result} />
            ))}
          </div>
          )}
    </div>
  );
}
