import React from 'react';
import type { Feed, Song } from '@/types/feed';
import { useNavigate } from 'react-router-dom';
import heartActive from '@/assets/heart_active.svg';
import heart from '@/assets/heart.svg';
import comment from '@/assets/comment.svg';
import likeAnimation from '@/assets/like.json';
import { useLikeFeed, useUnlikeFeed, useDeleteFeed } from '@/hooks/useFeed';
import { getRelativeTime } from '@/lib/dateUtils';
import { DiscIcon } from '@/icons/disc';
import Lottie from 'lottie-react';
import { formatKoreanDate } from '@/lib/formatDate';
import more from '@/assets/more_gray.svg';
import { CircleX } from 'lucide-react';
import { useClickOutside } from '@/hooks/useClickOutside';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/alert-dialog';
import { usePlaySong } from '@/hooks/usePlaySong';

const AlbumButton = ({ song }: { song: Song }) => {
  const playSong = usePlaySong();

  const onClickTrack = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    await playSong(song.trackId);
  };

  return (
    <div
      className='h-21.5 rounded-md bg-cover bg-center hover:cursor-pointer' onClick={onClickTrack} style={{
        backgroundImage: `url(${song.albumArtUrl})`,
      }}
    >
      <div className='w-full h-full flex flex-row p-3 gap-8.5 backdrop-blur-sm bg-black/50 rounded-md'>
        <div className='min-w-0 flex flex-col flex-grow flex-shrink'>
          <p className='text-white text-lg font-bold overflow-ellipsis overflow-hidden whitespace-nowrap'>{song.title}</p>
          <p className='text-gray300 text-sm font-medium overflow-ellipsis overflow-hidden whitespace-nowrap'>{song.artist}</p>
        </div>
        <div className='flex gap-1 flex-grow-0 flex-shrink-0'>
          <DiscIcon className='size-4 text-gray300' />
          <p className='text-xs font-medium text-gray300'>{song.playCount}</p>
        </div>
      </div>
    </div>
  );
};

interface CardProps {
  item: Feed;
  isProfile?: boolean;
}

