import arrowBack from '@/assets/arrow_back.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetFeedById, useGetFeedComments, usePostFeedComment } from '@/hooks/useFeed';
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import commentPost from '@/assets/comment_post.svg';
import { useGetUser } from '@/hooks/useUser';

export default function FeedId () {
  const { id } = useParams();
  const { data: feed } = useGetFeedById(Number(id));
  const { data: user } = useGetUser();
  const { data: comments } = useGetFeedComments(Number(id));
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const { mutate: postComment } = usePostFeedComment();
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    navigate(-1);
  };

  // id가 없으면 이전 페이지로 리다이렉트
  useEffect(() => {
    if (!id) {
      navigate(-1);
    }
  }, [id, navigate]);

  // id가 없으면 로딩 상태 표시
  if (!id) {
    return <div className='min-h-screen bg-[#F8F8F8] flex items-center justify-center'>로딩 중...</div>;
  }

  return (
    <div className='min-h-screen bg-[#F8F8F8] pb-[124px]'>
      <div className='relative px-[20px] py-[14px] bg-white flex items-center justify-center text-gray800 text-[20px] font-semibold leading-[140%] mb-[8px]'>
        <img src={arrowBack} alt='뒤로가기' className='absolute left-[20px] cursor-pointer' onClick={handleClick} />
        게시글
      </div>
      <Card item={feed} />
      <div className='mt-[8px] pt-[10px] px-[20px] bg-white flex flex-col gap-[32px]'>
        <div className='py-[16px] flex gap-[12px]  border-b border-b-gray100'>
          <img src={user.profileUrl} alt='user' className='w-[44px] h-[44px] rounded-full' />
          <div className='flex flex-col gap-[2px] grow'>
            <input
              placeholder='댓글을 게시하기'
              type='text' className='w-full border-none outline-none placeholder:text-gray400 font-medium text-[14px] leading-[140%]'
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <p className='text-gray500 text-[12px] leading-[140%] font-medium'>{comment.length}/500</p>
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
        <div className='flex flex-col gap-[32px] pb-[32px]'>
          {comments.map((comment) => (
            <div key={comment.id} className='flex gap-[12px] items-center'>
              <img src={comment.authorProfileImageUrl} alt='user' className='w-[44px] h-[44px] rounded-full' />
              <div className='flex flex-col gap-[2px]'>
                <div className='flex items-center gap-[8px]'>
                  <p className='text-gray800 text-[14px] font-semibold leading-[140%]'>{comment.authorNickname}</p>
                  <p className='text-gray400 text-[12px] leading-[140%]'>{comment.createdAt}</p>
                </div>
                <p className='text-gray700 text-[14px] font-medium leading-[140%]'>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
