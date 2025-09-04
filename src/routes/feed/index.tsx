import { useGetFeed } from '@/hooks/useFeed';
import Card from './components/Card';

export default function Feed () {
  const { data: feeds } = useGetFeed();

  return (
    <div className='min-h-screen bg-[#F8F8F8] pb-[124px]'>
      {/* <div>Tab</div> */}
      <div className='flex flex-col gap-[24px]'>
        {feeds.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