export default function Card ({
  item,
  isProfile = false,
}: CardProps) {
  const navigate = useNavigate();
  const { mutate: likeFeed } = useLikeFeed();
  const { mutate: unlikeFeed } = useUnlikeFeed();
  const { mutate: deleteFeed, isPending: isDeleting } = useDeleteFeed();
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [showMoreOptions, setShowMoreOptions] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const moreOptionsRef = useClickOutside(() => {
    setShowMoreOptions(false);
  });

  // 오늘 날짜인지 확인하는 함수
  const isToday = (dateString: string) => {
    const today = new Date();
    const itemDate = new Date(dateString);

    return today.getFullYear() === itemDate.getFullYear() &&
           today.getMonth() === itemDate.getMonth() &&
           today.getDate() === itemDate.getDate();
  };

  return (
    <div
      key={item.id}
      className='p-6 bg-white cursor-pointer'
      onClick={() => {
        navigate(`/feed/${item.id}`);
      }}
    >
      {!isProfile &&
      (
        <div className='flex items-center gap-3 mb-5'>
          <img src={item.userImageUrl} alt='user' className='size-11 rounded-full' />
          <div className='flex flex-col gap-0.5'>
            <p className='text-gray800 text-sm font-semibold leading-[140%]'>{item.user}</p>
            <p className='text-gray400 text-sm leading-[140%]'>{getRelativeTime(item.createdAt)}</p>
          </div>
        </div>
      )}
      {
        isProfile && (
          <div className='flex items-center justify-between mb-5 relative'>
            <p className='text-gray800 text-lg font-semibold leading-[140%]'>{formatKoreanDate(item.createdAt)}</p>
            <img
              src={more} alt='더보기' onClick={(e) => {
                e.stopPropagation();
                setShowMoreOptions(!showMoreOptions);
              }}
            />
            {showMoreOptions && (
              <div
                ref={moreOptionsRef}
                className='absolute top-8 right-0 flex items-center gap-2 bg-white  rounded-lg shadow-[0_2px_8px_0_rgba(0,0,0,0.15)] py-2.5 pl-4 pr-10 z-10 hover:bg-gray100
              ' onClick={(e) => {
                  e.stopPropagation();
                  setShowMoreOptions(false);
                  setShowDeleteDialog(true);
                }}
              >
                <CircleX size={16} color='#F2433A' strokeWidth={3} />
                <p
                  className='text-primary text-sm leading-[160%] font-semibold cursor-pointer'
                >
                  삭제
                </p>
              </div>
            )}
          </div>
        )
      }
      <div className='flex gap-2 mb-3'>
        {item.emotionTags.map((tag, index) => (
          <div
            className='border border-primary rounded-[100px] px-4 py-1 text-primary text-sm leading-[140%] font-medium bg-[#FFEBEA]'
            key={index}
          >{tag}
          </div>
        ))}
      </div>
      <div className='w-full h-21.5'>
        <AlbumButton song={item.song} />
      </div>
      <div className='flex gap-1.5 mt-2 mb-3'>
        {item.dailyTags.map((tag, index) => (
          <div
            className='text-gray600 text-sm leading-[140%] font-medium'
            key={index}
          >#{tag}
          </div>
        ))}
      </div>
      <div className='h-[1px] bg-[#E7E7E7] my-5' />
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1'>
          <div className='relative w-6 h-6'>
            {isAnimating
              ? (
                <Lottie
                  animationData={likeAnimation}
                  loop={false}
                  autoplay
                  style={{
                    width: '56px',
                    height: '56px',
                    transform: 'translate(-15.75px, -15.5px)'
                  }}
                  onComplete={() => {
                    setIsAnimating(false);
                  }}
                />
                )
              : (
                <img
                  src={item.likeState ? heartActive : heart} alt='heart' className='cursor-pointer w-6 h-6' onClick={(e) => {
                    e.stopPropagation();
                    if (item.likeState) {
                      unlikeFeed(item.id);
                    } else {
                      setIsAnimating(true);
                      likeFeed(item.id);
                    }
                  }}
                />
                )}
          </div>
          <p className='text-gray700 text-sm leading-[140%] font-medium'>{item.likeCount}</p>
        </div>
        <div className='flex items-center gap-1'>
          <img src={comment} alt='comment' />
          <p className='text-gray700 text-sm leading-[140%] font-medium'>{item.commentCount}</p>
        </div>
      </div>

      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className='bg-white border-none rounded-lg pt-10 pb-5 px-5 flex flex-col gap-9 max-w-[28.125rem] [@media(min-width:500px)]:max-w-[28.125rem]'>
          <AlertDialogHeader className='flex flex-col gap-6 items-center'>
            <AlertDialogTitle className='text-gray800 text-xl font-bold leading-[140%] text-center'>
              {isToday(item.createdAt) ? '오늘의 게시물 삭제하기' : '게시물 삭제하기'}
            </AlertDialogTitle>
            <AlertDialogDescription className='text-gray600 text-sm leading-[140%] font-medium text-center'>
              {isToday(item.createdAt)
                ? (
                  <>
                    게시물을 삭제할 경우 처음부터 다시 작성합니다.<br />
                    정말로 삭제 하시겠습니까?
                  </>
                  )
                : (
                  <>
                    게시물을 삭제할 경우 다시 되돌릴 수 없습니다.<br />
                    정말로 삭제 하시겠습니까?
                  </>
                  )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='flex flex-row gap-5'>
            <AlertDialogCancel
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteDialog(false);
              }}
              className='text-primary text-base leading-[140%] font-semibold text-center p-5 rounded-[0.625rem] bg-[#FFEBEA] grow border-0 cursor-pointer outline-none focus:outline-none'
            >
              돌아가기
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.stopPropagation();
                deleteFeed(item.id, {
                  onSuccess: () => {
                    setShowDeleteDialog(false);
                  }
                });
              }}
              disabled={isDeleting}
              className={`text-white text-base leading-[140%] font-semibold text-center p-5 rounded-[0.625rem] grow cursor-pointer ${
                isDeleting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary'
              }`}
            >
              {isDeleting ? '삭제 중...' : '삭제하기'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
