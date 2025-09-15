import { useGetUser, useGetUserLikes, useGetUserState } from '@/hooks/useUser';
import { Tabs, TabsList, TabsTrigger } from '@/components/tabs';
import { useState } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import Card from '@/routes/feed/components/Card';
import moreWhite from '@/assets/more_white.svg';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlayerShown } from '@/hooks/usePlayerShown';
import stroke from '@/assets/stroke.svg';

export default function Profile () {
  const { data: user } = useGetUser();
  const [activeTab, setActiveTab] = useState('posts');
  const [showLogout, setShowLogout] = useState(false);
  const { data: calendar } = useCalendar();
  const { data: userLikes } = useGetUserLikes();
  const { data: userState } = useGetUserState();
  const navigate = useNavigate();
  const isPlayerShown = usePlayerShown();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <div className={`min-h-screen bg-[#F8F8F8] ${isPlayerShown ? 'pb-51' : 'pb-31'} `}>
      <div className='px-6 pt-8 pb-10 bg-white'>
        <div className='bg-[linear-gradient(334deg,#F2433A_16.44%,#FD6E66_83.56%)] rounded-[0.625rem]'>
          <div className='flex items-center p-5 justify-between'>
            <div className='flex items-center gap-3'>
              <img src={user?.profileUrl} alt='profile' className='w-16 h-16 rounded-full' />
              <p className='text-gray100 font-semibold text-xl leading-[140%]'>{user?.username}</p>
            </div>
            <div className='relative'>
              <img src={moreWhite} alt='more' className='cursor-pointer' onClick={() => setShowLogout(!showLogout)} />
              {showLogout && (
                <div
                  className='flex items-center gap-2  absolute right-0 -bottom-14 cursor-pointer py-2.5 pl-4 pr-9.25 rounded-lg bg-white hover:bg-gray100 shadow-[0_2px_8px_0_rgba(0,0,0,0.15)]'
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <p className='text-gray600 font-semibold text-[0.875rem] leading-[160%] whitespace-nowrap'>로그아웃</p>
                </div>
              )}
            </div>
          </div>
          <div className='px-8 pt-4 pb-3 bg-[linear-gradient(180deg,#F9736B_0%,#F05B53_100%)] rounded-b-[0.625rem] flex justify-between items-center'>
            <div className='flex flex-col items-center gap-0.5'>
              <p className='text-gray100 font-medium text-sm leading-[140%]'>게시물</p>
              <p className='text-white font-semibold text-lg leading-[140%]'>{userState?.postCount}</p>
            </div>
            <img src={stroke} alt='stroke' className='h-full' />
            <div className='flex flex-col items-center gap-0.5'>
              <p className='text-gray100 font-medium text-sm leading-[140%]'>누적 좋아요</p>
              <p className='text-white font-semibold text-lg leading-[140%]'>999</p>
            </div>
            <img src={stroke} alt='stroke' className=' h-full' />
            <div className='flex flex-col items-center gap-0.5'>
              <p className='text-gray100 font-medium text-sm leading-[140%]'>주요 감정</p>
              <p className='text-white font-semibold text-lg leading-[140%]'>{userState?.mostUsedEmotion}</p>
            </div>

          </div>
        </div>
      </div>
      <div className='sticky top-0 z-50 bg-[#F8F8F8]'>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value='posts'>내가 쓴 글</TabsTrigger>
            <TabsTrigger value='likes'>좋아요</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
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
