import { useGetFeed } from '@/hooks/useFeed';
import Card from './components/Card';
import { Tabs, TabsList, TabsTrigger } from '@/components/tabs';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Feed () {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sortBy') || 'createdAt';
  const { data: feeds } = useGetFeed(currentSort as 'createdAt' | 'likeCount');

  const handleTabChange = (value: string) => {
    if (value === 'createdAt') {
      navigate('/feed?sortBy=createdAt');
    } else if (value === 'likeCount') {
      navigate('/feed?sortBy=likeCount');
    }
  };

  return (
    <div className='min-h-screen bg-[#F8F8F8] pb-[124px]'>
      <Tabs value={currentSort === 'createdAt' ? 'createdAt' : 'likeCount'} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value='createdAt'>최신</TabsTrigger>
          <TabsTrigger value='likeCount'>인기</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className='flex flex-col gap-[24px]'>
        {feeds.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
