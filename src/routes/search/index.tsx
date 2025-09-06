import React from 'react';
import { TextInput } from '@/components/text-input';
import { SearchIcon } from '@/icons/search';
import type { Feed } from '@/types/feed';
import Card from '../feed/components/Card';
// import { useTagRankings } from '@/hooks/useTag';

const tagRankings = {
  emotionTags: [
    { tagName: '짜증', tagCount: 15 },
    { tagName: '화남', tagCount: 10 },
    { tagName: '힘듦', tagCount: 8 },
    { tagName: '즐거움', tagCount: 20 },
    { tagName: '기쁨', tagCount: 18 },
    { tagName: '행복', tagCount: 25 },
    { tagName: '피곤함', tagCount: 12 },
    { tagName: '우울', tagCount: 14 },
    { tagName: '졸림', tagCount: 5 },
    { tagName: '외로움', tagCount: 7 },
    { tagName: '슬픔', tagCount: 9 },
    { tagName: '복잡함', tagCount: 6 },
    { tagName: '두근거림', tagCount: 11 },
    { tagName: '감동', tagCount: 13 },
    { tagName: '설렘', tagCount: 17 },
    { tagName: '놀람', tagCount: 4 },
    { tagName: '어지러움', tagCount: 3 }
  ],
  dayTags: [
    { tagName: '월요병', tagCount: 22 },
    { tagName: '불금', tagCount: 30 },
    { tagName: '주말', tagCount: 28 },
    { tagName: '공강', tagCount: 16 },
    { tagName: '시험', tagCount: 19 },
    { tagName: '과제', tagCount: 21 },
    { tagName: '휴강', tagCount: 23 },
    { tagName: '방학', tagCount: 27 },
    { tagName: '개강', tagCount: 24 },
    { tagName: '출근', tagCount: 26 }
  ]
};

