import React from 'react';
import { getMyTodayFeed } from '@/apis/feed';
import { NewPagesProvider } from '@/providers/new-pages-provider';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const NewPagesLayout = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkTodayFeed = async () => {
      try {
        const myTodayFeed = await getMyTodayFeed();
        if (myTodayFeed) {
          navigate('/feed');
        }
      } catch (error) {
        console.error("Error fetching today's feed:", error);
        toast.error('오늘 작성한 게시글을 확인하는데 실패했어요. 잠시 후 다시 시도해주세요.');
      }
    };
    checkTodayFeed();
  }, [navigate]);

  return (
    <NewPagesProvider>
      <Outlet />
    </NewPagesProvider>
  );
};
