import { useGetFeedInfinite } from '@/hooks/useFeed';
import Card from './components/Card';
import { Tabs, TabsList, TabsTrigger } from '@/components/tabs';
import { useIFrameAPIContext } from '@/providers/iframe-api-provider';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import loading from '@/assets/loading.json';
import Lottie from 'lottie-react';

export default function Feed () {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sortBy') || 'createdAt';
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetFeedInfinite(currentSort as 'createdAt' | 'likeCount');
  const iFrameAPI = useIFrameAPIContext();

  // react-intersection-observer 사용
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
  });

  const handleTabChange = (value: string) => {
    if (value === 'createdAt') {
      navigate('/feed?sortBy=createdAt');
    } else if (value === 'likeCount') {
      navigate('/feed?sortBy=likeCount');
    }
  };

  // react-intersection-observer를 사용한 무한 스크롤
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 모든 페이지의 데이터를 평면화
  const allFeeds = data?.pages.flat() || [];

  return (
    <div className='min-h-screen bg-[#F8F8F8] pb-31'>
      <div className='sticky top-0 z-50 bg-[#F8F8F8]'>
        <Tabs value={currentSort === 'createdAt' ? 'createdAt' : 'likeCount'} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value='createdAt'>최신</TabsTrigger>
            <TabsTrigger value='likeCount'>인기</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className='flex flex-col gap-2'>
        {allFeeds.map((item) => (
          <Card key={item.id} item={item} iFrameAPI={iFrameAPI} />
        ))}
        {/* 무한 스크롤 트리거 요소 */}
        <div ref={loadMoreRef} className='h-10 flex items-center justify-center'>
          {isFetchingNextPage && (
            <Lottie animationData={loading} loop style={{ height: 80, width: '100%' }} />
          )}
        </div>
      </div>
    </div>
  );
}
