import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TextInput } from '@/components/text-input';
import { SmallMusicAlbum, BigMusicAlbum } from '@/components/new/music/album-buttons';
import { useRecommendedSongs } from '@/hooks/useSong';
import { SearchIcon } from '@/icons/search';
import { useNavigate } from 'react-router-dom';
import { useNewPagesProvider } from '@/providers/new-pages-provider';
import type { Music } from '@/types/music';
import { Button } from '@/components/button';
import { searchSongs } from '@/apis/songs';
import { toast } from 'sonner';
import { Progress } from '@/components/new/progress';
import Lottie from 'lottie-react';
import search from '@/assets/search.json';
import finishedSearch from '@/assets/searchcompl.json';

export const SelectMusic = () => {
  const navigate = useNavigate();
  const [musicSearchQuery, setMusicSearchQuery] = React.useState('');
  const [searchedMusics, setSearchedMusics] = React.useState<Music[]>([]);
  const [searching, setSearching] = React.useState(false);
  const [isLoadedRecommended, setIsLoadedRecommended] = React.useState(false);
  const { setMusic, feelings } = useNewPagesProvider();

  if (feelings.length === 0) {
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: recommendedMusics, isLoading: isLoadingRecommended } = useRecommendedSongs(feelings);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    if (!isLoadingRecommended) {
      setTimeout(() => {
        setIsLoadedRecommended(true);
      }, 2000);
    }
  }, [isLoadingRecommended]);

  const onClickMusic = (music: Music) => {
    setMusic(music);
    navigate('/new/post');
  };

  const onSearchMusic = async (query: string) => {
    setSearching(true);
    try {
      const data = await searchSongs(query);
      setSearchedMusics(data);
    } catch (error) {
      toast.error('노래 검색에 실패했어요. 잠시 후 다시 시도해주세요.');
      console.error(error);
    }
    setSearching(false);
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-center gap-2'>
      <div className='flex w-full py-6 px-4'>
        <button className='hover:cursor-pointer' onClick={() => window.history.back()}>
          <ChevronLeft className='size-7 text-gray800' />
        </button>
      </div>
      {
        (isLoadedRecommended && recommendedMusics)
          ? (
            <>
              <Progress selectedIndex={2} />
              <div className='flex flex-col items-center gap-4 flex-grow w-full px-6'>
                <h2 className='heading2 text-3xl text-primary pt-7'>딱 맞는 음악 발견!</h2>
                <h2 className='heading2 text-3xl -mt-4'>원하는 곡 하나를 선택하세요</h2>
                <div className='mt-4' />
                <p className='body-m font-medium text-gray500'>마음에 드는 곡이 없다면, 직접 검색해보세요</p>
                <TextInput
                  placeholder='제목 혹은 가수를 입력하세요'
                  icon={
                    <SearchIcon className='size-6 text-primary' />
                }
                  value={musicSearchQuery}
                  onChange={(e) => {
                    setMusicSearchQuery(e.target.value);
                    if (e.target.value === '') {
                      setSearchedMusics([]);
                    }
                  }}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter' && musicSearchQuery.trim() !== '' && !e.nativeEvent.isComposing) {
                    // Block default behavior(submit)
                      e.preventDefault();
                      if (!searching) {
                        onSearchMusic(musicSearchQuery.trim());
                      }
                    }
                  }}
                />
                {
                searchedMusics.length === 0
                  ? (
                    <div className='grid grid-cols-4 gap-4 mt-9 w-full items-start'>
                      {recommendedMusics
                        .map((music, index) => (
                          <SmallMusicAlbum
                            key={index} onClick={() => {
                              onClickMusic(music);
                            }}
                            title={music.name}
                            albumURL={music.imageUrl}
                          />
                        ))}
                    </div>
                    )
                  : (
                    <div className='flex flex-col gap-4 mt-12 w-full'>
                      {searchedMusics.map((music, index) => (
                        <BigMusicAlbum
                          key={index} onClick={() => {
                            onClickMusic(music);
                          }}
                          title={music.name}
                          albumURL={music.imageUrl}
                          artist={music.artist}
                        />
                      ))}
                    </div>
                    )
              }
              </div>
            </>
            )
          : (
            <>
              {/* <div className='absolute size-82 right-41 top-20 bg-radial from-[#F2563A]/20 to-[#F2563A]/0 rounded-full blur-[2px]' />
              <div className='absolute size-82 left-43 bottom-43 bg-radial from-[#F2563A]/20 to-[#F2563A]/0 rounded-full blur-[2px]' /> */}
              <div className='w-full h-full flex flex-col flex-grow items-center justify-center'>
                {isLoadingRecommended
                  ? (
                    <Lottie animationData={search} className='size-96' loop />
                    )
                  : (
                    <Lottie animationData={finishedSearch} className='size-96' loop={false} />
                    )}
                <p className='text-3xl text-primary font-extrabold'>{
                      isLoadingRecommended ? '오늘의 음악 찾는 중...' : '음악을 찾았어요!'
                      }
                </p>
                <p className='text-lg text-gray500 font-medium mt-3'>{
                      isLoadingRecommended ? '오늘의 하루와 딱 맞는 음악을 찾고 있어요' : '오늘의 하루와 딱 맞는 음악을 찾았어요'
                      }
                </p>
                <p className='text-lg text-gray500 font-medium'>{
                      isLoadingRecommended ? '잠시만 기다려주세요!' : '맘에 드셨으면 좋겠어요!'
                      }
                </p>
              </div>
            </>
            )
      }
    </div>
  );
};