export default function Search () {
  const [input, setInput] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Feed[] | null>(null);
  // const { data: tagRankings } = useTagRankings();

  return (
    <div className='relative min-h-screen w-full flex flex-col items-center gap-10'>
      <div className='px-7 pt-7 w-full'>
        <TextInput
          value={input} onChange={
        (e) => {
          setInput(e.target.value.trim());
          if (e.target.value.trim() === '') {
            setSearchResults(null);
            setSearchQuery('');
          }
        }
      } placeholder='검색어를 입력하세요...' icon={
        <SearchIcon className='size-6 text-primary' />
      } position='right' onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          setSearchQuery(input);
          setSearchResults([
            {
              id: 19,
              emotionTags: [
                '즐거움'
              ],
              dailyTags: [
                '하루 태그'
              ],
              song: {
                trackId: '4kXdx4vRJnbkLqq9vmOytw',
                title: '귀로',
                artist: '정미조',
                albumArtUrl: 'https://i.scdn.co/image/ab67616d0000b2739af040c0d3ccb2cb673bf579',
                playCount: 0,
                spotifyPlayUrl: 'https://open.spotify.com/track/4kXdx4vRJnbkLqq9vmOytw'
              },
              user: '____',
              userImageUrl: '',
              likeCount: 1,
              likeState: false,
              commentCount: 0,
              createdAt: '2025-09-05T15:18:52.643403',
              updatedAt: '2025-09-05T15:18:52.644001'
            },
            {
              id: 18,
              emotionTags: [
                '슬픔'
              ],
              dailyTags: [
                '테스트용'
              ],
              song: {
                trackId: '17YfT1Iqp3g8ilIqsHuChm',
                title: '1024',
                artist: 'KOYOTE',
                albumArtUrl: 'https://i.scdn.co/image/ab67616d0000b2732ab38356d063ff626dd2da5f',
                playCount: 0,
                spotifyPlayUrl: 'https://open.spotify.com/track/17YfT1Iqp3g8ilIqsHuChm'
              },
              user: '____',
              userImageUrl: '',
              likeCount: 1,
              likeState: false,
              commentCount: 0,
              createdAt: '2025-09-05T14:32:52.047504',
              updatedAt: '2025-09-05T14:32:52.047528'
            },
            {
              id: 17,
              emotionTags: [
                '즐거움',
                '감동'
              ],
              dailyTags: [
                'ssss'
              ],
              song: {
                trackId: '4kXdx4vRJnbkLqq9vmOytw',
                title: '귀로',
                artist: '정미조',
                albumArtUrl: 'https://i.scdn.co/image/ab67616d0000b2739af040c0d3ccb2cb673bf579',
                playCount: 0,
                spotifyPlayUrl: 'https://open.spotify.com/track/4kXdx4vRJnbkLqq9vmOytw'
              },
              user: '____',
              userImageUrl: '',
              likeCount: 1,
              likeState: false,
              commentCount: 0,
              createdAt: '2025-09-05T14:22:44.07298',
              updatedAt: '2025-09-05T14:22:44.073006'
            },
            {
              id: 14,
              emotionTags: [
                '즐거움',
                '짜증'
              ],
              dailyTags: [
                '태그1'
              ],
              song: {
                trackId: '06JMCvJpXO8ITrJdkoyXsN',
                title: '2018 (이천십팔)',
                artist: 'Choi Seong',
                albumArtUrl: 'https://i.scdn.co/image/ab67616d0000b273b5a36a6b06f0908fe54261d1',
                playCount: 0,
                spotifyPlayUrl: 'https://open.spotify.com/track/06JMCvJpXO8ITrJdkoyXsN'
              },
              user: '____',
              userImageUrl: '',
              likeCount: 0,
              likeState: false,
              commentCount: 0,
              createdAt: '2025-09-05T14:00:54.555158',
              updatedAt: '2025-09-05T14:00:54.555184'
            },
            {
              id: 12,
              emotionTags: [
                '즐거움',
                '피곤함',
                '졸림'
              ],
              dailyTags: [
                '행복해지는법'
              ],
              song: {
                trackId: '3rzVcHw0hwVgDEq5udhUJS',
                title: 'Young Girl A - one day After Another Remix',
                artist: 'Siinamota',
                albumArtUrl: 'https://i.scdn.co/image/ab67616d0000b2732b8ad0729c8d7a6570642ad5',
                playCount: 0,
                spotifyPlayUrl: 'https://open.spotify.com/track/3rzVcHw0hwVgDEq5udhUJS'
              },
              user: '____',
              userImageUrl: '',
              likeCount: 0,
              likeState: false,
              commentCount: 0,
              createdAt: '2025-09-05T13:57:00.914391',
              updatedAt: '2025-09-05T13:57:00.914437'
            },
            {
              id: 1,
              emotionTags: [
                '기쁨'
              ],
              dailyTags: [
                'test1'
              ],
              song: {
                trackId: '17YfT1Iqp3g8ilIqsHuChm',
                title: '1024',
                artist: 'KOYOTE',
                albumArtUrl: 'https://i.scdn.co/image/ab67616d0000b2732ab38356d063ff626dd2da5f',
                playCount: 0,
                spotifyPlayUrl: 'https://open.spotify.com/track/17YfT1Iqp3g8ilIqsHuChm'
              },
              user: '____',
              userImageUrl: '',
              likeCount: 1,
              likeState: false,
              commentCount: 1,
              createdAt: '2025-09-05T13:39:18.763724',
              updatedAt: '2025-09-05T13:39:18.763771'
            }
          ]);
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
                        setSearchResults([]);
                        setInput(tagName);
                      }}
                    >
                      <p className={`size-5 pl-1 text-sm font-semibold ${index < 3 && 'text-primary'}`}>{index + 1}</p>
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
                        setSearchResults([]);
                        setInput(tagName);
                      }}
                    >
                      <p className={`size-5 pl-1 text-sm font-semibold ${index < 3 && 'text-primary'}`}>{index + 1}</p>
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
