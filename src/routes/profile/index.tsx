import { useGetUser, useGetUserLikes } from '@/hooks/useUser';
import { Tabs, TabsList, TabsTrigger } from '@/components/tabs';
import { useState } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import Card from '@/routes/feed/components/Card';

export default function Profile () {
  const { data: user } = useGetUser();
  const [activeTab, setActiveTab] = useState('posts');
  const { data: calendar } = useCalendar();
  const { data: userLikes } = useGetUserLikes();
  return (
    <div className='min-h-screen bg-[#F8F8F8] pb-31'>
      <div className='flex py-10 justify-center items-center gap-2 bg-white'>
        <div className='flex flex-col items-center gap-4'>
          <img src={user?.profileUrl} alt='profile' className='w-[80px] h-[80px] rounded-full' />
          <p className='text-gray800 font-semibold text-[20px] leading-[160%]'>{user?.username}</p>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value='posts'>내가 쓴 글</TabsTrigger>
          <TabsTrigger value='likes'>좋아요</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className='flex flex-col gap-2'>
        {activeTab === 'posts'
          ? (
            <>
              {calendar?.map((item) => (
                <Card key={item.id} item={item} isProfile />
              ))}
            </>
            )
          : (
            <>
              {userLikes?.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </>
            )}
      </div>
    </div>
  );
}
