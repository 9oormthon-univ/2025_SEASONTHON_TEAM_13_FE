import React from 'react';
import type { Feed } from '@/types/feed';
import { useNavigate } from 'react-router-dom';
import heartActive from '@/assets/heart_active.svg';
import heart from '@/assets/heart.svg';
import comment from '@/assets/comment.svg';
import { useLikeFeed, useUnlikeFeed } from '@/hooks/useFeed';
import { getRelativeTime } from '@/lib/dateUtils';
import { BigMusicAlbum } from '@/components/new/music/album-buttons';
import { useErrorState, usePlayerDevice, useSpotifyPlayer } from 'react-spotify-web-playback-sdk';
import { getSpotifyLoginURL } from '@/apis/login';
import { toast } from 'sonner';
import { increaseSongPlayCount } from '@/apis/songs';
// import { SpotifyIframe } from '@/components/spotify-iframe';
// import type { IFrameAPI } from '@/hooks/useiFrameAPI';

interface CardProps {
  item: Feed;
  isProfile?: boolean;
  // iFrameAPI?: IFrameAPI;
}

export default function Card ({
  item,
  isProfile = false,
  // iFrameAPI
}: CardProps) {
  const navigate = useNavigate();
  const { mutate: likeFeed } = useLikeFeed();
  const { mutate: unlikeFeed } = useUnlikeFeed();
  const player = useSpotifyPlayer();
  const device = usePlayerDevice();
  const error = useErrorState();

  const onClickTrack = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const { token } = JSON.parse(localStorage.getItem('spotifyToken') || '{}');
    if ((error && error.type === 'authentication_error') || !token) {
      const loginURL = await getSpotifyLoginURL();
      window.location.href = loginURL;
      return;
    }
    if (!player || !device) {
      toast.error('스포티파이 플레이어가 준비되지 않았어요. 잠시 후 다시 시도해주세요.');
      return;
    }
    if (device.status === 'not_ready') {
      await player?.connect();
    }
    const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device?.device_id ?? ''}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        uris: [`spotify:track:${item.song.trackId}`]
      })
    });
    if (!response.ok) {
      console.error('Failed to start playback', response);
      toast.error('재생에 실패했어요. 다시 시도해주세요.');
      return;
    }
    player?.activateElement();
    player?.resume();
    await increaseSongPlayCount(item.song.trackId);
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
      <div className='w-full h-20'>
        <BigMusicAlbum
          title={item.song.title}
          artist={item.song.artist}
          albumURL={item.song.albumArtUrl}
          playCount={item.song.playCount}
          onClick={onClickTrack}
        />
      </div>
      <div className='flex gap-1.5 mt-4 mb-3'>
        {item.dailyTags.map((tag, index) => (
          <div
            className='text-gray600 text-sm leading-[140%] font-medium'
            key={index}
          >#{tag}
          </div>
        ))}
      </div>
      <div className='flex gap-2'>
        {item.emotionTags.map((tag, index) => (
          <div
            className='border border-primary rounded-[100px] px-4 py-1 text-primary text-sm leading-[140%] font-medium bg-[#FFEBEA]'
            key={index}
          >{tag}
          </div>
        ))}
      </div>
      <div className='h-[1px] bg-[#E7E7E7] my-5' />
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1'>
          <img
            src={item.likeState ? heartActive : heart} alt='heart' className='cursor-pointer' onClick={(e) => {
              e.stopPropagation();
              if (item.likeState) {
                unlikeFeed(item.id);
              } else {
                likeFeed(item.id);
              }
            }}
          />
          <p className='text-gray700 text-sm leading-[140%] font-medium'>{item.likeCount}</p>
        </div>
        <div className='flex items-center gap-1'>
          <img src={comment} alt='comment' />
          <p className='text-gray700 text-sm leading-[140%] font-medium'>{item.commentCount}</p>
        </div>
      </div>
    </div>
  );
}
