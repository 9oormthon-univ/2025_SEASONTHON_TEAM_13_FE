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

export const SelectMusic = () => {
  const navigate = useNavigate();
  const [musicSearchQuery, setMusicSearchQuery] = React.useState('');
  const [searchedMusics, setSearchedMusics] = React.useState<Music[]>([]);
  const [searching, setSearching] = React.useState(false);
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
  const { data: recommendedMusics } = useRecommendedSongs(feelings);

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
      <div className='flex flex-col items-center gap-4 flex-grow w-full px-6'>
        <h2 className='heading2 text-3xl pt-8'>오늘의 하루와</h2>
        <h2 className='heading2 text-3xl -mt-4 text-primary'>어울리는 노래를 찾았어요</h2>
        <div className='mt-2' />
        <p className='body-m font-medium text-gray500'>마음에 드는 곡이 없다면, 음악을 직접 검색해보세요!</p>
        <TextInput
          placeholder='마음에 드는 곡이 없나요? 직접 검색해보세요'
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
          onKeyDown={(e) => {
            if (e.key === 'Enter' && musicSearchQuery.trim() !== '') {
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
              <div className='grid grid-cols-4 gap-4 mt-12 w-full items-start'>
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
                    playCount={music.playCount}
                  />
                ))}
              </div>
              )
        }
      </div>
    </div>
  );
};
