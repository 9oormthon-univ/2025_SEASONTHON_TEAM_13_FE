import { useLocation, useNavigate } from 'react-router-dom';
import feed from '@/assets/navbar/feed.svg';
import search from '@/assets/navbar/search.svg';
import ranking from '@/assets/navbar/ranking.svg';
import calendar from '@/assets/navbar/calendar.svg';
import profile from '@/assets/navbar/profile.svg';
import activeFeed from '@/assets/navbar/feed_active.svg';
import activeSearch from '@/assets/navbar/search_active.svg';
import activeRanking from '@/assets/navbar/ranking_active.svg';
import activeCalendar from '@/assets/navbar/calendar_active.svg';
import activeProfile from '@/assets/navbar/profile_active.svg';

export const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className='pt-[17px] pb-[34px] border-t border-t-[#F2F2F2] rounded-t-[24px] flex justify-center items-center fixed bottom-0 max-w-[500px] w-full'>
      <div className='flex flex-col items-center gap-[4px] flex-grow cursor-pointer' onClick={() => handleClick('/feed')}>
        <img
          src={currentPath === '/feed' ? activeFeed : feed}
          alt='feed'
          onClick={() => handleClick('/feed')}
        />
        <p className={`body-s ${currentPath === '/feed' ? 'text-primary' : 'text-gray300'} font-semibold`}>
          피드
        </p>
      </div>
      <div className='flex flex-col items-center gap-[4px] flex-grow cursor-pointer' onClick={() => handleClick('/search')}>
        <img
          src={currentPath === '/search' ? activeSearch : search}
          alt='search'
          onClick={() => handleClick('/search')}
        />
        <p className={`body-s ${currentPath === '/search' ? 'text-primary' : 'text-gray300'} font-semibold`}>
          검색
        </p>
      </div>
      <div className='flex flex-col items-center gap-[4px] flex-grow cursor-pointer' onClick={() => handleClick('/ranking')}>
        <img
          src={currentPath === '/ranking' ? activeRanking : ranking}
          alt='ranking'
          onClick={() => handleClick('/ranking')}
        />
        <p className={`body-s ${currentPath === '/ranking' ? 'text-primary' : 'text-gray300'} font-semibold`}>
          랭킹
        </p>
      </div>
      <div className='flex flex-col items-center gap-[4px] flex-grow cursor-pointer' onClick={() => handleClick('/calendar')}>
        <img
          src={currentPath === '/calendar' ? activeCalendar : calendar}
          alt='calendar'
          onClick={() => handleClick('/calendar')}
        />
        <p className={`body-s ${currentPath === '/calendar' ? 'text-primary' : 'text-gray300'} font-semibold`}>
          캘린더
        </p>
      </div>
      <div className='flex flex-col items-center gap-[4px] flex-grow cursor-pointer' onClick={() => handleClick('/profile')}>
        <img
          src={currentPath === '/profile' ? activeProfile : profile}
          alt='profile'
          onClick={() => handleClick('/profile')}
        />
        <p className={`body-s ${currentPath === '/profile' ? 'text-primary' : 'text-gray300'} font-semibold`}>
          프로필
        </p>
      </div>
    </div>
  );
};
