import { useGetUser, useGetUserLikes } from '@/hooks/useUser';
import { Tabs, TabsList, TabsTrigger } from '@/components/tabs';
import { useState } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import Card from '@/routes/feed/components/Card';
import more from '@/assets/more.svg';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile () {
  const { data: user } = useGetUser();
  const [activeTab, setActiveTab] = useState('posts');
  const [showLogout, setShowLogout] = useState(false);
  const { data: calendar } = useCalendar();
  const { data: userLikes } = useGetUserLikes();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <div className='min-h-screen bg-[#F8F8F8] pb-31'>
      <div className='flex py-10 justify-center items-center gap-2 bg-white relative'>
        <div className='flex flex-col items-center gap-4'>
          <img src={user?.profileUrl} alt='profile' className='w-20 h-20 rounded-full' />
          <p className='text-gray800 font-semibold text-xl leading-[160%]'>{user?.username}</p>
        </div>
        <img
          src={more}
          alt='more'
          className='absolute right-5 top-10 cursor-pointer'
          onClick={() => setShowLogout(!showLogout)}
        />
        {showLogout && (
          <div
            className='flex items-center gap-2  absolute right-7.25 top-18 cursor-pointer py-2.5 pl-4 pr-9.25 rounded-lg bg-white border border-gray200 hover:bg-gray100'
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <p className='text-gray600 font-semibold text-[0.875rem] leading-[160%]'>로그아웃</p>
          </div>
        )}
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
