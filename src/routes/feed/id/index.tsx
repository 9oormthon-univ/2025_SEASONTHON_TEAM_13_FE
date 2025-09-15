/* eslint-disable react-hooks/rules-of-hooks */
import arrowBack from '@/assets/arrow_back.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetFeedById, useGetFeedComments, usePostFeedComment } from '@/hooks/useFeed';
import React, { useState } from 'react';
import Card from '../components/Card';
import commentPost from '@/assets/comment_post.svg';
import { useGetUser } from '@/hooks/useUser';
import { getRelativeTime } from '@/lib/dateUtils';
import { usePlayerShown } from '@/hooks/usePlayerShown';

export default function FeedId () {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate(-1);
    return null;
  }

  // eslint-disable
  const { data: feed } = useGetFeedById(Number(id));
  const { data: user } = useGetUser();
  const { data: comments } = useGetFeedComments(Number(id));
  const [comment, setComment] = useState('');
  const { mutate: postComment } = usePostFeedComment();
  const isPlayerShown = usePlayerShown();
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    navigate(-1);
  };

  return (
    <div className={`min-h-screen bg-[#F8F8F8] ${isPlayerShown ? 'pb-51' : 'pb-31'}`}>
      <div className='relative px-5 py-3.5 bg-white flex items-center justify-center text-gray800 text-xl font-semibold leading-[140%] mb-2'>
        <img src={arrowBack} alt='뒤로가기' className='absolute left-5 cursor-pointer' onClick={handleClick} />
        게시글
      </div>
      <Card item={feed} />
      <div className='mt-2 pt-2.5 px-5 bg-white flex flex-col gap-8'>
        <div className='py-4 flex gap-3 border-b border-b-gray100'>
          <img src={user.profileUrl} alt='user' className='size-11 rounded-full' />
          <div className='flex flex-col gap-0.5 grow'>
            <input
              placeholder='댓글을 게시하기'
              type='text' className='w-full border-none outline-none placeholder:text-gray400 font-medium text-sm leading-[140%]'
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <p className='text-gray500 text-xs leading-[140%] font-medium'>{comment.length}/500</p>
          </div>
          <img
            src={commentPost}
            alt='댓글 게시'
            className={`${comment.trim() ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
            onClick={() => {
              if (comment.trim()) {
                postComment({ postId: Number(id), content: comment });
                setComment('');
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-8 pb-8'>
          {comments.map((comment) => (
            <div key={comment.id} className='flex gap-3 items-center'>
              <img src={comment.authorProfileImageUrl} alt='user' className='size-11 rounded-full' />
              <div className='flex flex-col gap-0.5'>
                <div className='flex items-center gap-2'>
                  <p className='text-gray800 text-sm font-semibold leading-[140%]'>{comment.authorNickname}</p>
                  <p className='text-gray400 text-xs leading-[140%]'>{getRelativeTime(comment.createdAt)}</p>
                </div>
                <p className='text-gray700 text-sm font-medium leading-[140%]'>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
